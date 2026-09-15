export type Book = {
  id?: number;
  title: string;
  author: string;
  pages: number;
};

export type CreateBook = {
  title: string;
  author: string;
  pages: number;
};
