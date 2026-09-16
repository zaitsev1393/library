import { Book } from '@data-access';

export const removeIds = (books: Book[]) =>
  books.map(({ author, title, pages }) => ({
    author,
    title,
    pages,
  }));
