import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

// Filtre pour gérer les exceptions HTTP
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const request = context.getRequest<Request>();
    const response = context.getResponse<Response>();
    const status = exception.getStatus();

    // Récupérer le message d'erreur
    const exceptionResponse = exception.getResponse();
    const message = typeof exceptionResponse === 'string' ? exceptionResponse : exceptionResponse['message'];

    // Log ou manipulation d'erreurs spécifiques
    console.log(`Error occurred on ${request.method} ${request.url}: ${message}`);

    // Construction de la réponse détaillée
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: message,
    });
  }
}
