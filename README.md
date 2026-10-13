# T06-1: Interactive Histogram (Filtering)

A D3 histogram of TV labelled energy consumption (Ex6_TVdata.csv, Jan 2025 GEMS data)
with buttons to filter by screen technology (All, LED, LCD, OLED).

## Files
- `index.html` – page layout, filter div and chart div
- `css/base.css` – page and button styles
- `css/visualisations.css` – chart-specific styles
- `js/load-data.js` – loads and types the CSV, then calls drawHistogram and populateFilters
- `js/shared-constants.js` – sizes, colours, scales, bin generator, filter options
- `js/histogram.js` – draws the bars and axes
- `js/interactions.js` – filter buttons and the animated update

## GenAI use
GenAI (Claude) was used to help write and debug the code, following the
T06-1 walkthrough (based on Dufour and Meeks, 2024).
