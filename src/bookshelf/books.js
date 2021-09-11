import * as d3 from "d3";
import Book from "./book";

export default class Books {
  constructor(widthScale, heightScale) {
    self.widthScale = widthScale;
    self.heightScale = heightScale;
  }

  populate(data) {
    let svg = d3.select("svg");

    let books = [];

    data.books.forEach((d) => {
      let popularityScore = 0;
      if (d.averageRating) {
        popularityScore = d.averageRating * d.ratingsCount;
        books.push(Object.assign({}, d, { popularityScore }));
      }
    });

    if (data.error) {
      svg
        .append("text")
        .attr("class", "no-books-text")
        .attr("x", 600 * widthScale)
        .attr("y", 300 * heightScale)
        .text(data.error)
        .attr("font-family", "sans-serif")
        .attr("font-size", "16px")
        .attr("font-weight", "400")
        .attr("fill", "#eee");
    } else if (books.length < 1) {
      svg
        .append("text")
        .attr("class", "no-books-text")
        .attr("x", 700 * widthScale)
        .attr("y", 300 * heightScale)
        .text("No books found for that genre. Try another one!")
        .attr("font-family", "sans-serif")
        .attr("font-size", "20px")
        .attr("font-weight", "400")
        .attr("fill", "#eee");
      return;
    } else {
      let text = d3.select(".no-books-text");
      if (text) text.remove();
    }

    books = books.sort((a, b) => b.popularityScore - a.popularityScore);

    let jumbledBest = books.slice(0, 80);
    for (let i = jumbledBest.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = jumbledBest[i];
      jumbledBest[i] = jumbledBest[j];
      jumbledBest[j] = temp;
    }

    let group = svg.append("g").attr("class", "books-group");

    // Fill middle shelf with books
    if (books[0]) {
      new Book(
        books[0],
        557 * widthScale,
        505 * heightScale,
        80 * widthScale,
        290 * heightScale,
        books,
        group,
        12
      );
      d3.select(".books-group > image:first-child").attr(
        "transform",
        `rotate(40, ${637 * widthScale}, ${215 * heightScale})`
      );
    }

    let bookMidX = 600 * widthScale;
    let randomMidIndices = this.shuffleBooks(11);
    for (const book of jumbledBest.slice(1, 11)) {
      let bookWidth = (Math.floor(Math.random() * 10) + 80) * widthScale;
      let bookHeight = (Math.floor(Math.random() * 30) + 300) * heightScale;
      new Book(
        book,
        bookMidX,
        480 * heightScale,
        bookWidth,
        bookHeight,
        books,
        group,
        randomMidIndices.shift()
      );
      bookMidX += bookWidth - 2;
    }

    // Fill lower shelf with books
    let bookLowerX = 425 * widthScale;
    let randomLowerIndices = this.shuffleBooks(15);
    for (const book of jumbledBest.slice(11, 24)) {
      let bookWidth = (Math.floor(Math.random() * 10) + 80) * widthScale;
      let bookHeight = (Math.floor(Math.random() * 30) + 300) * heightScale;
      new Book(
        book,
        bookLowerX,
        875 * heightScale,
        bookWidth,
        bookHeight,
        books,
        group,
        randomLowerIndices.shift()
      );
      bookLowerX += bookWidth - 5;
    }

    // Fill left shelf with books
    let bookLeftX = -90 * widthScale;
    let randomLeftIndices = this.shuffleBooks(15);
    for (const book of jumbledBest.slice(24, 29)) {
      let bookWidth = (Math.floor(Math.random() * 10) + 70) * widthScale;
      let bookHeight = (Math.floor(Math.random() * 30) + 300) * heightScale;
      new Book(
        book,
        bookLeftX,
        875 * heightScale,
        bookWidth,
        bookHeight,
        books,
        group,
        randomLeftIndices.shift()
      );
      bookLeftX += bookWidth - 3;
    }
  }

  clearBooks() {
    d3.select(".books-group").remove();
  }

  shuffleBooks(length) {
    let indices = [...Array(length).keys()];
    for (let i = length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = indices[i];
      indices[i] = indices[j];
      indices[j] = temp;
    }
    return indices.map((i) => i + 1);
  }
}
