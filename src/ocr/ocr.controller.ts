import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { OcrService } from './ocr.service';
import { memoryStorage } from 'multer';
import { ApiOperation, ApiResponse, ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { Express } from 'express';

/**
 * Controller responsible for handling OCR operations.
 */
@ApiTags('OCR')
@Controller('ocr')
export class OcrController {
  constructor(private readonly ocrService: OcrService) {}

  /**
   * Extracts text from an uploaded image.
   * @param file The image file from which to extract text.
   * @returns The extracted text as a string.
   */
  @Post('extract-text')
  @ApiOperation({ summary: 'Extract text from an uploaded image' })
  @ApiResponse({ status: 201, description: 'The text has been successfully extracted.' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('image', {
      storage: memoryStorage(),
    }),
  )
  async extractText(@UploadedFile() file: Express.Multer.File): Promise<string> {
    return this.ocrService.extractTextFromImage(file.buffer);
  }
}
