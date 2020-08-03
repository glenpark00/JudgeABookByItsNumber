import * as d3 from 'd3';

export default class RatingHistogram {
  constructGraph(book, data) {
    const graphPage = document.querySelector('.first');
    if (!graphPage) {
      return null;
    }
    const margin = { top: 60, right: 30, bottom: 50, left: 50 },
      width = graphPage.offsetWidth - margin.left - margin.right - 100,
      height = graphPage.offsetHeight - margin.top - margin.bottom - 200;

    const books = data.filter(d => d.popularityScore > 0);

    const svg = d3.select('.page-3-content-back')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .attr('x', 0).attr('y', 0)
      .append('g')
      .attr('transform',
        `translate(${margin.left}, ${margin.top})`);
    
    svg.append('text')
      .attr('x', width/2).attr('y', -20)
      .attr('font-family', 'sans-serif').attr('font-size', '15px')
      .attr('font-weight', '400')
      .attr('fill', '#777')
      .attr('text-anchor', 'middle')
      .text('Average Ratings For This Sample of Books');

    const x = d3.scaleLinear()
      .domain([
        d3.min(books, d => d.averageRating),
        d3.max(books, d => d.averageRating) + 0.49
      ])
      .range([0, width]);
    svg.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x))
      .append('text')
      .attr('x', width /2).attr('y', 40)
      .attr('font-family', 'sans-serif').attr('font-size', '13px')
      .attr('fill', '#777')
      .attr('text-anchor', 'middle')
      .text('Average Rating');

    const histogram = d3.histogram()
      .value(d => d.averageRating)   
      .domain(x.domain()) 
      .thresholds(x.ticks(70)); 

    const bins = histogram(books);

    const y = d3.scaleLinear()
      .range([height, 0]);
    y.domain([0, d3.max(bins, d => d.length + 2)]);  

    svg.append('g')
      .call(d3.axisLeft(y))
      .append('text')
      .attr('x', -(height)/2).attr('y', -35)
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
      .attr('width', width/10)
      .attr('height', d => height - y(0))
      .style('fill', d => {
        if (book.averageRating >= d.x0 && book.averageRating < d.x1) {
          return 'orange';
        } else {
          return '#9C528B'
        }
      })
      .transition()
      .delay(1500)
      .duration(500)
      .attr("y", d => y(d.length))
      .attr("height", d => height - y(d.length))
      .delay((d, i) => i * 30)
      
  }
}