import axios from 'axios';

export default class SearchByTitle {
  constructor(genre) {
    this.genre = genre;
    this.books = [];
  }

  async fetchBook() {
    let requests = [];
    for (let i = 0; i < 10; i++) {
      requests.push(axios.get(`https://www.googleapis.com/books/v1/volumes?q=subject:${this.genre}&maxResults=40&startIndex=${i * 40}`));
    }
    await axios.all(requests)
      .then(axios.spread((...response) => {
        if (response) {
          response.map(res => {
            const items = res.data.items || [];
            this.books = this.books.concat(items.map(item => item.volumeInfo));
          })
        }
      }))
  }

  static async create(title) {
    const results = new SearchByTitle(title);
    await results.fetchBook();
    return results;
  }
}