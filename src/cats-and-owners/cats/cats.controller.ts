import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from '../dto/create-cat.dto';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  findAll() {
    return this.catsService.findAll();
  }

  @Post('/')
  async create(@Res() res: any, @Body() createCatDTO: CreateCatDto) {
    const newCat = await this.catsService.create(createCatDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Cat has been submitted successfully!',
      cat: newCat,
    });
  }
}
