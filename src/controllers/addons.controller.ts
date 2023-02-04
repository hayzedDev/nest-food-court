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
  async findAll(@Param('brandId') brandId: string) {
    const res = await this.addonsService.getMealAddons(brandId);

    if (res.brandNotFound) {
      response.status(404).send({
        success: false,
        message: `The specified brand is not found. Please create the brand first`,
      });
      return;
    }

    res.brandNotFound = undefined;

    return res.mealAddons;
  }

  @Get('/brands/:brandId/addons/:addonId')
  async findOne(
    @Param('brandId') brandId: string,
    @Param('addonId') addonId: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const res = await this.addonsService.getMealAddon(brandId, addonId);

    // check if the brand exists
    if (res.brandNotFound) {
      response.status(404).send({
        success: false,
        message: `The specified brand is not found. Please create the brand first`,
      });
      return;
    }

    // check if the specified addon exists
    if (res.addons?.length === 0) {
      response.status(404).send({
        success: false,
        message: `The mealAddon is not found. Please check the id of the meal Addon and try again`,
      });
      return;
    }

    res.brandNotFound = undefined;
    // res = JSON.parse(JSON.stringify(res));
    return res.addons ? res.addons[0] : res.addons;
  }

  @Patch('/brands/:brandId/addons/:addonId')
  async update(
    @Param('brandId') brandId: string,
    @Param('addonId') addonId: string,
    @Body() updateAddonDto: UpdateAddonDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const res = await this.addonsService.updateAddon(
      brandId,
      addonId,
      updateAddonDto,
    );

    // check if the brand exists
    if (res.brandNotFound) {
      response.status(404).send({
        success: false,
        message: `The specified brand is not found. Please create the brand first`,
      });
      return;
    }
    // check if the brand exists
    if (res.addonNotFound) {
      response.status(404).send({
        success: false,
        message: `The specified addon is not found. Hence, it can not be updated`,
      });
      return;
    }

    return res.mealAddon;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.addonsService.remove(+id);
  }
}
