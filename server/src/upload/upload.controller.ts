import { UploadService } from './upload.service';
import { Controller, HttpStatus, Post, Get, UploadedFile, UseInterceptors, Body, Delete, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { UploadDTO } from './upload.dto';
 
@Controller('upload')
export class UploadController {
  constructor(
    private readonly uploadService: UploadService,
  ) {}
 
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async addAvatar(@Body() body: UploadDTO, @UploadedFile() file: Express.Multer.File) {
    const res = await this.uploadService.addAvatar(body.title, file.buffer, file.originalname);
    return res;
  }
  
  @Get()
  async getAvatars() {
    return {
      statusCode: HttpStatus.OK,
      data: await this.uploadService.getAvatars(),
    };
  }

  @Delete(':id')
  async deleteAvatar(@Param('id') id: number) {
    await this.uploadService.deleteAvatar(id);
    return {
      statusCode: HttpStatus.OK,
      id: id,
    };
  }
 }