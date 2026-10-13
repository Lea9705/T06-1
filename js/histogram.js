const drawHistogram = (data) => {

  /* Set the dimensions and margins of the chart area */
  const svg = d3.select("#histogram")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`); // responsive SVG

  // Create an inner chart group with margins
  const innerChart = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  /*****************************/
  /*      Generate the bins    */
  /*****************************/
  const bins = binGenerator(data); // save the bins into an array
  console.log(bins);               // log the bins for debugging

  // Lock the bin boundaries to the ones made from ALL the data.
  // Without this, filtered data (e.g. only OLED) would get different
  // bins and the bars would no longer line up with the x-axis.
  binGenerator
    .domain([bins[0].x0, bins[bins.length - 1].x1])
    .thresholds(bins.slice(1).map(b => b.x0));

  /*****************************/
  /*      Define the scales    */
  /*****************************/
  const minEng = bins[0].x0;                        // lower bound of the first bin
  const maxEng = bins[bins.length - 1].x1;          // upper bound of the last bin
  const binsMaxLength = d3.max(bins, d => d.length); // tallest bin

  xScale
    .domain([minEng, maxEng])
    .range([0, innerWidth]);

  yScale
    .domain([0, binsMaxLength])
    .range([innerHeight, 0])
    .nice(); // round the y-axis values

  /*****************************/
  /*  Draw the bars            */
  /*****************************/
  innerChart
    .selectAll("rect")
    .data(bins)
    .join("rect")
    .attr("x", d => xScale(d.x0))
    .attr("y", d => yScale(d.length))
    .attr("width", d => xScale(d.x1) - xScale(d.x0))
    .attr("height", d => innerHeight - yScale(d.length))
    .attr("fill", barColor)
    .attr("stroke", bodyBackgroundColor) // stroke gives the appearance of a gap
    .attr("stroke-width", 2);

  /*****************************/
  /*  Add axes                 */
  /*****************************/
  const bottomAxis = d3.axisBottom(xScale);

  // x-axis at the bottom of the inner chart
  innerChart
    .append("g")
    .attr("transform", `translate(0, ${innerHeight})`)
    .call(bottomAxis);

  // x-axis label
  svg
    .append("text")
    .text("Labelled Energy Consumption (kWh/year)")
    .attr("text-anchor", "end")
    .attr("x", width - 20)
    .attr("y", height - 5)
    .attr("class", "axis-label");

  const leftAxis = d3.axisLeft(yScale);

  // y-axis on the left of the inner chart
  innerChart
    .append("g")
    .call(leftAxis);

  // y-axis label
  svg
    .append("text")
    .text("Frequency")
    .attr("x", 30)
    .attr("y", 20)
    .attr("class", "axis-label");
};
