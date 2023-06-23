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
  Res,
} from '@nestjs/common';
import { OwnersService } from './owners.service';
import { CreateOwnerDto } from '../dto/create-owner.dto';

@Controller('owners')
export class OwnersController {
  constructor(private readonly ownersService: OwnersService) {}

  @Get()
  findAll() {
    return this.ownersService.findAll();
  }

  @Get('/:ownerID')
  async getTodo(@Res() res: any, @Param('ownerID') ownerID: string) {
    const owner = await this.ownersService.getOwner(ownerID);
    if (!owner) {
      throw new NotFoundException('Owner does not exist!');
    }
    return res.status(HttpStatus.OK).json(owner);
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

  @Put('/:ownerID')
  async editOwner(
    @Res() res: any,
    @Param('ownerID') ownerID: string,
    @Body() createOwnerDTO: CreateOwnerDto,
  ) {
    const editedOwner = await this.ownersService.editOwner(
      ownerID,
      createOwnerDTO,
    );
    if (!editedOwner) {
      throw new NotFoundException('Owner does not exist!');
    }
    return res.status(HttpStatus.OK).json({
      message: 'Owner has been successfully updated',
      owner: editedOwner,
    });
  }

  @Delete('/:ownerID')
  async deleteOwner(
    @Res() res: any,
    @Param('ownerID') ownerID: string,
  ): Promise<string> {
    const deletedOwner = await this.ownersService.deleteOwner(ownerID);
    if (!deletedOwner) {
      throw new NotFoundException('Owner does not exist!');
    }
    return res.status(HttpStatus.OK).json({
      message: 'Owner has been deleted!',
      owner: deletedOwner,
    });
  }
}
