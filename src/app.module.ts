import { Module } from '@nestjs/common';
import { OcrService } from './ocr/ocr.service';
import { OcrController } from './ocr/ocr.controller';

@Module({
  imports: [],
  controllers: [OcrController],
  providers: [OcrService],
})
export class AppModule {}
