import * as d3 from 'd3';
import BookData from './book_data';

export default class Book {
  constructor(book, xPos, yPos, bookWidth, bookHeight, data, group, imageNumber) {
    group.append('image')
      .attr('href', `src/assets/spines/book${imageNumber}.png`)
      .attr('class', 'book-spine')
      .attr('x', xPos + bookWidth).attr('y', yPos - bookHeight)
      .attr('width', bookWidth).attr('height', bookHeight)
      .on('click', () => {
        let bookContainer = document.querySelector('.book-container');
        if (!bookContainer) {
          new BookData(book, data).createBook();
        } 
      })
      .on('mouseenter', function () {
        d3.select(this).attr('opacity', '0.75')
        document.querySelector('.hover-book').innerHTML = book.title.toUpperCase();
      })
      .on('mouseleave', function () {
        d3.select(this).attr('opacity', '1')
        document.querySelector('.hover-book').innerHTML = '';
      })
  }
}