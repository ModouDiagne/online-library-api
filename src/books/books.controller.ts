import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards, Request } from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './books.schema';
import { CreateReviewDto } from './dto/create-review.dto'; // DTO pour créer une revue
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Gardien d'authentification JWT

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  async createBook(@Body() createBookDto: Partial<Book>): Promise<Book> {
    return this.booksService.createBook(createBookDto);
  }

  @Get()
  async getBooks(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<Book[]> {
    return this.booksService.findAllBooks(page, limit);
  }

  @Get('/top-rated')
  async getTopRatedBooks(): Promise<Book[]> {
    return this.booksService.findTopRatedBooks();
  }

  @Get('/:id')
  async getBookById(@Param('id') id: string): Promise<Book> {
    return this.booksService.findBookById(id);
  }

  @Put('/:id')
  async updateBook(
    @Param('id') id: string,
    @Body() updateBookDto: Partial<Book>,
  ): Promise<Book> {
    return this.booksService.updateBook(id, updateBookDto);
  }

  @Delete('/:id')
  async deleteBook(@Param('id') id: string): Promise<Book> {
    return this.booksService.deleteBook(id);
  }

  @Post(':id/review')
  @UseGuards(JwtAuthGuard) // Protéger l'endpoint avec JWT
  async addReview(
    @Param('id') bookId: string,
    @Body() createReviewDto: CreateReviewDto,
    @Request() req: any, // Récupérer l'utilisateur connecté
  ) {
    const userId = req.user.userId; // Récupérer l'ID de l'utilisateur depuis le JWT
    return this.booksService.addReview(bookId, createReviewDto, userId);
  }

  // Endpoint de recherche avancée
  @Get('/search')
  async searchBooks(
    @Query('title') title: string,
    @Query('author') author: string,
    @Query('category') category: string,
    @Query('sortBy') sortBy: 'publishedDate' | 'rating' = 'publishedDate', // tri par défaut
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<Book[]> {
    return this.booksService.searchBooks(title, author, category, sortBy, page, limit);
  }
}
