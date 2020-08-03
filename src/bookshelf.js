import * as d3 from 'd3';
import Books from './books';
import Search from './search';

export default class Bookshelf {
  constructor(data) {
    this.data = data;
  }

  constructBookshelf() {
    const container = document.getElementById('svg-container');
    const width = container.offsetWidth;
    const height = container.offsetHeight;
    d3.select('#svg-container').append('svg')
      .attr('viewBox', `0 0 ${width} ${height}`).attr('preserveAspectRatio', 'xMidYMid meet')
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

    // Populate shelf with books
    let shelfBooks = new Books();
    shelfBooks.populate(this.data);

    // Set up searching
    new Search(shelfBooks);

    // Cat image
    const catGroup = svg.append('g').attr('class', 'cat-group');

    catGroup.append("path")
      // .attr('x', 100).attr('y', 250)
      .attr('id', 'curve')
      .attr('d', 'M 25,320 A 200,110 0, 0,1 400,300')
      .attr('fill', 'transparent')

    catGroup.append('text')
      .attr('x', 35).attr('y', 250)
      .attr("stroke", "black")
      .attr('font-family', 'Varela Round')
      .append("textPath")
      .attr("xlink:href", '#curve')
      .text('Click me!')

    catGroup.append('image')
      .attr('href', 'src/assets/cat1.png')
      .attr('class', 'cat')
      .attr('x', -20).attr('y', 290)
      .attr('width', 400).attr('height', 400)
      .attr('transform', 'rotate(-10, -20, 290)')

    catGroup.append('rect')
      .attr('x', 25).attr('y', 250)
      .attr('width', 350).attr('height', 200)
      .attr('class', 'cat-box')
      .attr('fill', 'transparent')
      .on('click', () => {
        this.addClouds();
        setTimeout(() => document.addEventListener('click', () => {
          this.removeClouds();
        }, { once: true }), 300)
      })

    const cat = d3.select('.cat');

    setInterval(() => {
      cat.attr('href', 'src/assets/cat2.png')
      setTimeout(() => cat.attr('href', 'src/assets/cat1.png'), 400);
    }, 4000)
  }

  addClouds() {
    let svg = d3.select('svg');
    let cloudGroup = svg.append('g').attr('class', 'cloud-group')
      .on('click', () => d3.event.stopPropagation())

    cloudGroup.append('image')
      .attr('href', 'src/assets/thought_cloud3.png')
      .attr('class', 'cloud')
      .attr('x', 340).attr('y', 325)
      .attr('width', 30).attr('height', 20)
      
      setTimeout(() => {
        cloudGroup.append('image')
        .attr('href', 'src/assets/thought_cloud2.png')
        .attr('class', 'cloud')
        .attr('x', 330).attr('y', 280)
        .attr('width', 50).attr('height', 30)
      }, 150)
      
      setTimeout(() => {
        cloudGroup.append('image')
          .attr('href', 'src/assets/thought_cloud1.png')
          .attr('class', 'cloud')
          .attr('x', 90).attr('y', 0)
          .attr('width', 500).attr('height', 260)

      const firstTextGroup = cloudGroup.append('g').attr('class', 'first-text-group');
          
        firstTextGroup.append('text')
          .attr('x', 235).attr('y', 70)
          .attr('font-size', '13px')
          .attr('font-family', 'Varela Round')
          .text('Welcome to JudgeABookByItsNumber!')

        firstTextGroup.append('text')
          .attr('x', 195).attr('y', 105)
          .attr('font-size', '13px')
          .attr('font-family', 'Varela Round')
          .text('The goal of this site is to hook you up with your')

        firstTextGroup.append('text')
          .attr('x', 180).attr('y', 125)
          .attr('font-size', '13px')
          .attr('font-family', 'Varela Round')
          .text('next page-turner using the power of simple statistics.')

        firstTextGroup.append('text')
          .attr('x', 155).attr('y', 160)
          .attr('font-size', '13px')
          .attr('font-family', 'Varela Round')
          .text('To get started, type your favorite genre into the search bar,')

        firstTextGroup.append('text')
          .attr('x', 165).attr('y', 180)
          .attr('font-size', '13px')
          .attr('font-family', 'Varela Round')
          .text(' and our librarians will stock the shelves with some popular ')

        firstTextGroup.append('text')
          .attr('x', 215).attr('y', 200)
          .attr('font-size', '13px')
          .attr('font-family', 'Varela Round')
          .text('books from a random sample of results.')

        firstTextGroup.append('image')
          .attr('class', 'cloud-next')
          .attr('href', 'src/assets/triangle_right.svg')
          .attr('opacity', '0.85')
          .attr('x', 330).attr('y', 220)
          .on('click', () => {
            firstTextGroup.remove();
            const secondTextGroup = cloudGroup.append('g');
            secondTextGroup.append('text')
              .attr('x', 235).attr('y', 70)
              .attr('font-size', '13px')
              .attr('font-family', 'Varela Round')
              .text('Click a book on the shelf to view info')

            secondTextGroup.append('text')
              .attr('x', 185).attr('y', 90)
              .attr('font-size', '13px')
              .attr('font-family', 'Varela Round')
              .text('and statistics about the book. If you like what you')

            secondTextGroup.append('text')
              .attr('x', 175).attr('y', 110)
              .attr('font-size', '13px')
              .attr('font-family', 'Varela Round')
              .text('see, click on the Google Book link to look deeper into it.')

            secondTextGroup.append('text')
              .attr('x', 260).attr('y', 150)
              .attr('font-size', '13px')
              .attr('font-family', 'Varela Round')
              .text('Thanks for stopping by!')

            secondTextGroup.append('image')
              .attr('class', 'linkedin-icon')
              .attr('x', 305).attr('y', 180)
              .attr('width', '25px')
              .attr('height', '25px')
              .attr('cursor', 'pointer')
              .attr('href', 'src/assets/linkedin.svg')
              .on('click', () => {
                d3.event.stopPropagation();
                window.open('https://www.linkedin.com/in/glen-park/');
              })

            secondTextGroup.append('image')
              .attr('class', 'linkedin-icon')
              .attr('x', 355).attr('y', 180)
              .attr('width', '25px')
              .attr('height', '25px')
              .attr('cursor', 'pointer')
              .attr('href', 'src/assets/github.svg')
              .on('click', () => {
                d3.event.stopPropagation();
                window.open('https://github.com/glenpark00');
              })

            setTimeout(() => cloudGroup.on('click', () => {
              cloudGroup.remove();
            }), 100)
          })
    }, 300)
  }

  removeClouds() {
    d3.select('.cloud-group').remove();
  }
}