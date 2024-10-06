import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, UseInterceptors } from '@nestjs/common';
import { ProductCardService } from './product-card.service';
import { CreateProductCardDto } from './dto/create-product-card.dto';
import { UpdateProductCardDto } from './dto/update-product-card.dto';
import { HttpExceptionFilter } from '../common/filters/http-exception.filter';
import { ResponseInterceptor } from '../common/interceptors/response.interceptor';
import { ProductCard } from './schema/product-card.schema';

@Controller('product-card')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(ResponseInterceptor)
export class ProductCardController {
  constructor(private readonly productCardService: ProductCardService) {}

  @Post()
  async addProductCard(@Body() createProductCardDto: CreateProductCardDto): Promise<ProductCard> {
    return this.productCardService.createProductCard(createProductCardDto);
  }

  @Get()
  async findAllProductCards(): Promise<ProductCard[]> {
    return this.productCardService.findAllProductCards();
  }

  @Get(':id')
  async findProductCardById(@Param('id') id: string): Promise<ProductCard> {
    return this.productCardService.findProductCardById(id);
  }

  @Patch(':id')
  async updateProductCard(
    @Param('id') id: string,
    @Body() updateProductCardDto: UpdateProductCardDto,
  ): Promise<ProductCard> {
    return this.productCardService.updateProductCard(id, updateProductCardDto);
  }
}
