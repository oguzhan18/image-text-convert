import { Injectable } from '@nestjs/common';
import * as Tesseract from 'tesseract.js';

/**
 * Service responsible for OCR operations.
 */
@Injectable()
export class OcrService {
  /**
   * Extracts text from a given image buffer using Tesseract OCR.
   * @param imageBuffer The buffer of the image file.
   * @returns A promise that resolves to the extracted text.
   */
  async extractTextFromImage(imageBuffer: Buffer): Promise<string> {
    try {
      const result = await Tesseract.recognize(imageBuffer, 'eng');
      return result.data.text;
    } catch (error) {
      throw new Error(`Failed to extract text from image: ${error.message}`);
    }
  }
}
