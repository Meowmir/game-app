import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { OwnersService } from './owners.service';
import { CreateOwnerDto } from '../dto/create-owner.dto';

@Controller('owners')
export class OwnersController {
  constructor(private readonly ownersService: OwnersService) {}

  @Get()
  findAll() {
    return this.ownersService.findAll();
  }

  // Create an owner
  @Post('/')
  async create(@Res() res: any, @Body() createOwnerDTO: CreateOwnerDto) {
    const newOwner = await this.ownersService.create(createOwnerDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Owner has been submitted successfully!',
      owner: newOwner,
    });
  }
}
