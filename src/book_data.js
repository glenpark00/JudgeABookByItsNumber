import * as d3 from 'd3';
import PopularityHistogram from './popularity_histogram';
import RatingHistogram from './rating_histogram';
import PageCountBoxplot from './page_count_boxplot';

export default class BookData {
  constructor(book, data) {
    this.book = book;
    this.data = data;
  }

  removeBook() {
    document.querySelector('.book-container').remove();
  }

  createBook() {
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
    setTimeout(() => document.addEventListener('click', this.removeBook, { once: true }), 500)
    this.fillBook();
  }

  fillBook() {
    const page1 = document.querySelector('.book > .first');
    const pageContent = document.createElement('div');
    pageContent.classList.add('page-content');
    const bookInfo = document.createElement('div');
    bookInfo.classList.add('book-info');
    const image = document.createElement('img');
    image.src = (this.book.imageLinks ? this.book.imageLinks.thumbnail : 'src/assets/no_image.svg');
    bookInfo.appendChild(image);
    const bookHeaders = document.createElement('div');
    bookHeaders.classList.add('book-headers');
    const title = document.createElement('h1');
    title.innerHTML = this.book.title;
    bookHeaders.appendChild(title);
    const author = document.createElement('div')
    author.classList.add('book-info-author');
    author.innerHTML = `by ${this.book.authors ? this.book.authors[0] : 'Unknown'}`;
    bookHeaders.appendChild(author);
    const link = document.createElement('a');
    link.href = this.book.canonicalVolumeLink;
    link.target = '_blank';
    link.innerHTML = 'Link to Google Books Page';
    bookHeaders.appendChild(link);
    bookInfo.appendChild(bookHeaders);
    const desc = document.createElement('p');
    desc.innerHTML = this.book.description;
    pageContent.appendChild(bookInfo);
    pageContent.appendChild(desc);
    const ratingContainer = document.createElement('div');
    ratingContainer.classList.add('rating-container');
    const averageRating = document.createElement('div');
    averageRating.classList.add('average-rating');
    const rating = document.createElement('div');
    rating.innerHTML = `Average Rating: ${this.book.averageRating}`;
    averageRating.appendChild(rating);
    averageRating.appendChild(this.createStars())
    ratingContainer.appendChild(averageRating);
    const ratingsCount = document.createElement('div');
    ratingsCount.classList.add('ratings-count');
    ratingsCount.innerHTML = `Ratings Count: ${this.book.ratingsCount}`;
    ratingContainer.appendChild(ratingsCount);
    pageContent.appendChild(ratingContainer);
    page1.appendChild(pageContent);
    this.fillPage3();
    this.fillPage2();
  }

  fillPage3() {
    const page3 = document.querySelector('.book > .page:nth-child(3)');
    const page3Content = document.createElement('div');
    page3Content.classList.add('page-3-content');
    const page3Inner = document.createElement('div');
    page3Inner.classList.add('page-3-content-inner');
    const page3Back = document.createElement('div');
    page3Back.classList.add('page-3-content-back');
    page3Inner.appendChild(page3Back);
    page3Content.appendChild(page3Inner);
    page3.appendChild(page3Content);
 
    new RatingHistogram().constructGraph(this.book, this.data);

    let numLessThanRating = 0;
    for (const book of this.data) {
      if (book.averageRating < this.book.averageRating) {
        numLessThanRating++;
      }
    }
    const ratingDiv = document.createElement('div');
    ratingDiv.classList.add('rating-text');
    const ratingTextRating = document.createElement('div');
    ratingTextRating.innerHTML = `${this.book.title} has an average rating of ${this.book.averageRating}, which is higher than ${((numLessThanRating / this.data.length) * 100).toFixed(2)}% of the books in this sample.`;
    ratingDiv.appendChild(ratingTextRating);
    page3Back.appendChild(ratingDiv);
    page3Back.appendChild(this.pageTurnBack())

    const page3Front = document.createElement('div');
    page3Front.classList.add('page-3-content-front');
    page3Inner.appendChild(page3Front);

    new PopularityHistogram().constructGraph(this.book, this.data);

    let numLessThanPop = 0;
    for (const book of this.data) {
      if (book.popularityScore < this.book.popularityScore) {
        numLessThanPop++;
      }
    }
    const popularityDiv = document.createElement('div');
    popularityDiv.classList.add('popularity-text');
    const percentTextPop = document.createElement('div');
    percentTextPop.innerHTML = `${this.book.title} has a popularity score of ${this.book.popularityScore}, which is higher than ${((numLessThanPop / this.data.length) * 100).toFixed(2)}% of the books in this sample. Popularity score is defined as the total number of stars a book has received from all of its reviews.`;
    const note = document.createElement('div');
    note.innerHTML = "Note: If you don't see a orange bar in the graph, that means this book was such an outlier that it wasn't included in the graph. Quite the must-read!"
    popularityDiv.appendChild(percentTextPop);
    popularityDiv.appendChild(note);
    page3Front.appendChild(popularityDiv);
    page3Front.appendChild(this.pageTurnForward());
  }

  fillPage2() {
    const page2 = document.querySelector('.book > .page:nth-child(2)');
    const page2Content = document.createElement('div');
    page2Content.classList.add('page-2-content');
    const page2Inner = document.createElement('div');
    page2Inner.classList.add('page-2-content-inner');
    const page2Front = document.createElement('div');
    page2Front.classList.add('page-2-content-front');
    page2Inner.appendChild(page2Front);
    page2Content.appendChild(page2Inner);
    page2.appendChild(page2Content);

    new PageCountBoxplot().constructGraph(this.book, this.data);

    const pageCountDiv = document.createElement('div');
    pageCountDiv.classList.add('page-count-text');
    const pageCountTextPageCount = document.createElement('div');
    pageCountTextPageCount.innerHTML = `${this.book.title} has ${this.book.pageCount} pages, which makes it a ${this.lengthGroup(this.book.pageCount)}-read compared to the other books in this sample.`;
    pageCountDiv.appendChild(pageCountTextPageCount);
    page2Front.appendChild(pageCountDiv);
  }

  pageTurnForward() {
    const forwardButton = document.createElement('div');
    forwardButton.classList.add('page-forward-button');
    forwardButton.addEventListener('click', () => {
      setTimeout(() => {
        let back = document.querySelector('.page-3-content-back');
        back.style.transform = 'rotateY(0deg)';
        back.style.zIndex = 5;
        let front = document.querySelector('.page-3-content-front');
        front.style.transform = 'rotateY(180deg)';
        front.style.zIndex = 0;
      }, 550)
      document.querySelector('.page:nth-of-type(3)').animate([
        { transform: 'rotateY(180deg)', zIndex: 2 },
        { transform: 'rotateY(0deg)', zIndex: 999 }
      ], { duration: 1000, fill: 'forwards' })
    })
    return forwardButton;
  }

  pageTurnBack() {
    const backButton = document.createElement('div');
    backButton.classList.add('page-back-button');
    backButton.addEventListener('click', () => {
      setTimeout(() => {
        let back = document.querySelector('.page-3-content-back');
        back.style.transform = 'rotateY(180deg)';
        back.style.zIndex = 0;
        let front = document.querySelector('.page-3-content-front');
        front.style.transform = 'scaleX(-1)';
        front.style.zIndex = 5;
      }, 445)
      document.querySelector('.page:nth-of-type(3)').animate([
        { transform: 'rotateY(0deg)', zIndex: 2 },
        { transform: 'rotateY(180deg)', zIndex: 999 }
      ], { duration: 1000, fill: 'forwards' })
    })
    return backButton;
  }

  lengthGroup(pageCount) {
    let sortedByPageCounts = this.data.sort((a, b) => a.pageCount > b.pageCount ? 1 : -1).map(d => d.pageCount);
    let firstThird = Math.floor(sortedByPageCounts.length * 0.33);
    let secondThird = Math.floor(sortedByPageCounts.length * 0.66);
    let short = sortedByPageCounts[firstThird];
    let medium = sortedByPageCounts[secondThird];
    if (pageCount < short) {
      return 'short';
    }
    else if (pageCount >= short && pageCount < medium) {
      return 'medium';
    } else {
      return 'long';
    }
  }

  createStars() {
    const rating = this.book.averageRating;
    const num = Math.floor(rating);
    const decimal = rating - num;
    const starsContainer =  document.createElement('div');
    starsContainer.classList.add('stars-container')
    for (let i = 0; i < num; i++) {
      const filledStar = document.createElement('i');
      filledStar.classList.add('fa', 'fa-star');
      starsContainer.appendChild(filledStar);
    }
    let partialStar;
    if (decimal > 0) {
      partialStar = document.createElement('i');
      partialStar.classList.add('fa', 'fa-star', 'partial');
      starsContainer.appendChild(partialStar);
    }
    return starsContainer;
  }
}