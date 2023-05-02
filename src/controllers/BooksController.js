const { generateRandomID } = require("../helpers/random");
const { dataBooks } = require("../utils/books");
const Postbooks = async (request, h) => {
  try {
    let statusFinish;
    const {
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
    } = request.payload;

    if (!name) {
      return h
        .response({
          status: "fail",
          message: "Gagal menambahkan buku. Mohon isi nama buku",
        })
        .code(400);
    } else if (readPage > pageCount) {
      return h
        .response({
          status: "fail",
          message:
            "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
        })
        .code(400);
    }

    if (readPage === pageCount) {
      statusFinish = true;
    } else {
      statusFinish = false;
    }

    let id = generateRandomID(10);
    dataBooks.push({
      id,
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished: statusFinish,
      reading,
      insertedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return h
      .response({
        status: "success",
        message: "Buku berhasil ditambahkan",
        data: {
          bookId: id,
        },
      })
      .code(201);
  } catch (err) {
    return h
      .response({
        status: "error",
        message: "Terjadi kesalahan pada server",
      })
      .code(500);
  }
};

const getAllBooks = async (request, h) => {
  try {
    const { name, reading, finished } = request.query;

    let filteredBooks = dataBooks;

    if (name) {
      filteredBooks = filteredBooks.filter((book) =>
        book.name.toLowerCase().includes(name.toLowerCase())
      );
    }

    if (reading) {
      const isReading = reading === "1";
      filteredBooks = filteredBooks.filter(
        (book) => book.reading === isReading
      );
    }

    if (finished) {
      const isFinished = finished === "1";
      filteredBooks = filteredBooks.filter(
        (book) => book.finished === isFinished
      );
    }

    const books = filteredBooks.map((book) => ({
      id: book.id,
      name: book.name,
      publisher: book.publisher,
    }));

    return h.response({
      status: "success",
      data: {
        books,
      },
    });
  } catch (err) {
    return h
      .response({
        status: "error",
        message: "Terjadi kesalahan pada server",
      })
      .code(500);
  }
};

const detailBooks = async (request, h) => {
  try {
    const { id } = request.params;
    const data = dataBooks.find((book) => book.id === id);

    if (!data) {
      return h
        .response({
          status: "fail",
          message: "Buku tidak ditemukan",
        })
        .code(404);
    }
    return h.response({
      status: "success",
      data: {
        book: data,
      },
    });
  } catch (err) {
    console.log(err);
    return h
      .response({
        status: "error",
        message: "Terjadi kesalahan pada server",
      })
      .code(500);
  }
};

const updateBooks = async (request, h) => {
  try {
    const { id } = request.params;
    const {
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
    } = request.payload;

    const bookIndex = dataBooks.findIndex((book) => book.id === id);

    if (bookIndex === -1) {
      return h
        .response({
          status: "fail",
          message: "Gagal memperbarui buku. Id tidak ditemukan",
        })
        .code(404);
    }

    if (!name) {
      return h
        .response({
          status: "fail",
          message: "Gagal memperbarui buku. Mohon isi nama buku",
        })
        .code(400);
    }

    if (readPage > pageCount) {
      return h
        .response({
          status: "fail",
          message:
            "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
        })
        .code(400);
    }

    dataBooks[bookIndex] = {
      ...dataBooks[bookIndex],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt: new Date().toISOString(),
    };

    return h
      .response({
        status: "success",
        message: "Buku berhasil diperbarui",
        data: {
          book: dataBooks[bookIndex],
        },
      })
      .code(200);
  } catch (err) {
    console.log(err);
    return h
      .response({
        status: "error",
        message: "Terjadi kesalahan pada server",
      })
      .code(500);
  }
};

const deleteBooks = async (request, h) => {
  try {
    const { id } = request.params;
    const bookIndex = dataBooks.findIndex((book) => book.id === id);
    if (bookIndex === -1) {
      return h
        .response({
          status: "fail",
          message: "Buku gagal dihapus. Id tidak ditemukan",
        })
        .code(404);
    }
    dataBooks.splice(bookIndex, 1);
    return h.response({
      status: "success",
      message: "Buku berhasil dihapus",
    });
  } catch (err) {
    return h
      .response({
        status: "error",
        message: "Terjadi kesalahan pada server",
      })
      .code(500);
  }
};

module.exports = {
  getAllBooks,
  Postbooks,
  detailBooks,
  updateBooks,
  deleteBooks,
};
