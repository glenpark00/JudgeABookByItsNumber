import axios from 'axios';

export default class GenreBooks {
  constructor(genre) {
    this.genre = genre;
  }

  async fetchBooks() {
    this.books = [];
    let requests = [];
    let num = 0;
    // for (let i = 0; i < 10; i++) {
    for (let i = 0; i < 1; i++) {
      // let req = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=subject:${this.genre}&maxResults=40&startIndex=${num}`)
      requests.push(axios.get(`https://www.googleapis.com/books/v1/volumes?q=subject:${this.genre}&maxResults=40&startIndex=${num}`));
      num += 40;
    }
    requests.push(axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:9780385333481`))
    await axios.all(requests)
      .then(axios.spread((...response) => {
        response.map(res => {
          this.books = this.books.concat(res.data.items);
        })
    }))
      .catch(err => console.log(err))
  }

  static async create(genre) {
    const genreGroup = new GenreBooks(genre);
    await genreGroup.fetchBooks();
    return genreGroup;
  }
}