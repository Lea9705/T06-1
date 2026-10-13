# T06: Interactive Histogram (T06-1) and Scatterplot (T06-2)

D3 charts of TV labelled energy consumption (Ex6_TVdata.csv, Jan 2025 GEMS data).

- **T06-1** – histogram with buttons to filter by screen technology (All, LED, LCD, OLED).
- **T06-2** – scatterplot of energy consumption by star rating, coloured by screen
  technology, with a legend and a tooltip showing screen size.

## Files
- `index.html` – page layout, filter div and chart divs
- `css/base.css` – page and button styles (from Canvas)
- `css/visualisations.css` – chart-specific styles
- `js/load-data.js` – loads and types the CSV, then draws the charts and sets up interactions
- `js/shared-constants.js` – sizes, colours, scales, bin generator, filter options, tooltip size
- `js/histogram.js` – draws the histogram
- `js/scatterplot.js` – draws the scatterplot and legend
- `js/interactions.js` – filter buttons, histogram update, tooltip

## GenAI use
GenAI (Claude) was used to help write and debug the code, following the
T06-1 and T06-2 walkthroughs (based on Dufour and Meeks, 2024).
