/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

const db = [
  { id: 1, title: 'The Shining', author: 'Stephen King', pages: 447 },
  { id: 2, title: 'It', author: 'Stephen King', pages: 1138 },
  { id: 3, title: 'The Stand', author: 'Stephen King', pages: 823 },
  {
    id: 4,
    title: 'Do Androids Dream of Electric Sheep?',
    author: 'Philip K. Dick',
    pages: 210,
  },
  {
    id: 5,
    title: 'The Man in the High Castle',
    author: 'Philip K. Dick',
    pages: 259,
  },
  { id: 6, title: 'Ubik', author: 'Philip K. Dick', pages: 224 },
  { id: 7, title: '1984', author: 'George Orwell', pages: 328 },
  { id: 8, title: 'Animal Farm', author: 'George Orwell', pages: 112 },
  { id: 9, title: 'Dune', author: 'Frank Herbert', pages: 412 },
  { id: 10, title: 'The Hobbit', author: 'J.R.R. Tolkien', pages: 310 },
  { id: 11, title: 'Brave New World', author: 'Aldous Huxley', pages: 311 },
  { id: 12, title: 'Fahrenheit 451', author: 'Ray Bradbury', pages: 194 },
  {
    id: 13,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    pages: 180,
  },
  { id: 14, title: 'To Kill a Mockingbird', author: 'Harper Lee', pages: 281 },
  { id: 15, title: 'Pride and Prejudice', author: 'Jane Austen', pages: 279 },
];

import express from 'express';

const app = express();

app.get('/books', async (req, res) => {
  const books = db;
  return res.json(books);
});

app.get('/books/:id', async (req, res) => {
  const { id } = req.params;
  const book = db.find((book) => book.id === parseInt(id));
  if (book) {
    return res.json(book);
  } else {
    return res.status(404).json({ message: 'Book not found' });
  }
});

app.post('/books', async (req, res) => {
  const book = req.body;
  db.push(book);
  return res.json(book);
});

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
