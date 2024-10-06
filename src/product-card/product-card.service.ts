import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProductCard } from './schema/product-card.schema';
import { Model } from 'mongoose';
import { UserService } from '../user/user.service';
import { Product } from '../product/schema/product.schema';
import { UpdateProductCardDto } from './dto/update-product-card.dto';
import { User } from '../user/schema/user.schema';
import { CreateProductCardDto } from './dto/create-product-card.dto';

@Injectable()
export class ProductCardService {
  constructor(
    @InjectModel(ProductCard.name)
    private readonly productCardModel: Model<ProductCard>,
    private readonly userService: UserService,
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
  ) {}

  private async verifyIfProductExists(updateProductCardDto: UpdateProductCardDto) {
    const products = updateProductCardDto.products || [];

    for ( const productId of products ) {
      const productExist = await this.productModel.exists({_id: productId});
      if (!productExist) {
        throw new BadRequestException(`Product with id ${productId} not found.`);
      }
    }
  }

  private veridiIfUserExists(user: User) {
    if(!user) throw new NotFoundException('User not found');
  }

  private verifyIfProductCartExists(productCard: ProductCard) {
    if(!productCard) throw new NotFoundException('Product cart not found');
    return productCard;
  }

  async createProductCard( createdProductCardDto: CreateProductCardDto): Promise<ProductCard> {
    const user = await this.userService.findUserById(createdProductCardDto.userId);
    this.veridiIfUserExists(user);
    return await this.productCardModel.create(createdProductCardDto)
  } 

  async findAllProductCards(){
    return await this.productCardModel.find().exec();
  }

  async findProductCardById(_id: string): Promise<ProductCard> {
    const productCard = await this.productCardModel.findById(_id).exec();
    return this.verifyIfProductCartExists(productCard);
  };

  async updateProductCard(id: string, updateProductCardDto: UpdateProductCardDto): Promise<ProductCard> {
    await this.verifyIfProductExists(updateProductCardDto);
    const productCard = await this.productCardModel.findByIdAndUpdate(id, updateProductCardDto, {new: true}).exec();
    return this.verifyIfProductCartExists(productCard);
  };
}
