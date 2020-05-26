export default class BookData {
  constructor(book, data) {
    this.book = book;
    this.data = data;
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
    let firstPage = document.createElement('span');
    firstPage.classList.add('page', 'first');
    book.appendChild(firstPage);
    const frontCover = document.createElement('span');
    frontCover.classList.add('cover', 'turn');
    book.appendChild(frontCover);
    bookContainer.appendChild(book);
    bookContainer.addEventListener('click', e => e.stopPropagation());
    body.appendChild(bookContainer);
    setTimeout(() => document.addEventListener('click', () => {
      this.removeBook();
    }, { once: true }), 500)
    this.fillBook();
  }

  fillBook() {
    const page1 = document.querySelector('.book > .first');
    const title = document.createElement('h1');
    title.innerHTML = this.book.volumeInfo.title;
    page1.appendChild(title);
    const desc = document.createElement('p');
    desc.innerHTML = this.book.volumeInfo.description;
    page1.appendChild(desc);
  }
}