import { Body, Controller, Delete, Get, Param, Patch, Post, UseFilters, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { ResponseInterceptor } from 'src/common/interceptors/response.interceptor';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './schema/product.schema';

@ApiTags('Product')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(ResponseInterceptor)
@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService){}

    @Post()
    async create(@Body(new ValidationPipe()) createProductDto: CreateProductDto): Promise<Product> {
        return this.productService.createProduct(createProductDto);
    }

    @Get()
    async findAllProducts(): Promise<Product[]> {
        return this.productService.findAllProducts();
    }

    @Get(':id')
    async findByProductId(@Param('id') id: string): Promise<Product> {
        return this.productService.findByProductId(id);
    }

    @Patch(':id')
    async updateProduct(@Param('id') id: string, @Body(new ValidationPipe()) updateProductDto: CreateProductDto): Promise<Product> {
        return this.productService.updateProduct(id, updateProductDto);
    }

    @Delete(':id')
    async deleteProduct(@Param('id') id: string): Promise<Product> {
        return this.productService.deleteProduct(id);
    }
}
