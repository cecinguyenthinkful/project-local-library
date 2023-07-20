//finds accounts by the given ID
function findAccountById(accounts, id) {
  return accounts.find((account) => account.id.includes(id));
}

//sorts accounts by last name
function sortAccountsByLastName(accounts) {
  return accounts.sort((lastA, lastB) => 
    lastA.name.last.toLowerCase() > lastB.name.last.toLowerCase() ? 1 : -1
  );
}

function getTotalNumberOfBorrows(account, books) {
  let total = 0;
  const booksBorrowedByAccount = books.forEach((book) => {
    if (!!book.borrows) {
      book.borrows.forEach((accounts) => {
    if (accounts.id === account.id) {
          total = total + 1;
        }
      });
    }
  });
  return total;
}

//helper function returns author object
function _getAuthor(book, authors) {
  const author = authors.find((author) => author.id === book.authorId);
  return author;
}

//returns all books w/ author info checked out by the given account
function getBooksPossessedByAccount(account, books, authors) {
  const borrowed = [];
  books.forEach((book) => {
    let bookBorrows = book.borrows;
    bookBorrows.forEach((borrow) => {
      if (borrow.id === account.id && !borrow.returned) {
        borrowed.push(book);
      }
    });
  });
  let result = borrowed.map((book) => {
    return { ...book, author: _getAuthor(book, authors) };
  });
  return result;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};