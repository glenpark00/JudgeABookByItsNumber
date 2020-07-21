import * as d3 from 'd3';

export default class PopularityHistogram {
  constructGraph(book, data) {
    const graphPage = document.querySelector('.first');
    if (!graphPage) {
      return null;
    }
    const margin = { top: 60, right: 30, bottom: 60, left: 50 },
      width = graphPage.offsetWidth - margin.left - margin.right - 100,
      height = graphPage.offsetHeight - margin.top - margin.bottom - 200;

    let books = data.filter(d => d.popularityScore > 0).sort((a, b) => a.popularityScore - b.popularityScore);
    const l = books.length;
    const low = Math.round(l * 0.05);
    const high = l - low;
    books = books.slice(low, high);

    const svg = d3.select('.page-3-content-front')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .attr('x', 0).attr('y', 0)
      .append('g')
      .attr('transform',
        `translate(${margin.left}, ${margin.top})`);

    svg.append('text')
      .attr('x', width / 2).attr('y', -20)
      .attr('font-family', 'sans-serif').attr('font-size', '15px')
      .attr('font-weight', '400')
      .attr('fill', '#777')
      .attr('text-anchor', 'middle')
      .text('Popularity Histogram For This Sample of Books');

    const x = d3.scaleLinear()
      .domain([
        d3.min(books, d => d.popularityScore),
        d3.max(books, d => d.popularityScore) + width / 50
      ])
      .range([0, width]);
    svg.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x))
      .append('text')
      .attr('x', width / 2).attr('y', 40)
      .attr('font-family', 'sans-serif').attr('font-size', '10.5px')
      .attr('fill', '#777')
      .attr('text-anchor', 'middle')
      .text('Popularity Score (Ratings Count x Average Rating)');

    const histogram = d3.histogram()
      .value(d => d.popularityScore)
      .domain(x.domain())
      .thresholds(x.ticks(35));

    const bins = histogram(books);

    const y = d3.scaleLinear()
      .range([height, 0]);
    y.domain([0, d3.max(bins, d => d.length) + 2]);

    svg.append('g')
      .call(d3.axisLeft(y))
      .append('text')
      .attr('x', -(height) / 2).attr('y', -35)
      .attr('font-family', 'sans-serif').attr('font-size', '13px')
      .attr('fill', '#777')
      .attr('transform', 'rotate(-90)')
      .attr('text-anchor', 'middle')
      .text('Frequency');

    svg.selectAll('rect')
      .data(bins)
      .enter()
      .append('rect')
      .attr('x', d => x(d.x0)).attr('y', d => y(0))
      .attr('width', width / bins.length - 0.5)
      .attr('height', d => height - y(0))
      .style('fill', d => {
        if (book.popularityScore >= d.x0 && book.popularityScore < d.x1) {
          return 'orange';
        } else {
          return '#9C528B'
        }
      })
      .transition()
      .duration(500)
      .attr("y", d => y(d.length))
      .attr("height", d => height - y(d.length))
      .delay((d, i) => i * 30 + 1800)
  }
}