(function () {
  "use strict";

  const numberFormatter = new Intl.NumberFormat("zh-CN");

  function setText(selector, value) {
    const element = document.querySelector(selector);
    if (element) element.textContent = value;
  }

  function formatDate(date) {
    const parts = date.split("-");
    return `${parts[1]}-${parts[2]}`;
  }

  function niceMaximum(value) {
    if (value <= 0) return 1;
    const exponent = 10 ** Math.floor(Math.log10(value));
    const fraction = value / exponent;
    const niceFraction =
      fraction <= 1 ? 1 : fraction <= 2 ? 2 : fraction <= 5 ? 5 : 10;
    return niceFraction * exponent;
  }

  function renderChart(container, daily) {
    const width = 760;
    const height = 280;
    const padding = { top: 18, right: 18, bottom: 34, left: 46 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;
    const maximum = niceMaximum(Math.max(...daily.map((item) => item.users)));
    const x = (index) =>
      padding.left +
      (daily.length === 1
        ? chartWidth / 2
        : (index / (daily.length - 1)) * chartWidth);
    const y = (value) =>
      padding.top + chartHeight - (value / maximum) * chartHeight;
    const points = daily.map(
      (item, index) => `${x(index).toFixed(2)},${y(item.users).toFixed(2)}`,
    );
    const linePath = points
      .map((point, index) => `${index === 0 ? "M" : "L"}${point}`)
      .join(" ");
    const areaPath = `${linePath} L${x(daily.length - 1).toFixed(2)},${padding.top + chartHeight} L${x(0).toFixed(2)},${padding.top + chartHeight} Z`;
    const yTicks = Array.from(
      { length: 5 },
      (_, index) => (maximum / 4) * index,
    );
    const xTickIndexes = [
      ...new Set([
        0,
        Math.floor((daily.length - 1) / 4),
        Math.floor((daily.length - 1) / 2),
        Math.floor(((daily.length - 1) * 3) / 4),
        daily.length - 1,
      ]),
    ];

    const grid = yTicks
      .map((tick) => {
        const tickY = y(tick).toFixed(2);
        return `<line class="visitor-chart__grid" x1="${padding.left}" y1="${tickY}" x2="${width - padding.right}" y2="${tickY}"/><text class="visitor-chart__axis-label" x="${padding.left - 8}" y="${Number(tickY) + 4}" text-anchor="end">${numberFormatter.format(Math.round(tick))}</text>`;
      })
      .join("");
    const xLabels = xTickIndexes
      .map(
        (index) =>
          `<text class="visitor-chart__axis-label" x="${x(index).toFixed(2)}" y="${height - 8}" text-anchor="middle">${formatDate(daily[index].date)}</text>`,
      )
      .join("");
    const circles = daily
      .map(
        (item, index) =>
          `<circle class="visitor-chart__point" cx="${x(index).toFixed(2)}" cy="${y(item.users).toFixed(2)}" r="4"><title>${item.date}：${numberFormatter.format(item.users)} 位用户</title></circle>`,
      )
      .join("");

    container.innerHTML = `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="最近 90 天每日访问用户折线图"><defs><linearGradient id="ga4-chart-gradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#2da44e" stop-opacity="0.28"/><stop offset="100%" stop-color="#2da44e" stop-opacity="0.02"/></linearGradient></defs>${grid}<path class="visitor-chart__area" d="${areaPath}"/><path class="visitor-chart__line" d="${linePath}"/>${circles}${xLabels}</svg>`;
  }

  async function initialize() {
    const container = document.getElementById("ga4-visitor-chart");
    if (!container) return;

    try {
      const response = await fetch(
        container.dataset.source || "/data/ga4-daily.json",
        { cache: "no-store" },
      );
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const payload = await response.json();
      const daily = Array.isArray(payload.daily)
        ? payload.daily
            .filter(
              (item) =>
                /^\d{4}-\d{2}-\d{2}$/.test(item.date) &&
                Number.isFinite(Number(item.users)),
            )
            .map((item) => ({ date: item.date, users: Number(item.users) }))
        : [];

      if (daily.length === 0) {
        container.innerHTML =
          '<p class="visitor-trend__status">尚无 GA4 日统计数据，请先运行 Analytics Daily Stats 工作流。</p>';
        return;
      }

      const totals = payload.totals || {};
      setText(
        "[data-ga4-period-users]",
        numberFormatter.format(Number(totals.activeUsers) || 0),
      );
      setText(
        "[data-ga4-page-views]",
        numberFormatter.format(Number(totals.pageViews) || 0),
      );
      setText(
        "[data-ga4-latest-users]",
        numberFormatter.format(daily[daily.length - 1].users),
      );
      setText(
        "[data-ga4-updated]",
        `更新于 ${payload.endDate || daily[daily.length - 1].date}`,
      );
      renderChart(container, daily);
    } catch (error) {
      container.innerHTML =
        '<p class="visitor-trend__status">访问趋势暂时无法加载，请稍后再试。</p>';
      console.error("Failed to load GA4 visitor statistics:", error);
    }
  }

  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", initialize);
  else initialize();
})();
