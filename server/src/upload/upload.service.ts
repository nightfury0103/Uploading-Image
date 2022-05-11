import { Injectable } from '@nestjs/common';
import { FilesService } from '../files/files.service';
 
@Injectable()
export class UploadService {
  constructor(
    private readonly filesService: FilesService
  ) {}

  async addAvatar(title: string, imageBuffer: Buffer, filename: string) {
    const avatar = await this.filesService.uploadPublicFile(title, imageBuffer, filename);
    return avatar;
  }

  async getAvatars() {
    const avatars = await this.filesService.getPublicFile();
    return avatars;
  }

  async deleteAvatar(id: number) {
    await this.filesService.deletePublicFile(id);
  }
}