import SearchByGenre from './search_by_genre';

export default class Search {
  constructor(shelfBooks) {
    this.shelfBooks = shelfBooks;
    this.handleSearch();
  }

  handleSearch() {
    document.querySelector('.search-button')
      .addEventListener('click', () => this.performSearch())
  }

  performSearch() {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    let genre = document.querySelector('.search-bar').value;
    let term = genre.split('').map(c => {
      if (alphabet.includes(c)) {
        return c;
      } else if (c === ' ') {
        return '+';
      } else {
        return '';
      }
    }).join('');
    SearchByGenre.create(term)
      .then(data => {
        this.shelfBooks.clearBooks();
        this.shelfBooks.populate(data);
      })
  }
}