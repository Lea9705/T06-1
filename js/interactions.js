const populateFilters = (data) => {

  // 1. Create one button per filter option
  d3.select("#filters_screen")
    .selectAll(".filter")
    .data(filters_screen)
    .join("button")
    .attr("class", d => `filter ${d.isActive ? "active" : ""}`)
    .text(d => d.label)

    // 2. Listen for clicks
    .on("click", (e, d) => {
      console.log("Clicked filter:", e);
      console.log("Clicked filter data:", d);

      if (!d.isActive) {
        // 3. Only the clicked button becomes active
        filters_screen.forEach(filter => {
          filter.isActive = d.id === filter.id ? true : false;
        });

        // 4. Update the "active" class on the buttons
        //    (the exercise's screenshot says "#filter_screen" – missing the "s" – which doesn't match the div)
        d3.selectAll("#filters_screen .filter")
          .classed("active", filter => filter.id === d.id ? true : false);

        // 5. Redraw the histogram with the chosen data
        updateHistogram(d.id, data);
      }
    });

  // Update the histogram
  const updateHistogram = (filterId, data) => {

    // 1. Filter the data ("all" = no filter)
    const updatedData = filterId === "all"
      ? data
      : data.filter(tv => tv.screenTech === filterId);

    // 2. Re-bin the filtered data (same bin boundaries as the full chart)
    const updatedBins = binGenerator(updatedData);

    // 3. Animate the bars to their new heights
    d3.selectAll("#histogram rect")
      .data(updatedBins)
      .transition()
      .duration(500)
      .ease(d3.easeCubicInOut)
      .attr("y", d => yScale(d.length))
      .attr("height", d => innerHeight - yScale(d.length));
  };
};


/******************************************/
/*  T06-2: tooltip for the scatterplot     */
/******************************************/

// Create the tooltip (hidden until a dot is hovered)
const createTooltip = () => {
  const tooltip = innerChartS
    .append("g")
    .attr("class", "tooltip")
    .style("opacity", 0)            // invisible to start with
    .style("pointer-events", "none"); // so it never blocks the mouse

  // Tooltip background: rounded, slightly see-through
  tooltip
    .append("rect")
    .attr("width", tooltipWidth)
    .attr("height", tooltipHeight)
    .attr("rx", 3)
    .attr("ry", 3)
    .attr("fill", barColor)
    .attr("fill-opacity", 0.75);

  // Tooltip text
  tooltip
    .append("text")
    .text("NA")
    .attr("x", tooltipWidth / 2)
    .attr("y", tooltipHeight / 2)
    .attr("dy", "0.35em")           // centres the text vertically
    .attr("text-anchor", "middle")
    .attr("fill", "white")
    .style("font-weight", 900);
};

// React to the mouse entering / leaving a dot
const handleMouseEvents = () => {
  const tooltip = innerChartS.select(".tooltip");

  innerChartS.selectAll("circle")
    .on("mouseenter", (e, d) => {
      console.log("mouseenter", e, d); // e = the event, d = the TV's data

      // 1. Put the screen size in the tooltip
      tooltip.select("text")
        .text(`${d.screenSize} inches`);

      // 2. Find the centre of the hovered circle
      const cx = +e.target.getAttribute("cx");
      const cy = +e.target.getAttribute("cy");

      // Centre the tooltip above the dot; if that would go off the top, show it below
      const x = cx - 0.5 * tooltipWidth;
      const y = cy - 1.5 * tooltipHeight < -margin.top
        ? cy + 0.5 * tooltipHeight
        : cy - 1.5 * tooltipHeight;

      // 3. Move the tooltip there and fade it in
      tooltip
        .interrupt()
        .attr("transform", `translate(${x}, ${y})`)
        .transition()
        .duration(200)
        .style("opacity", 1);
    })
    .on("mouseleave", () => {
      // 4. Hide it again and move it out of the way
      tooltip
        .interrupt()
        .style("opacity", 0)
        .attr("transform", "translate(0, 500)");
    });
};
