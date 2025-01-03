import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { Book } from './books.schema';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

describe('BooksService', () => {
  let service: BooksService;
  let model: Model<Book>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getModelToken('Book'),
          useValue: { create: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
    model = module.get<Model<Book>>(getModelToken('Book'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a book', async () => {
    const createBookDto = { title: 'Test Book', author: 'John Doe', category: 'Fiction' };
    const book = { _id: '1', ...createBookDto };

    jest.spyOn(model, 'create').mockResolvedValue(book);

    const result = await service.createBook(createBookDto);
    expect(result).toEqual(book);
  });
});

it('should add a review to a book', async () => {
  const bookId = '1';
  const review = { user: 'user1', rating: 5, comment: 'Great book!' };
  const updatedBook = {
    _id: bookId,
    title: 'Test Book',
    author: 'John Doe',
    reviews: [review],
  };

  jest.spyOn(service, 'addReview').mockResolvedValue(updatedBook);

  const result = await service.addReview(bookId, review);
  expect(result.reviews).toContainEqual(review);
});
