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
  Res,
} from '@nestjs/common';

import { response, Response } from 'express';

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
    @Res({ passthrough: true }) response: Response,
    @Body() createAddonDto: CreateAddonDto,
    @Param('brandId') brandId: string,
  ) {
    console.log('hey');
    // console.log(this, 'line 24');
    // await this.addonsService.create(createAddonDto, brandId);

    let addonServiceRes = await this.addonsService.createNewMealAddon(
      createAddonDto,
      brandId,
    );
    if (addonServiceRes.brandNotFound) {
      response.status(404).send({
        success: false,
        message: `The specified brand is not found. Please create the brand first`,
      });
      return;
    }

    addonServiceRes.brandNotFound = undefined;
    // addonServiceRes = JSON.parse(JSON.stringify(addonServiceRes));
    return addonServiceRes;
  }

  @Get('/brands/:brandId/addons')
  findAll(@Param('brandId') brandId: string) {
    return this.addonsService.getMealAddons(brandId);
  }

  @Get('/brands/:brandId/addons/:addonId')
  async findOne(
    @Param('brandId') brandId: string,
    @Param('addonId') addonId: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const res = await this.addonsService.getMealAddon(brandId, addonId);

    if (res.brandNotFound) {
      response.status(404).send({
        success: false,
        message: `The specified brand is not found. Please create the brand first`,
      });
      return;
    }

    res.brandNotFound = undefined;
    // res = JSON.parse(JSON.stringify(res));
    return res.addons;
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
