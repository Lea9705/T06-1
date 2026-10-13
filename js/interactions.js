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
