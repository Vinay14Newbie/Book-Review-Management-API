import Book from '../schema/book.js';

export const addBook = async (req, res) => {
  try {
    const newBook = await Book.create({
      title: req.body.title,
      author: req.body.author,
      genere: req.body.genere,
      publishYear: req.body.publishYear
    });
    res.status(201).json({
      status: true,
      data: newBook,
      message: 'Book added successfully'
    });
  } catch (error) {
    console.log('Error found adding new book');
    return res.status(500).json({
      status: false,
      message: 'Internal error'
    });
  }
};
