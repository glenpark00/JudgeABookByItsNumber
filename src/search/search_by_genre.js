import axios from "axios";

export default class SearchByGenre {
  constructor(genre) {
    this.genre = genre;
    this.books = [];
    this.error = null;
  }

  async fetchBook() {
    let requests = [];
    for (let i = 0; i < 10; i++) {
      requests.push(
        axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=subject:${
            this.genre
          }&maxResults=40&startIndex=${i * 40}`
        )
      );
    }
    await axios
      .all(requests)
      .then(
        axios.spread((...response) => {
          if (response) {
            response.map((res) => {
              const items = res.data.items || [];
              this.books = this.books.concat(
                items.map((item) => item.volumeInfo)
              );
            });
          }
        })
      )
      .catch(
        () =>
          (this.error =
            "Too many requests made to the Google Books API, please wait before trying again")
      );
  }

  static async create(title) {
    const results = new SearchByGenre(title);
    await results.fetchBook();
    return results;
  }
}
