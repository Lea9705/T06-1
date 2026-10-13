const drawScatterplot = (data) => {

  /* Set up the chart area */
  const svg = d3.select("#scatterplot")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`); // responsive SVG

  // innerChartS is declared in shared-constants.js, so it is NOT re-declared here
  // (no "const") – we just give it a value. This keeps it separate from the histogram.
  innerChartS = svg
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  /* x and y scales (declared in shared-constants.js) */
  const maxStar = d3.max(data, d => d.star);
  const maxEnergy = d3.max(data, d => d.energyConsumption);

  xScaleS
    .domain([0, maxStar + 0.5]) // a little room so the 8-star dots aren't on the edge
    .range([0, innerWidth]);

  yScaleS
    .domain([0, maxEnergy])
    .range([innerHeight, 0])
    .nice();

  /* Colour scale – hue shows category (screen technology) */
  const screenTechs = ["LED", "LCD", "OLED"];
  colorScale
    .domain(screenTechs)
    .range(["#1f77b4", "#ff7f0e", "#2ca02c"]); // blue, orange, green: clearly different hues

  /* Draw the circles */
  innerChartS
    .selectAll("circle")
    .data(data)
    .join("circle")
    .attr("cx", d => xScaleS(d.star))
    .attr("cy", d => yScaleS(d.energyConsumption))
    .attr("r", 4)
    .attr("fill", d => colorScale(d.screenTech))
    .attr("opacity", 0.5); // see-through so overlapping dots are visible; no stroke

  /* Bottom axis */
  const bottomAxis = d3.axisBottom(xScaleS);

  innerChartS
    .append("g")
    .attr("transform", `translate(0, ${innerHeight})`)
    .call(bottomAxis);

  svg
    .append("text")
    .text("Star Rating")
    .attr("text-anchor", "end")
    .attr("x", width - 20)
    .attr("y", height - 5)
    .attr("class", "axis-label");

  /* Left axis */
  const leftAxis = d3.axisLeft(yScaleS);

  innerChartS
    .append("g")
    .call(leftAxis);

  svg
    .append("text")
    .text("Labelled Energy Consumption (kWh/year)")
    .attr("x", 30)
    .attr("y", 20)
    .attr("class", "axis-label");

  /* Legend (top right, where there are few dots) */
  const legend = svg
    .append("g")
    .attr("transform", `translate(${width - 140}, ${margin.top})`);

  const legendItems = legend
    .selectAll("g")
    .data(screenTechs)
    .join("g")
    .attr("transform", (d, i) => `translate(0, ${i * 22})`);

  legendItems
    .append("circle")
    .attr("cx", 6)
    .attr("cy", 6)
    .attr("r", 6)
    .attr("fill", d => colorScale(d));

  legendItems
    .append("text")
    .text(d => d)
    .attr("x", 18)
    .attr("y", 11)
    .attr("class", "axis-label");
};
