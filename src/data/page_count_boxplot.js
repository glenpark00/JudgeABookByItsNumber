import * as d3 from 'd3';

export default class PageCountBoxplot {
  constructGraph(book, data) {
    const graphPage = document.querySelector('.first');
    if (!graphPage) {
      return null;
    }
    const margin = { top: 60, right: 30, bottom: 50, left: 80 },
    width = graphPage.offsetWidth * 4 / 3 - margin.left - margin.right + 80,
    height = graphPage.offsetHeight - margin.top - margin.bottom;
    
    let pageCounts = [];
    data.forEach(d => {
      if (d.pageCount) {
        pageCounts.push(d.pageCount);
      }
    });

    const svg = d3.select('.page-2-content-front')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .attr('x', 0).attr('y', 0)
      .append('g')
      .attr('transform',
        `translate(${margin.left}, ${margin.top})`);
    
    svg.append('text')
      .attr('x', width / 7).attr('y', -20)
      .attr('font-family', 'sans-serif').attr('font-size', '15px')
      .attr('font-weight', '400')
      .attr('fill', '#777')
      .attr('text-anchor', 'middle')
      .text('Page Count Boxplot');

    // Compute summary statistics used for the box:
    let pageCountsSorted = pageCounts.sort(d3.ascending);
    let q1 = d3.quantile(pageCountsSorted, .25);
    let median = d3.quantile(pageCountsSorted, .5);
    let q3 = d3.quantile(pageCountsSorted, .75);
    let iqr = q3 - q1;
    let min = q1 - 1.5 * iqr > 0 ? q1 - 1.5 * iqr : 0;
    let max = q1 + 1.5 * iqr;

    // Show the Y scale
    let y = d3.scaleLinear()
      .domain([0, d3.max(pageCountsSorted)])
      .range([height, 0]);
    svg.call(d3.axisLeft(y))
      .append('text')
      .attr('x', -(height) / 2).attr('y', -45)
      .attr('font-family', 'sans-serif').attr('font-size', '13px')
      .attr('fill', '#777')
      .attr('transform', 'rotate(-90)')
      .attr('text-anchor', 'middle')
      .text('Page Count');

    // a few features for the box
    let center = 100
    let boxWidth = 100

    // Show the main vertical line
    svg
      .append("line")
      .attr("x1", center)
      .attr("x2", center)
      .attr("y1", y(min))
      .attr("y2", y(max))
      .attr("stroke", "black")

    // Show the box
    svg
      .append("rect")
      .attr("x", center - boxWidth / 2)
      .attr("y", y(q3))
      .attr("height", (y(q1) - y(q3)))
      .attr("width", boxWidth)
      .attr("stroke", "black")
      .style("fill", "#EFD780")

    // show median, min and max horizontal lines
    svg
      .selectAll("toto")
      .data([min, median, max])
      .enter()
      .append("line")
      .attr("x1", center - boxWidth / 2)
      .attr("x2", center + boxWidth / 2)
      .attr("y1", d => y(d))
      .attr("y2", d => y(d))
      .attr("stroke", "black")

    let jitterWidth = 50;
    svg.selectAll("indPoints")
      .data(pageCounts.concat(book.pageCount))
      .enter()
      .append("circle")
      .attr("cx", function (d) { return (boxWidth - jitterWidth / 2 + Math.random() * jitterWidth) })
      .attr("cy", function (d) { return (y(d)) })
      .attr("r", 4)
      .style("fill", (d, i) => {
        if (i === pageCounts.length) {
          return 'red';
        } else {
          return '#85C7F2';
        }
      })

    svg.append('line')
      .attr("x1", center + 10)
      .attr("x2", center + boxWidth)
      .attr("y1", y(book.pageCount))
      .attr("y2", height / 2)
      .attr('stroke-width', '0.3px')
      .attr("stroke", "black")

    svg.append('image')
      .attr('href', book.imageLinks.smallThumbnail)
      .attr('x', center + boxWidth).attr('y', height / 2 - 27.5)
      .attr('width', 45).attr('height', 45)

  }
}