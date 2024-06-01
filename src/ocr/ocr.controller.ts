import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { OcrService } from './ocr.service';
import { diskStorage } from 'multer';
import { extname } from 'path';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';

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
  @ApiResponse({
    status: 201,
    description: 'The text has been successfully extracted.',
  })
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
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async extractText(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<string> {
    const imagePath = file.path;
    return this.ocrService.extractTextFromImage(imagePath);
  }
}
