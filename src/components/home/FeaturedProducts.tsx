import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Product } from '../../types';
import Container from '../ui/Container';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { PRODUCTS } from '../../constants';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <Card hover className="h-full flex flex-col">
      <div className="relative h-48 w-full overflow-hidden">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
        />
        {product.featured && (
          <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded">
            Nổi bật
          </div>
        )}
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4 flex-grow">{product.description}</p>
        <a 
          href={`/products/${product.id}`} 
          className="text-blue-600 font-medium flex items-center hover:underline mt-auto"
        >
          Xem chi tiết <ArrowRight size={16} className="ml-1" />
        </a>
      </div>
    </Card>
  );
};

const FeaturedProducts: React.FC = () => {
  // Filter featured products, or take the first 4 if none are featured
  const featuredProducts = PRODUCTS.filter(p => p.featured) || PRODUCTS.slice(0, 4);

  return (
    <section className="py-16">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Sản phẩm nổi bật</h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              Khám phá những thiết bị y tế hiện đại và chất lượng cao từ NamMinhMed.
            </p>
          </div>
          <Button 
            variant="outline" 
            className="mt-4 md:mt-0"
          >
            Xem tất cả sản phẩm
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FeaturedProducts;