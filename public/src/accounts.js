const findAccountById = (accounts, id) =>
  accounts.find((account) => account.id === id);

const sortAccountsByLastName = (accounts) =>
  accounts.sort((accountOne, accountTwo) =>
    accountOne.name.last.toLowerCase() > accountTwo.name.last.toLowerCase()
      ? 1
      : -1
  );

function getTotalNumberOfBorrows(account, books) {
  const accountId = account.id;

  const total = books.reduce((count, book) => {
    const borrowed = book.borrows.filter((borrow) => borrow.id === accountId);
    return count + borrowed.length;
  }, 0);

  return total;
}

function getBooksPossessedByAccount(account, books, authors) {
  let accountCollection = [];

  books.forEach((book) => {
    const borrowed = book.borrows.find(
      (borrow) => borrow.id === account.id && borrow.returned === false
    );

    if (borrowed) {
      const matchingAuthor = authors.find(
        (author) => author.id === book.authorId
      );

      if (matchingAuthor) {
        const newBook = {
          ...book,
          author: matchingAuthor,
        };

        accountCollection.push(newBook);
      }
    }
  });

  return accountCollection;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
