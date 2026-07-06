#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
radar_root="${repo_root}/radar"
target_root="${repo_root}/source/radar"

if [[ ! -d "${radar_root}" ]]; then
  echo "Radar project directory not found: ${radar_root}" >&2
  exit 1
fi

mkdir -p "${target_root}"

for file in index.html manifest.json feed.xml; do
  if [[ ! -f "${radar_root}/${file}" ]]; then
    echo "Radar static file not found: ${radar_root}/${file}" >&2
    exit 1
  fi
  cp "${radar_root}/${file}" "${target_root}/${file}"
done

if [[ ! -d "${radar_root}/digests" ]]; then
  echo "Radar digests directory not found: ${radar_root}/digests" >&2
  exit 1
fi

rm -rf "${target_root}/digests"
cp -R "${radar_root}/digests" "${target_root}/digests"

echo "Radar static assets synced to ${target_root}"
