# Judge A Book By Its Number

### [Live Site](https://glenpark00.github.io/JudgeABookByItsNumber/)

A quaint data visualization that aims to pair you with you next favorite book based on what genre of book you're looking for.

![judgeabookbyitscover](https://github.com/glenpark00/JudgeABookByItsNumber/blob/master/src/assets/homepage.gif)

This site was built using **JavaScript**, **D3.js**, **Google Books Search API**, and **HTML Canvas**.

## Interactive Bookshelf

I really miss being a kid at the local library, picking books off the categorized, creaky old shelves and being able to get a feel for whether I'd like a book by looking over the cover and summary. I decided to create this site in that spirit, but take it a little further by adding in some concrete numbers to factor into your reading decisions.

I wanted to capture the feel of actually taking a book off the shelf and flipping through its pages, so books on the shelf can be clicked which will open up the book in front of you. 

## Statistical Plotting

Because the Google Books API is rather limited in how you can search for books and the information returned, I decided to focus my plotting on ratings, popularity, and page count. I figured these categories would be the most important to a user when deciding a book. 

| Popularity Histogram | Page Count Boxplot | Ratings Histogram | 
| -------------------- | ------------------ | ----------------- |
| ![pop_hist](https://github.com/glenpark00/JudgeABookByItsNumber/blob/master/src/assets/pop_hist.png) | ![page_count_boxplot](https://github.com/glenpark00/JudgeABookByItsNumber/blob/master/src/assets/page_count_boxplot.png) | ![ratings_hist](https://github.com/glenpark00/JudgeABookByItsNumber/blob/master/src/assets/rating_hist.png)

Here is the code for the popularity histogram (popularity being defined as the number of reviews multiplied by the average rating), which relies on D3.js to set up the axes and the parameters of the histogram, and animates the bars when the graph is first rendered to pop up one by one. 

``` 
constructGraph(book, data) {
    const graphPage = document.querySelector('.first');
    if (!graphPage) {
      return null;
    }
    const margin = { top: 60, right: 30, bottom: 60, left: 50 },
      width = graphPage.offsetWidth - margin.left - margin.right - 100,
      height = graphPage.offsetHeight - margin.top - margin.bottom - 200;

    let books = data.filter(d => d.popularityScore > 0).sort((a, b) => a.popularityScore - b.popularityScore);
    const l = books.length;
    const low = Math.round(l * 0.05);
    const high = l - low;
    books = books.slice(0, high);

    const svg = d3.select('.page-3-content-front')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .attr('x', 0).attr('y', 0)
      .append('g')
      .attr('transform',
        `translate(${margin.left}, ${margin.top})`);

    svg.append('text')
      .attr('x', width / 2).attr('y', -20)
      .attr('font-family', 'sans-serif').attr('font-size', '15px')
      .attr('font-weight', '400')
      .attr('fill', '#777')
      .attr('text-anchor', 'middle')
      .text('Popularity Histogram For This Sample of Books');

    const x = d3.scaleLinear()
      .domain([
        d3.min(books, d => d.popularityScore),
        d3.max(books, d => d.popularityScore) + width / 50
      ])
      .range([0, width]);
    svg.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x))
      .append('text')
      .attr('x', width / 2).attr('y', 40)
      .attr('font-family', 'sans-serif').attr('font-size', '10.5px')
      .attr('fill', '#777')
      .attr('text-anchor', 'middle')
      .text('Popularity Score (Ratings Count x Average Rating)');

    const histogram = d3.histogram()
      .value(d => d.popularityScore)
      .domain(x.domain())
      .thresholds(x.ticks(35));

    const bins = histogram(books);

    const y = d3.scaleLinear()
      .range([height, 0]);
    y.domain([0, d3.max(bins, d => d.length) + 2]);

    svg.append('g')
      .call(d3.axisLeft(y))
      .append('text')
      .attr('x', -(height) / 2).attr('y', -35)
      .attr('font-family', 'sans-serif').attr('font-size', '13px')
      .attr('fill', '#777')
      .attr('transform', 'rotate(-90)')
      .attr('text-anchor', 'middle')
      .text('Frequency');

    svg.selectAll('rect')
      .data(bins)
      .enter()
      .append('rect')
      .attr('x', d => x(d.x0)).attr('y', d => y(0))
      .attr('width', width / bins.length - 0.5)
      .attr('height', d => height - y(0))
      .style('fill', d => {
        if (book.popularityScore >= d.x0 && book.popularityScore < d.x1) {
          return 'orange';
        } else {
          return '#9C528B'
        }
      })
      .transition()
      .duration(500)
      .attr("y", d => y(d.length))
      .attr("height", d => height - y(d.length))
      .delay((d, i) => i * 30 + 1800)
  }
  ```
  
I unfortunately could not perform a simple random sample of books for a given genre due to the limitations of the API, but I was able to take 400 data points using multiple axios calls, as the API only allows 40 results at a time. Too many calls to the API in quick succession leads to a 429 error, which I've accounted for in the code below: 

``` 
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
      .catch(() => this.error = 'Too many requests made to the Google Books API, please wait before trying again')
  }
```

## To-Do

In the future, I plan to find or scrape (and possibly clean) a dataset of books with more interesting data for statistical analysis. I'm planning on doing this using a PostgreSQL server I host myself using Express.js. This'll allow me to hopefully expand my search to include specific books, dates, and authors, and add more plots with fun statistics.

## Contact

[LinkedIn](https://www.linkedin.com/in/glen-park/)
