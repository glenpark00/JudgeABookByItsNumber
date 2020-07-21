import * as d3 from 'd3';
import Book from './book';

export default class Books {
  populate(data) {
    let svg = d3.select('svg');
    
    if (data.books.length < 1) {
      svg.append('text')
      .attr('x', 700).attr('y', 300)
      .text('No books found for that genre. Try another one!')
      .attr('font-family', 'sans-serif').attr('font-size', '20px')
      .attr('font-weight', '400')
      .attr('fill', '#eee')
      return;
    }

    let books = [];

    // for (const book of books) {
    //   if (book.averageRating) {
    //     book.popularityScore = book.averageRating * book.ratingsCount
    //   } else {
    //     book.popularityScore = 0;
    //   }
    // }

    data.books.forEach(d => {
      let popularityScore = 0;
      if (d.averageRating) {
        popularityScore = d.averageRating * d.ratingsCount;
      }
      books.push(Object.assign({}, d, { popularityScore }))
    })

    books = books.sort((a, b) => b.popularityScore - a.popularityScore);

    let jumbledBest = books.slice(0, 80);
    for (let i = jumbledBest.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = jumbledBest[i];
      jumbledBest[i] = jumbledBest[j];
      jumbledBest[j] = temp;
    }

    let group = svg.append('g').attr('class', 'books-group');

    // Fill middle shelf with books
    new Book(books[0], 557, 505, 80, 290, books, group, 12);
    d3.select('.books-group > image:first-child').attr('transform', 'rotate(40, 637, 215)')

    let bookMidX = 600;
    let randomMidIndices = this.shuffleBooks(11);
    for (const book of jumbledBest.slice(1, 11)) {
      let bookWidth = Math.floor(Math.random() * 10) + 80;
      let bookHeight = Math.floor(Math.random() * 30) + 300;
      new Book(book, bookMidX, 480, bookWidth, bookHeight, books, group, randomMidIndices.shift());
      bookMidX += bookWidth - 2;
    }

    // Fill lower shelf with books
    let bookLowerX = 425;
    let randomLowerIndices = this.shuffleBooks(15);
    for (const book of jumbledBest.slice(11, 24)) {
      let bookWidth = Math.floor(Math.random() * 10) + 80;
      let bookHeight = Math.floor(Math.random() * 30) + 300;
      new Book(book, bookLowerX, 875, bookWidth, bookHeight, books, group, randomLowerIndices.shift());
      bookLowerX += bookWidth - 5;
    }

    // Fill left shelf with books
    let bookLeftX = -90;
    let randomLeftIndices = this.shuffleBooks(15);
    for (const book of jumbledBest.slice(24, 29)) {
      let bookWidth = Math.floor(Math.random() * 10) + 70;
      let bookHeight = Math.floor(Math.random() * 30) + 300;
      new Book(book, bookLeftX, 875, bookWidth, bookHeight, books, group, randomLeftIndices.shift());
      bookLeftX += bookWidth - 3;
    }
  }

  clearBooks() {
    d3.select('.books-group').remove();
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
}