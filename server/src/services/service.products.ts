import { AppDataSource } from '../data-source';
import { Macros } from '../entities/Macros';
import { Micros } from '../entities/Micros';
import { Product } from '../entities/Products';
import { Vitamins } from '../entities/Vitamins';

const productRepository = AppDataSource.getRepository(Product);

export const createProduct = async (productData: {
  id: number;
  name: string;
  image_url: string;
  macros: Macros;
  micros: Micros;
  vitamins: Vitamins;
}) => {
  const existingProduct = await productRepository.findOne({
    where: { id: productData.id },
  });

  if (existingProduct) {
    throw new Error('Product with this ID already exists');
  }
  const product = productRepository.create({
    id: productData.id,
    name: productData.name,
    image_url: productData.image_url,
    macros: productData.macros,
    micros: productData.micros,
    vitamins: productData.vitamins,
  });

  return await productRepository.save(product);
};

export const getProducts = async () => {
  return productRepository.find({
    relations: ["macros", "micros", "vitamins"],
  });
};