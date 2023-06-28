import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { CreateCatDto } from '../dto/create-cat.dto';
import { CatsService } from '../cats.service';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  findAll(@Query('name') name: string | undefined) {
    console.log(`name is: ${name}`);
    return this.catsService.findAll(name);
  }

  @Get('/:catID')
  async getCat(@Res() res: any, @Param('catID') catID: string) {
    const cat = await this.catsService.getCat(catID);
    if (!cat) {
      throw new NotFoundException('Cat does not exist!');
    }
    return res.status(HttpStatus.OK).json(cat);
  }

  @Post('/')
  async create(@Res() res: any, @Body() createCatDTO: CreateCatDto) {
    const newCat = await this.catsService.create(createCatDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Cat has been submitted successfully!',
      cat: newCat,
    });
  }

  @Put('/:catID')
  async editCat(
    @Res() res: any,
    @Param('catID') catID: string,
    @Body() createCatDTO: CreateCatDto,
  ) {
    const editedCat = await this.catsService.editCat(catID, createCatDTO);
    if (!editedCat) {
      throw new NotFoundException('Cat does not exist!');
    }
    return res.status(HttpStatus.OK).json({
      message: 'Cat has been successfully updated',
      cat: editedCat,
    });
  }

  @Delete('/:catID')
  async deleteCat(
    @Res() res: any,
    @Param('catID') catID: string,
  ): Promise<string> {
    const deletedCat = await this.catsService.deleteCat(catID);
    if (!deletedCat) {
      throw new NotFoundException('Cat does not exist!');
    }
    return res.status(HttpStatus.OK).json({
      message: 'Cat has been deleted!',
      cat: deletedCat,
    });
  }
}
