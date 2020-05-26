import GenreBooks from './genre_books';
import GenreVis from './genre_vis';

const loadPage = () => {
  GenreBooks.create('History')
    .then(data => {
      const gv = new GenreVis(data);
      gv.renderBook();
    })
}

document.addEventListener('DOMContentLoaded', loadPage);