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

