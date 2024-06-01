/// <reference types="multer" />
import { OcrService } from './ocr.service';
export declare class OcrController {
    private readonly ocrService;
    constructor(ocrService: OcrService);
    extractText(file: Express.Multer.File): Promise<string>;
}
