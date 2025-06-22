import Book from '../schema/book.js';
import Review from '../schema/review.js';

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
    console.log('Error found while adding new book');
    return res.status(500).json({
      status: false,
      message: 'Internal error'
    });
  }
};

export const getBooks = async (req, res) => {
  try {
    const { genre, author, page = 1, limit = 10 } = req.query;
    const query = {};
    if (genre) query.genre = genre;
    if (author) query.author = author;

    const books = await Book.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const data = await Promise.all(
      books.map(async (book) => {
        const reviews = await Review.find({ bookId: book._id });

        const avgRating = reviews.length
          ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
          : 0;

        return {
          ...book.toObject(),
          averageRating: parseFloat(avgRating.toFixed(1))
        };
      })
    );

    res.status(200).json({
      status: true,
      data: data,
      message: 'Book info fetched successfully'
    });
  } catch (err) {
    console.log('Error found while adding fetching books');
    return res.status(500).json({
      status: false,
      message: 'Internal error'
    });
  }
};
