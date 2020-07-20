import * as d3 from 'd3';

export default class RatingHistogram {
  constructGraph(book, data) {
    const graphPage = document.querySelector('.first');
    if (!graphPage) {
      return null;
    }
    const width = graphPage.offsetWidth - 100,
      height = graphPage.offsetHeight - 350;

    const books = data.filter(d => d.averageRating);

    const svg = d3.select('.graph-page')
      .append("svg")
      .attr("width", width + 20)
      .attr("height", height + 30)
      .attr('x', 0).attr('y', 0)
      .append("g");

    const x = d3.scaleLinear()
      .domain([
        d3.min(books, d => d.averageRating),
        d3.max(books, d => d.averageRating) + 0.49
      ])
      .range([0, width]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // set the parameters for the histogram
    const histogram = d3.histogram()
      .value(function (d) { return d.averageRating; })   // I need to give the vector of value
      .domain(x.domain())  // then the domain of the graphic
      .thresholds(x.ticks(70)); // then the numbers of bins

    // And apply this function to books to get the bins
    const bins = histogram(books);

    // Y axis: scale and draw:
    const y = d3.scaleLinear()
      .range([height, 0]);
    y.domain([0, d3.max(bins, function (d) { return d.length + 10; })]);   // d3.hist has to be called before the Y axis obviously
    svg.append("g")
      .call(d3.axisLeft(y));

    // append the bar rectangles to the svg element
    svg.selectAll("rect")
      .data(bins)
      .enter()
      .append("rect")
      .attr("x", 1)
      .attr("transform", function (d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
      .attr("width", width/10)
      .attr("height", function (d) { return height - y(d.length); })
      .style("fill", "#69b3a2")
  }
  
}