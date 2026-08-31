import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const outputPath = process.env.GA4_OUTPUT_PATH
  ? path.resolve(process.env.GA4_OUTPUT_PATH)
  : path.join(repoRoot, "source", "data", "ga4-daily.json");
const propertyId = process.env.GA4_PROPERTY_ID?.trim();
const credentialsJson = process.env.GA4_SERVICE_ACCOUNT_JSON;
const pagePathPrefix = process.env.GA4_PAGE_PATH_PREFIX?.trim() || null;

function required(value, name) {
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

function base64Url(value) {
  return Buffer.from(value).toString("base64url");
}

function dateKey(date) {
  return date.toISOString().slice(0, 10);
}

function shiftUtcDate(date, days) {
  const shifted = new Date(date);
  shifted.setUTCDate(shifted.getUTCDate() + days);
  return shifted;
}

function parseGaDate(value) {
  return `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6, 8)}`;
}

function buildDateRange() {
  const today = new Date();
  const utcToday = new Date(
    Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()),
  );
  const end = shiftUtcDate(utcToday, -1);
  const start = shiftUtcDate(end, -89);
  return { startDate: dateKey(start), endDate: dateKey(end), start, end };
}

function createDimensionFilter() {
  if (!pagePathPrefix) return undefined;
  return {
    filter: {
      fieldName: "pagePath",
      stringFilter: {
        matchType: "BEGINS_WITH",
        value: pagePathPrefix,
        caseSensitive: false,
      },
    },
  };
}

async function getAccessToken(credentials) {
  const now = Math.floor(Date.now() / 1000);
  const tokenUri =
    credentials.token_uri || "https://oauth2.googleapis.com/token";
  const header = base64Url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = base64Url(
    JSON.stringify({
      iss: credentials.client_email,
      scope: "https://www.googleapis.com/auth/analytics.readonly",
      aud: tokenUri,
      iat: now - 30,
      exp: now + 3600,
    }),
  );
  const unsignedToken = `${header}.${claims}`;
  const signer = crypto.createSign("RSA-SHA256");
  signer.update(unsignedToken);
  signer.end();
  const assertion = `${unsignedToken}.${signer.sign(credentials.private_key).toString("base64url")}`;
  const response = await fetch(tokenUri, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });
  if (!response.ok)
    throw new Error(
      `OAuth token request failed (${response.status}): ${await response.text()}`,
    );
  const payload = await response.json();
  return payload.access_token;
}

async function runReport(accessToken, body) {
  const response = await fetch(
    `https://analyticsdata.googleapis.com/v1beta/properties/${encodeURIComponent(propertyId)}:runReport`,
    {
      method: "POST",
      headers: {
        authorization: `Bearer ${accessToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    },
  );
  if (!response.ok)
    throw new Error(
      `GA4 Data API request failed (${response.status}): ${await response.text()}`,
    );
  return response.json();
}

async function main() {
  required(propertyId, "GA4_PROPERTY_ID");
  const rawCredentials = required(credentialsJson, "GA4_SERVICE_ACCOUNT_JSON");
  let credentials;
  try {
    credentials = JSON.parse(rawCredentials);
  } catch (error) {
    throw new Error(
      `GA4_SERVICE_ACCOUNT_JSON is not valid JSON: ${error.message}`,
    );
  }
  required(credentials.client_email, "GA4_SERVICE_ACCOUNT_JSON.client_email");
  required(credentials.private_key, "GA4_SERVICE_ACCOUNT_JSON.private_key");

  const { startDate, endDate, start, end } = buildDateRange();
  const dimensionFilter = createDimensionFilter();
  const accessToken = await getAccessToken(credentials);
  const common = {
    dateRanges: [{ startDate, endDate }],
    ...(dimensionFilter ? { dimensionFilter } : {}),
  };
  const [dailyReport, totalsReport] = await Promise.all([
    runReport(accessToken, {
      ...common,
      dimensions: [{ name: "date" }],
      metrics: [{ name: "activeUsers" }],
      orderBys: [{ dimension: { dimensionName: "date" } }],
      limit: "100",
    }),
    runReport(accessToken, {
      ...common,
      metrics: [
        { name: "activeUsers" },
        { name: "screenPageViews" },
        { name: "sessions" },
      ],
    }),
  ]);

  const valuesByDate = new Map(
    (dailyReport.rows || []).map((row) => [
      parseGaDate(row.dimensionValues?.[0]?.value || ""),
      Number(row.metricValues?.[0]?.value || 0),
    ]),
  );
  const daily = [];
  for (
    let cursor = new Date(start);
    cursor <= end;
    cursor = shiftUtcDate(cursor, 1)
  ) {
    const date = dateKey(cursor);
    daily.push({ date, users: valuesByDate.get(date) || 0 });
  }
  const totals = totalsReport.rows?.[0]?.metricValues || [];
  const output = {
    generatedAt: new Date().toISOString(),
    startDate,
    endDate,
    scope: { pathPrefix: pagePathPrefix },
    totals: {
      activeUsers: Number(totals[0]?.value || 0),
      pageViews: Number(totals[1]?.value || 0),
      sessions: Number(totals[2]?.value || 0),
    },
    daily,
  };

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`, "utf8");
  console.log(
    `GA4 statistics updated for ${startDate} through ${endDate}: ${output.totals.activeUsers} active users, ${output.totals.pageViews} page views.`,
  );
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
