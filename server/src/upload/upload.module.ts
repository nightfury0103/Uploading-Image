import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { ConfigModule } from '@nestjs/config';
import { FilesModule} from '../files/files.module'

@Module({
  imports: [
    FilesModule,
    ConfigModule
  ],
  providers: [UploadService],
  exports: [UploadService],
  controllers: [UploadController]
})
export class UploadModule {}
