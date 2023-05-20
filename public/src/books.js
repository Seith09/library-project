const findAuthorById = (authors, id) =>
  authors.find((author) => author.id === id);

const findBookById = (books, id) => books.find((book) => book.id === id);

function partitionBooksByBorrowedStatus(books) {
  const checkedOut = [];
  const available = [];

  books.forEach((book) => {
    const status = book.borrows[0].returned;

    if (!status) {
      checkedOut.push(book);
    } else {
      available.push(book);
    }
  });

  const combinedArray = [checkedOut, available];

  return combinedArray;
}

function getBorrowersForBook(book, accounts) {
  return book.borrows.reduce((accumulator, borrow) => {
    const matchingAccount = accounts.find(
      (account) => account.id === borrow.id && borrow.returned === true
    );

    if (matchingAccount) {
      accumulator.push({ ...borrow, ...matchingAccount });
    }

    return accumulator;
  }, []);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
