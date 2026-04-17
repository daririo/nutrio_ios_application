import { AppDataSource } from '../data-source';
import { Macros } from '../entities/products/Macros';
import { Micros } from '../entities/products/Micros';
import { Product } from '../entities/products/Products';
import { Vitamins } from '../entities/products/Vitamins';

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
    relations: ['macros', 'micros', 'vitamins'],
  });
};

export const deleteProductById = async (id: number) => {
  const product = await productRepository.findOne({
    where: { id },
    relations: ['macros', 'micros', 'vitamins'],
  });

  if (!product) throw new Error('Product not found');

  await productRepository.delete(id);

  if (product.macros) {
    await AppDataSource.getRepository(Macros).delete(product.macros.id);
  }

  if (product.micros) {
    await AppDataSource.getRepository(Micros).delete(product.micros.id);
  }

  if (product.vitamins) {
    await AppDataSource.getRepository(Vitamins).delete(product.vitamins.id);
  }

  return { success: true };
};
