import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  HttpException,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import {
  AnyFilesInterceptor,
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { storage } from './storage';
import { FileSizeValidationPipePipe } from './file-size-validation-pipe.pipe';
import { MyFileValidator } from './my-file-validator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('aaa')
  @UseInterceptors(FileInterceptor('aaa', { dest: 'uploads' }))
  uploadFile(@UploadedFile() file: Express.Multer.File, @Body() body) {
    console.log('file: ', file);
    console.log('body', body);
  }

  @Post('bbb')
  @UseInterceptors(FilesInterceptor('bbb', 3, { dest: 'uploads' }))
  uploadFile2(
    @UploadedFiles()
    files: { aaa?: Express.Multer.File[]; bbb?: Express.Multer.File[] },
    @Body() body,
  ) {
    console.log('files: ', files.aaa);
    console.log('body', body);
  }

  @Post('ccc')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'aaa', maxCount: 3 },
      { name: 'bbb', maxCount: 2 },
    ]),
  )
  uploadFile3(@UploadedFiles() files: Express.Multer.File[], @Body() body) {
    console.log(files);
    console.log(body);
  }

  @Post('ddd')
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: storage,
    }),
  )
  uploadAnyFiles(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body,
  ) {
    console.log('body', body);
    console.log('files', files);
  }

  @Post('eee')
  @UseInterceptors(FileInterceptor('aaa', { dest: 'uploads' }))
  uploadFile5(
    @UploadedFile(FileSizeValidationPipePipe) file: Express.Multer.File,
    @Body() body,
  ) {
    console.log('file: ', file);
    console.log('body', body);
  }

  @Post('fff')
  @UseInterceptors(
    FileInterceptor('aaa', {
      dest: 'uploads',
    }),
  )
  uploadFile7(
    @UploadedFile(
      new ParseFilePipe({
        exceptionFactory(error) {
          throw new HttpException(`我是错误消息:${error}`, 300);
        },
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000 }),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body() body,
  ) {
    console.log('body', body);
    console.log('file', file);
  }

  @Post('hhh')
  @UseInterceptors(
    FileInterceptor('aaa', {
      dest: 'uploads',
    }),
  )
  uploadFile8(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MyFileValidator({})],
      }),
    )
    file: Express.Multer.File,
    @Body() body,
  ) {
    console.log('body', body);
    console.log('file', file);
  }
}
