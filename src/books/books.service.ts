import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from './books.schema';

@Injectable()
export class BooksService {
  constructor(@InjectModel('Book') private readonly bookModel: Model<Book>) {}

  async createBook(createBookDto: Partial<Book>): Promise<Book> {
    const newBook = new this.bookModel(createBookDto);
    return newBook.save();
  }

  async findAllBooks(page: number, limit: number): Promise<Book[]> {
    return this.bookModel
      .find()
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
  }

  async findTopRatedBooks(): Promise<Book[]> {
    return this.bookModel.find().sort({ rating: -1 }).limit(5).exec();
  }

  async findBookById(id: string): Promise<Book> {
    return this.bookModel.findById(id).exec();
  }

  async updateBook(id: string, updateBookDto: Partial<Book>): Promise<Book> {
    return this.bookModel.findByIdAndUpdate(id, updateBookDto, { new: true }).exec();
  }

  async deleteBook(id: string): Promise<Book> {
    return this.bookModel.findByIdAndDelete(id).exec();
  }

  async addReview(bookId: string, createReviewDto: CreateReviewDto, userId: string) {
    const book = await this.bookModel.findById(bookId);
    if (!book) {
      throw new Error('Book not found');
    }

    // Vérifier si l'utilisateur a déjà ajouté une revue pour ce livre
    const existingReview = book.reviews.find(review => review.userId.toString() === userId);
    if (existingReview) {
      throw new Error('You have already reviewed this book');
    }

    // Ajouter la revue
    book.reviews.push({ userId, ...createReviewDto });
    
    // Calculer la note moyenne
    const totalRating = book.reviews.reduce((acc, review) => acc + review.rating, 0);
    book.rating = totalRating / book.reviews.length;

    await book.save();
    return book;
  }

  // Méthode de recherche des livres
  async searchBooks(
    title: string,
    author: string,
    category: string,
    sortBy: 'publishedDate' | 'rating',
    page: number,
    limit: number,
  ): Promise<Book[]> {
    const filters: any = {};

    if (title) filters.title = { $regex: title, $options: 'i' }; // Recherche insensible à la casse
    if (author) filters.author = { $regex: author, $options: 'i' };
    if (category) filters.category = { $regex: category, $options: 'i' };

    const sortCriteria = sortBy === 'rating' ? { rating: -1 } : { publishedDate: -1 };

    return this.bookModel
      .find(filters)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort(sortCriteria)
      .exec();
  }
}
