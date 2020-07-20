import SearchByGenre from './search_by_genre';
import Bookshelf from './bookshelf';

const loadPage = () => {
  SearchByGenre.create('fantasy')
    .then(data => {      
      const bookshelf = new Bookshelf(data);
      return bookshelf;
    })
    .then(bookshelf => {
      bookshelf.constructBookshelf();
    })
}

document.addEventListener('DOMContentLoaded', loadPage);