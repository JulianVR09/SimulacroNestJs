import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GenericService } from 'src/common/services/generic.service';
import { Product } from './schema/product.schema';
import { Model, Types } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService extends GenericService<Product> {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {
    super(productModel);
  }

  private validateMongoId(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ID format');
    }
  }

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
      return super.create(createProductDto);
  }

  async findAllProducts(): Promise<Product[]> {
      return super.findAll();
  }

  async findByProductId(id: string): Promise<Product> {
    this.validateMongoId(id);
    return super.findById(id);
  }

  async updateProduct(id: string, updateProductDto: CreateProductDto): Promise<Product> {
    this.validateMongoId(id);
    return super.updateById(id, updateProductDto);
  }

  async deleteProduct(id: string): Promise<Product> {
    this.validateMongoId(id);
    return super.deleteById(id);
  }
}
