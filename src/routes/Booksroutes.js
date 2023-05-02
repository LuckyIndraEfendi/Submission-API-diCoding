const {
  getAllBooks,
  Postbooks,
  detailBooks,
  updateBooks,
  deleteBooks,
} = require("../controllers/BooksController");

module.exports = [
  {
    method: "GET",
    path: "/books",
    handler: getAllBooks,
  },
  {
    method: "GET",
    path: "/books/{id}",
    handler: detailBooks,
  },
  {
    method: "POST",
    path: "/books",
    handler: Postbooks,
  },
  {
    method: "PUT",
    path: "/books/{id}",
    handler: updateBooks,
  },
  {
    method: "DELETE",
    path: "/books/{id}",
    handler: deleteBooks,
  },
];
