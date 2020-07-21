import SearchByGenre from './search_by_genre';
import Bookshelf from './bookshelf';

const loadPage = () => {
  SearchByGenre.create('fantasy')
    .then(data => { 
      document.querySelector('.current-genre').innerHTML = 'Current Genre: Fantasy'           
      const bookshelf = new Bookshelf(data);
      return bookshelf;
    })
    .then(bookshelf => {
      bookshelf.constructBookshelf();
    })
}

document.addEventListener('DOMContentLoaded', loadPage);