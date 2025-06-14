import React from 'react';
import { ArrowRight, Package, Loader2 } from 'lucide-react';
import Container from '../ui/Container';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { useFeaturedProducts, LandingProduct } from '../../hooks/useProducts';

const ProductCard: React.FC<{ product: LandingProduct }> = ({ product }) => {
  return (
    <Card hover className="h-full flex flex-col">
      <div className="relative h-48 w-full overflow-hidden">
        {product.image_url ? (
          <img 
            src={product.image_url} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <Package className="h-12 w-12 text-gray-400" />
          </div>
        )}
        <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded">
          Nổi bật
        </div>
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3">{product.description}</p>
        
        {/* Features */}
        {product.features && product.features.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {product.features.slice(0, 2).map((feature, index) => (
                <span 
                  key={index}
                  className="inline-block bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded"
                >
                  {feature}
                </span>
              ))}
              {product.features.length > 2 && (
                <span className="text-xs text-gray-500">+{product.features.length - 2} more</span>
              )}
            </div>
          </div>
        )}
        
        <a 
          href={`/products/${product.slug}`} 
          className="text-blue-600 font-medium flex items-center hover:underline mt-auto"
        >
          Xem chi tiết <ArrowRight size={16} className="ml-1" />
        </a>
      </div>
    </Card>
  );
};

const LoadingSkeleton: React.FC = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {[1, 2, 3, 4].map((i) => (
      <Card key={i} className="h-full">
        <div className="animate-pulse">
          <div className="h-48 bg-gray-200 rounded-t-lg"></div>
          <div className="p-4 space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded"></div>
              <div className="h-3 bg-gray-200 rounded w-5/6"></div>
            </div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </Card>
    ))}
  </div>
);

const FeaturedProducts: React.FC = () => {
  const { products, loading, error } = useFeaturedProducts(4);

  if (error) {
    return (
      <section className="py-16">
        <Container>
          <div className="text-center py-12">
            <div className="bg-red-50 rounded-lg p-6 max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-red-800 mb-2">Không thể tải sản phẩm</h3>
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          </div>
        </Container>
      </section>
    );
  }

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

        {loading ? (
          <LoadingSkeleton />
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-gray-50 rounded-lg p-8 max-w-md mx-auto">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Chưa có sản phẩm nào</h3>
              <p className="text-gray-600 text-sm">Các sản phẩm sẽ được hiển thị tại đây khi có sẵn.</p>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
};

export default FeaturedProducts;