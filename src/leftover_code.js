
// *********************** Search By title api call
// async fetchBook() {
//     axios.get(`https://www.googleapis.com/books/v1/volumes?q=title:${this.title}&maxResults=1`)
//       .then(async res => {
//         this.mainBook = res.data.items[0].volumeInfo;
//         await this.fetchRelatedBooks();
//       })
//       .catch(err => console.log(err))
//   }

//   async fetchRelatedBooks() {
//     console.log(this.mainBook)
//     const categories = this.mainBook.categories.join('+');
//     const publisher = this.mainBook.publisher;

//     let requests = [];
//     let num = 0;
//     for (let i = 0; i < 2; i++) {
//       requests.push(axios.get(`https://www.googleapis.com/books/v1/volumes?q=subject:${categories}+inpublisher:${publisher}&maxResults=40&startIndex=${num}`));
//       num += 40;
//     }
//     await axios.all(requests)
//       .then(axios.spread((...response) => {
//         response.map(res => {
//           this.books = this.books.concat(res.data.items.map(item => item.volumeInfo));
//         })
//         console.log(this.books)
//       }))
//   }


// await axios.get(`https://www.googleapis.com/books/v1/volumes?q=title:${this.title}&maxResults=1`)
//   .then(async res => {
//     this.mainBook = res.data.items[0].volumeInfo;
//     const categories = this.mainBook.categories.join('+');
//     const publisher = this.mainBook.publisher;

//     this.books = [];
//     let requests = [];
//     let num = 0;
//     for (let i = 0; i < 2; i++) {
//       requests.push(axios.get(`https://www.googleapis.com/books/v1/volumes?q=subject:${categories}+inpublisher:${publisher}&maxResults=40&startIndex=${num}`));
//       num += 40;
//     }
//     await axios.all(requests)
//       .then(axios.spread((...response) => {
//         console.log(response)
//         if (response) {
//           response.map(res => {
//             this.books = this.books.concat(res.data.items.map(item => item.volumeInfo));
//           })
//         }
//       }))
//     this.books = this.books.concat(this.mainBook);
//   })
//   .catch(err => console.log(err))