const findAccountById = (accounts, id) =>
  accounts.find((account) => account.id === id);

const sortAccountsByLastName = (accounts) =>
  accounts.sort((accountOne, accountTwo) =>
    accountOne.name.last.toLowerCase() > accountTwo.name.last.toLowerCase()
      ? 1
      : -1
  );

function getTotalNumberOfBorrows(account, books) {

  //create a variable to hold the value of the amount of times book was borrowed by account holder
  let total = 0;
  //set a variable to access to the id value in account
  const accountId = account.id;

  //create outerloop for the books array
  for (let i = 0; i < books.length; i++) {
    //create variable to gain access to the borrows array with the book object
    const bookLog = books[i].borrows;
    //inner loop through the borrows array to begin counting
    for (let j = 0; j < bookLog.length; j++) {
      if (bookLog[j].id === accountId) {
        //increment total of times accountId passed in matches the current iterated book log
        total++;
      }
    }
  }
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
