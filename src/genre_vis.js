import * as d3 from 'd3';
import BookData from './book_data';

export default class GenreVis {
  constructor(data) {
    this.data = data;
  }

  shuffleBooks(length) {
    let indices = [...Array(length).keys()];
    for (let i = length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = indices[i];
      indices[i] = indices[j];
      indices[j] = temp;
    }
    return indices.map(i => i + 1);
  }

  renderBook() {
    const container = document.getElementById('svg-container');
    const width = container.offsetWidth;
    const height = container.offsetHeight;
    d3.select('#svg-container').append('svg')
      .attr('viewBox', `0 0 ${width} ${height}`).attr('preserveAspectRatio', 'xMidYMid meet')
    const books = this.data.books;
    let svg = d3.select('svg');

    // Create the background (brown)
    svg.append('rect')
      .attr('class', 'svg-background')
      .attr('x', 0).attr('y', 0)
      .attr('width', '100%').attr('height', '100%')
      .attr('fill', '#C18C5A')
      
    // Create the right shelf wall (on the left)
    svg.append('line')
      .attr('x1', 390).attr('y1', 0)
      .attr('x2', 390).attr('y2', 800)
      .attr('stroke', '#D7984D').attr('stroke-width', 30)
    
    // Create the left shelf wall (on the right)
    svg.append('line')
    .attr('x1', 430).attr('y1', 0)
    .attr('x2', 430).attr('y2', 800)
    .attr('stroke', '#D7984D').attr('stroke-width', 30) 
      
    // Create the dark space between shelves
    svg.append('line')
      .attr('x1', 410).attr('y1', 0)
      .attr('x2', 410).attr('y2', 800)
      .attr('stroke', '#6D4527').attr('stroke-width', 10)

    // Create the right shelves
    svg.append('line')
      .attr('x1', 430).attr('y1', 120)
      .attr('x2', 1800).attr('y2', 120)
      .attr('stroke', '#D7984D').attr('stroke-width', 30) 

    svg.append('line')
      .attr('x1', 430).attr('y1', 500)
      .attr('x2', 1800).attr('y2', 500)
      .attr('stroke', '#D7984D').attr('stroke-width', 30) 

    // Create the left shelves
    svg.append('line')
      .attr('x2', 0).attr('y2', 70)
      .attr('x1', 380).attr('y1', 70)
      .attr('stroke', '#D7984D').attr('stroke-width', 30) 

    svg.append('line')
      .attr('x2', 0).attr('y2', 450)
      .attr('x1', 380).attr('y1', 450)
      .attr('stroke', '#D7984D').attr('stroke-width', 30) 

    let bookX = 600;
    let randomIndices = this.shuffleBooks(10);
    for (let i = 0; i < 10; i++) {
      let bookWidth = Math.floor(Math.random() * (90 - 80)) + 80;
      let bookHeight = Math.floor(Math.random() * (330 - 290)) + 290;
      svg.append('image')
        .attr('href', `src/assets/spines/book${randomIndices[i]}.png`)
        .attr('class', 'book-spine')
        .attr('x', bookX + bookWidth).attr('y', 480 - bookHeight)
        .attr('width', bookWidth).attr('height', bookHeight)
        .data([books])
      bookX += bookWidth - 10;
    }

    svg.append('image')
      .attr('href', 'src/assets/spines/book12.png')
      .attr('class', 'book-spine')
      .attr('x', 642).attr('y', 215)
      .attr('transform', 'rotate(40, 642, 215)')
      .attr('width', 80).attr('height', 290)
      .data([books])

    d3.selectAll('.book-spine')
      .on('click', (d) => {
        new BookData(d).createBook();
      })
    
    svg.append('image')
      .attr('href', 'src/assets/cat1.png')
      .attr('class', 'cat')
      .attr('x', -20).attr('y', 290)
      .attr('width', 400).attr('height', 400)
      .attr('transform', 'rotate(-10, -20, 290)')

    const cat = d3.select('.cat')

    setInterval(() => {
      setTimeout(() => cat.attr('href', 'src/assets/cat2.png'), 100);
      setTimeout(() => cat.attr('href', 'src/assets/cat1.png'), 600);
    }, 4000)
  }
}