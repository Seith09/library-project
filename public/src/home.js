const getTotalBooksCount = (books) => {
  let result = 0;
  for (let book in books) {
    result++;
  }
  return result;
};

const getTotalAccountsCount = (accounts) => {
  let result = 0;
  for (let account in accounts) {
    result++;
  }
  return result;
};

function getBooksBorrowedCount(books) {
  let result = 0;

  for (let book of books) {
    if (book.borrows[0].returned === false) {
      result++;
    }
  }
  return result;
}

function getMostCommonGenres(books) {
  const genreCount = {};

  for (let book of books) {
    const genre = book.genre;

    if (genreCount[genre]) {
      genreCount[genre]++;
    } else {
      genreCount[genre] = 1;
    }
  }

  const genreArray = Object.entries(genreCount).map(([name, count]) => ({
    name,
    count,
  }));

  genreArray.sort((genreA, genreB) => genreB.count - genreA.count);

  return genreArray.slice(0, 5);
}

function getMostPopularBooks(books) {
  const popularBooks = books.map((book) => ({
    name: book.title,
    count: book.borrows.length,
  }));

  popularBooks.sort((bookA, bookB) => bookB.count - bookA.count);

  return popularBooks.slice(0, 5);
}

//my helper method
function getAuthorName(author) {
  return `${author.name.first} ${author.name.last}`;
}


function getMostPopularAuthors(books, authors) {
  const authorBorrowCounts = {};

  books.forEach((book) => {
    const authorId = book.authorId;
    const borrowCount = book.borrows.length;

    if (authorBorrowCounts[authorId]) {
      authorBorrowCounts[authorId] += borrowCount;
    } else {
      authorBorrowCounts[authorId] = borrowCount;
    }
  });

  const popularAuthors = authors.map((author) => {
    const name = getAuthorName(author); // Use the helper method here
    const count = authorBorrowCounts[author.id] || 0;
    return { name, count };
  });

  popularAuthors.sort((a, b) => b.count - a.count);

  return popularAuthors.slice(0, 5);
}


module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
