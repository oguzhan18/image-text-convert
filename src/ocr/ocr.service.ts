import { Injectable } from '@nestjs/common';
import * as Tesseract from 'tesseract.js';

/**
 * Service responsible for OCR operations.
 */
@Injectable()
export class OcrService {
  /**
   * Extracts text from a given image path using Tesseract OCR.
   * @param imagePath The path to the image file.
   * @returns A promise that resolves to the extracted text.
   */
  async extractTextFromImage(imagePath: string): Promise<string> {
    try {
      const result = await Tesseract.recognize(imagePath, 'eng');
      return result.data.text;
    } catch (error) {
      throw new Error(`Failed to extract text from image: ${error.message}`);
    }
  }
}
