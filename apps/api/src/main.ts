/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import { Book, CreateBook } from './model/book';

import cors from 'cors';

const db: Book[] = [
  // { id: 1, title: 'The Shining', author: 'Stephen King', pages: 447 },
  // { id: 2, title: 'It', author: 'Stephen King', pages: 1138 },
  // { id: 3, title: 'The Stand', author: 'Stephen King', pages: 823 },
  // {
  //   id: 4,
  //   title: 'Do Androids Dream of Electric Sheep?',
  //   author: 'Philip K. Dick',
  //   pages: 210,
  // },
  // {
  //   id: 5,
  //   title: 'The Man in the High Castle',
  //   author: 'Philip K. Dick',
  //   pages: 259,
  // },
  // { id: 6, title: 'Ubik', author: 'Philip K. Dick', pages: 224 },
  // { id: 7, title: '1984', author: 'George Orwell', pages: 328 },
  // { id: 8, title: 'Animal Farm', author: 'George Orwell', pages: 112 },
  // { id: 9, title: 'Dune', author: 'Frank Herbert', pages: 412 },
  // { id: 10, title: 'The Hobbit', author: 'J.R.R. Tolkien', pages: 310 },
  // { id: 11, title: 'Brave New World', author: 'Aldous Huxley', pages: 311 },
  // { id: 12, title: 'Fahrenheit 451', author: 'Ray Bradbury', pages: 194 },
  // {
  //   id: 13,
  //   title: 'The Great Gatsby',
  //   author: 'F. Scott Fitzgerald',
  //   pages: 180,
  // },
  // { id: 14, title: 'To Kill a Mockingbird', author: 'Harper Lee', pages: 281 },
  // { id: 15, title: 'Pride and Prejudice', author: 'Jane Austen', pages: 279 },
];

const nextId = (els = db) =>
  els.length > 0 ? Math.max(...els.map((el) => el.id ?? 0)) + 1 : 1;

const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:4200', credentials: true }));
/**
 * @openapi
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required: [title, author, pages]
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         title:
 *           type: string
 *           example: 'The Shining'
 *         author:
 *           type: string
 *           example: 'Stephen King'
 *         pages:
 *           type: integer
 *           example: 447
 *     CreateBook:
 *       type: object
 *       required: [title, author, pages]
 *       properties:
 *         title:
 *           type: string
 *           example: 'The Shining'
 *         author:
 *           type: string
 *           example: 'Stephen King'
 *         pages:
 *           type: integer
 *           example: 447
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 */

/**
 * @openapi
 * /books:
 *   get:
 *     operationId: getBooks
 *     summary: List all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: Array of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */
app.get('/books', async (req, res) => {
  const books = db;
  return res.json(books);
});

/**
 * @openapi
 * /books/{id}:
 *   get:
 *     operationId: getBookById
 *     summary: Get a single book by id
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The book
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
app.get('/books/:id', async (req, res) => {
  const { id } = req.params;
  const book = db.find((book) => book.id === parseInt(id));
  if (book) {
    return res.json(book);
  } else {
    return res.status(404).json({ message: 'Book not found' });
  }
});

/**
 * @openapi
 * /books:
 *   post:
 *     operationId: createBook
 *     summary: Create a book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateBook'
 *     responses:
 *       201:
 *         description: The created book
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 */
app.post('/books', async (req, res) => {
  const input: CreateBook = req.body;
  const book: Book = { id: nextId(), ...input };
  db.push(book);
  return res.status(201).json(book);
});

/**
 * @openapi
 * /books/import:
 *   post:
 *     operationId: importBooks
 *     summary: Import multiple books
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/CreateBook'
 *     responses:
 *       201:
 *         description: The created books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */
app.post('/books/import', async (req, res) => {
  const books: CreateBook[] = req.body;
  const createdBooks: Book[] = books.map((input) => {
    const book: Book = { id: nextId(), ...input };
    db.push(book);
    return book;
  });
  return res.status(201).json(createdBooks);
});

/**
 * @openapi
 * /books/{id}:
 *   delete:
 *     operationId: deleteBook
 *     summary: Delete a book by id
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The deleted book
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
app.delete('/books/:id', async (req, res) => {
  const { id } = req.params;
  const index = db.findIndex((book) => book.id === parseInt(id));
  if (index !== -1) {
    const deletedBook = db.splice(index, 1)[0];
    return res.json(deletedBook);
  } else {
    return res.status(404).json({ message: 'Book not found' });
  }
});

/**
 * @openapi
 * /books/{id}:
 *   put:
 *     operationId: updateBook
 *     summary: Replace a book by id
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: The updated book
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
app.put('/books/:id', async (req, res) => {
  const { id } = req.params;
  const updatedBook = req.body;
  const index = db.findIndex((book) => book.id === parseInt(id));
  if (index !== -1) {
    db[index] = updatedBook;
    return res.json(updatedBook);
  } else {
    return res.status(404).json({ message: 'Book not found' });
  }
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});

server.on('error', console.error);
