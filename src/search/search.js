import SearchByGenre from "./search_by_genre";

export default class Search {
  constructor(shelfBooks) {
    this.shelfBooks = shelfBooks;
    this.setupSearchHandlers();
  }

  setupSearchHandlers() {
    document.querySelector(".search-button").addEventListener("click", () => {
      this.performSearch();
    });

    document.querySelector(".fa-search").addEventListener("click", () => {
      this.performSearch();
    });

    document.querySelector(".search-bar").addEventListener("focus", () => {
      document.querySelector(".genre-suggestions").style.display = "flex";
    });

    document.querySelector(".search-bar").addEventListener("focusout", () => {
      setTimeout(() => {
        document.querySelector(".genre-suggestions").style.display = "none";
      }, 200);
    });

    document.querySelector(".search-bar").addEventListener("keyup", (e) => {
      if (e.keyCode === 13) {
        e.preventDefault();
        this.performSearch();
      }
    });

    document.querySelectorAll(".genre-suggestions > div").forEach((div) => {
      div.addEventListener("click", (e) => {
        e.stopPropagation();
        this.performSearch(e.target.innerHTML);
        document.querySelector(".search-bar").value = e.target.innerHTML;
      });
    });
  }

  performSearch(str) {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    let genre = str || document.querySelector(".search-bar").value;
    if (genre === "") return;
    let term =
      str ||
      genre
        .toLowerCase()
        .split("")
        .map((c) => {
          if (alphabet.includes(c)) {
            return c;
          } else if (c === " ") {
            return "+";
          } else {
            return "";
          }
        })
        .join("");

    SearchByGenre.create(term).then((data) => {
      document.querySelector(
        ".current-genre"
      ).innerHTML = `Current Genre: ${genre}`;
      document.querySelector(".genre-suggestions").style.display = "none";
      this.shelfBooks.clearBooks();
      this.shelfBooks.populate(data);
    });
  }

  formatSearchTerm() {}
}
