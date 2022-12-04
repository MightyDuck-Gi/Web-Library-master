const express = require ('express');
const router = express.Router();
const Book = require("../model/Book")
const booksController = require ("../controllers/books-controller");

/*//==================================================\\
    This is where all routers are in order to protect
*/
router.post("/", booksController.addBook);
router.get("/", booksController.getAllBooks);
router.get("/:id", booksController.getById);
router.put("/:id", booksController.updateBook);
router.delete("/:id", booksController.deleteBook);

module.exports = router;