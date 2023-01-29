import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Injectable,
  forwardRef,
  Inject,
} from '@nestjs/common';

import { AddonsService } from '../services/addons.service';
import { CreateAddonDto } from '../dtos/addonsdto/create-addon.dto';
import { UpdateAddonDto } from '../dtos/addonsdto/update-addon.dto';

@Controller()
export class AddonsController {
  constructor(
    @Inject(forwardRef(() => AddonsService))
    private readonly addonsService: AddonsService,
  ) {}

  @Post('brands/:brandId/addons')
  async create(
    @Body() createAddonDto: CreateAddonDto,
    @Param('brandId') brandId: string,
  ) {
    console.log('hey');
    // console.log(this, 'line 24');
    // await this.addonsService.create(createAddonDto, brandId);
    return await this.addonsService.create(createAddonDto, brandId);
  }

  @Get()
  findAll() {
    return this.addonsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.addonsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAddonDto: UpdateAddonDto) {
    return this.addonsService.update(+id, updateAddonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.addonsService.remove(+id);
  }
}
