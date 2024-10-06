import { Module } from '@nestjs/common';
import { ProductCardService } from './product-card.service';
import { ProductCardController } from './product-card.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductCard, ProductCardSchema } from './schema/product-card.schema';
import { UserModule } from '../user/user.module';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: ProductCard.name, schema: ProductCardSchema}
    ]),
    UserModule,
    ProductModule
  ],
  controllers: [ProductCardController],
  providers: [ProductCardService],
  exports: [ProductCardService]
})
export class ProductCardModule {}
