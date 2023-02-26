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
  UseGuards,
} from '@nestjs/common';

import { response, Response } from 'express';

import { AddonsService } from './addons.service';
import { CreateAddonDto } from './dto/create-addon.dto';
import { UpdateAddonDto } from './dto/update-addon.dto';

import { CreateCategoryDto } from '../categories/dto/create-category.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthenticationGuard } from '../guards/authentication.guard';
import { Public } from '../common/decorators/public.decorator';
import { AuthorizationGuard } from '../guards/authorization.guard';
import { Roles } from '../common/decorators/roles.decorator';

@ApiBearerAuth('access-token')
@ApiTags('Addons')
// @Roles('admin')
@Controller()
@UseGuards(AuthenticationGuard)
@UseGuards(AuthorizationGuard)
export class AddonsController {
  constructor(
    @Inject(forwardRef(() => AddonsService))
    private readonly addonsService: AddonsService,
  ) {}
  @Post('brands/:brandId/addons')
  @ApiOperation({ summary: 'Create a new meal addon for the specified brand' })
  async create(
    @Res({ passthrough: true }) response: Response,
    @Body() createAddonDto: CreateAddonDto,
    @Param('brandId') brandId: string,
  ) {
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

  @Public()
  @Get('/brands/:brandId/addons')
  @ApiOperation({
    summary: `Retrieve a list of all meal addons for the specified brand`,
  })
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
  @Roles('user')
  @ApiOperation({
    summary: `Retrieve a single meal addon by its ID for the specified brand`,
  })
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
  @ApiOperation({
    summary: `Update a single meal addon by its ID for the specified brand`,
  })
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
  @Delete('brands/:brandId/addons/:addonId')
  @ApiOperation({
    summary: `Delete a single meal addon by its ID for the specified brand`,
  })
  async remove(
    @Param('brandId') brandId: string,
    @Param('addonId') addonId: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const res = await this.addonsService.deleteAddon(brandId, addonId);

    // check if the brand is not found
    if (res.brandNotFound) {
      response.status(404).send({
        success: false,
        message: `The specified brand is not found. Please create the brand first`,
      });
      return;
    }
    // check if the addon is not found
    if (res.addonNotFound) {
      response.status(404).send({
        success: false,
        message: `The specified addon is not found. Hence, it can not be updated`,
      });
      return;
    }

    response.status(204).send();
    return;
  }
}
