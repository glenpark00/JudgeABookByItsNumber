import * as d3 from 'd3';

export default class BookData {
  constructor(books) {
    this.data = books;
  }

  removeBook() {
    document.querySelector('.book-container').remove();
  }

  createBook() {
    let hasBook = document.querySelector('.book-container');
    if (hasBook) {
      hasBook.remove();
    }
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
    let lastPage = document.createElement('span');
    lastPage.classList.add('page');
    book.appendChild(lastPage);
    const frontCover = document.createElement('span');
    frontCover.classList.add('cover', 'turn');
    book.appendChild(frontCover);
    bookContainer.appendChild(book);
    // bookContainer.addEventListener('click', e => e.stopPropagation());
    body.appendChild(bookContainer);
    document.querySelector('.svg-background').addEventListener('click', () => {
      this.removeBook();
    }, { once: true })
  }
}