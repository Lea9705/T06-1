// Set up dimensions and margins
const margin = { top: 40, right: 30, bottom: 50, left: 70 };
const width = 800;  // total width of the chart
const height = 400; // total height of the chart
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

/*  Make the colours accessible globally  */
/******************************************/
const barColor = "#606464";            // grey bars (matches the example)
const bodyBackgroundColor = "#fbf2e8"; // matches the cream page background in base.css (gap between bars)

// Set up the scales
const xScale = d3.scaleLinear();
const yScale = d3.scaleLinear();

/******************************************/
/*  T06-2: scatterplot constants           */
/******************************************/
// innerChart for the scatterplot (kept separate from the histogram's innerChart).
// "let" because drawScatterplot gives it a value later.
let innerChartS;

// Scales for the scatterplot (S = scatterplot)
const xScaleS = d3.scaleLinear();
const yScaleS = d3.scaleLinear();
const colorScale = d3.scaleOrdinal(); // one hue per screen technology

// Size of the tooltip
const tooltipWidth = 110;
const tooltipHeight = 36;

// Create a bin generator using d3.bin
const binGenerator = d3.bin()
  .value(d => d.energyConsumption); // accessor for energyConsumption

/******************************************/
/*  Make the filter options accessible globally  */
/******************************************/
const filters_screen = [
  { id: "all",  label: "All",  isActive: true  },
  { id: "LED",  label: "LED",  isActive: false },
  { id: "LCD",  label: "LCD",  isActive: false },
  { id: "OLED", label: "OLED", isActive: false }
];
