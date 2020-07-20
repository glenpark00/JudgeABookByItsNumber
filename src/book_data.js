import * as d3 from 'd3';
import RatingHistogram from './rating_histogram';

export default class BookData {
  constructor(book, data) {
    this.book = book;
    this.data = data;
  }

  removeBook() {
    document.querySelector('.book-container').remove();
  }

  createBook() {
    const body = document.querySelector('body');
    const bookContainer = document.createElement('div');
    bookContainer.classList.add('book-container');
    const book = document.createElement('div');
    book.classList.add('book');
    for (let i = 0; i < 6; i++) {
      let page = document.createElement('span');
      page.classList.add('page', 'turn');
      book.appendChild(page);
    }
    const backCover = document.createElement('span');
    backCover.classList.add('cover');
    book.appendChild(backCover);
    let firstPage = document.createElement('span');
    firstPage.classList.add('page', 'first');
    book.appendChild(firstPage);
    const frontCover = document.createElement('span');
    frontCover.classList.add('cover', 'turn');
    book.appendChild(frontCover);
    bookContainer.appendChild(book);
    bookContainer.addEventListener('click', e => e.stopPropagation());
    body.appendChild(bookContainer);
    setTimeout(() => document.addEventListener('click', this.removeBook, { once: true }), 500)
    this.fillBook();
  }

  fillBook() {
    const page1 = document.querySelector('.book > .first');
    const pageContent = document.createElement('div');
    pageContent.classList.add('page-content');
    const bookInfo = document.createElement('div');
    bookInfo.classList.add('book-info');
    const image = document.createElement('img');
    image.src = (this.book.imageLinks ? this.book.imageLinks.thumbnail : 'src/assets/no_image.svg');
    bookInfo.appendChild(image);
    const bookHeaders = document.createElement('div');
    bookHeaders.classList.add('book-headers');
    const title = document.createElement('h1');
    title.innerHTML = this.book.title;
    bookHeaders.appendChild(title);
    const author = document.createElement('div')
    author.classList.add('book-info-author');
    author.innerHTML = `by ${this.book.authors ? this.book.authors[0] : 'Unknown'}`;
    bookHeaders.appendChild(author);
    bookInfo.appendChild(bookHeaders);
    const desc = document.createElement('p');
    desc.innerHTML = this.book.description;
    pageContent.appendChild(bookInfo);
    pageContent.appendChild(desc);
    const ratingContainer = document.createElement('div');
    ratingContainer.classList.add('rating-container');
    const averageRating = document.createElement('div');
    averageRating.classList.add('average-rating');
    const rating = document.createElement('div');
    rating.innerHTML = `Average Rating: ${this.book.averageRating}`;
    averageRating.appendChild(rating);
    averageRating.appendChild(this.createStars())
    ratingContainer.appendChild(averageRating);
    const ratingsCount = document.createElement('div');
    ratingsCount.classList.add('ratings-count');
    ratingsCount.innerHTML = `Ratings Count: ${this.book.ratingsCount}`;
    ratingContainer.appendChild(ratingsCount);
    pageContent.appendChild(ratingContainer);
    const graphPage = document.createElement('div');
    graphPage.classList.add('graph-page');
    pageContent.appendChild(graphPage);
    page1.appendChild(pageContent);
    setTimeout(() => {
      new RatingHistogram().constructGraph(this.book, this.data);
    }, 1500)
  }

  createStars() {
    const rating = this.book.averageRating;
    const num = Math.floor(rating);
    const decimal = rating - num;
    const starsContainer =  document.createElement('div');
    for (let i = 0; i < num; i++) {
      const filledStar = document.createElement('i');
      filledStar.classList.add('fa', 'fa-star');
      starsContainer.appendChild(filledStar);
    }
    let partialStar;
    if (decimal > 0) {
      partialStar = document.createElement('i');
      partialStar.classList.add('fa', 'fa-star', 'partial');
      starsContainer.appendChild(partialStar);
    }
    return starsContainer;
  }
}