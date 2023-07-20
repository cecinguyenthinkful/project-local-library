//returns an array of authors w/ given ID
function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

//returns an array of the books w/ given ID
function findBookById(books, id) {
  return books.find((book) => book.id.includes(id));
}

//returns an array that consists of two arrays: 1) books returned/available 2) array of books checked out
function partitionBooksByBorrowedStatus(books) {
  const availableBooks = books.filter((book) => book.borrows[0].returned === true);
  const checkedOutBooks = books.filter((book) => book.borrows[0].returned === false);
  return [checkedOutBooks, availableBooks];
}

//returns an array of all transactions within a books borrows array
//result includes the account objects information
function getBorrowersForBook(book, accounts) {
  const result = [];
  for (let account of accounts) {
    for (let i = 0; i < book.borrows.length; i++) {
      if(account.id === book.borrows[i].id) {
        const returned = book.borrows[i].returned
        result.push({...account, returned})
      }
    }
  }
  return result.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
