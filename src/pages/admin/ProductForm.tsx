import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase, Product } from '../../lib/supabase';
import { Save, X, Plus, Trash2, Eye, Upload, AlertCircle, CheckCircle2, Package } from 'lucide-react';
import ImageUpload from '../../components/admin/ImageUpload';
import RichTextEditor from '../../components/admin/RichTextEditor';

interface ValidationErrors {
  [key: string]: string;
}

const ProductForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [showPreview, setShowPreview] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  
  const [product, setProduct] = useState<Partial<Product>>({
    name: '',
    slug: '',
    description: '',
    image_url: '',
    category: '',
    features: [],
    specifications: {},
    is_active: true,
    display_order: 0,
  });

  const [newFeature, setNewFeature] = useState('');
  const [newSpecKey, setNewSpecKey] = useState('');
  const [newSpecValue, setNewSpecValue] = useState('');

  const categoryOptions = [
    { value: 'medical-equipment', label: 'Thiết bị y tế' },
    { value: 'consumables', label: 'Vật tư tiêu hao' },
    { value: 'lab-equipment', label: 'Thiết bị phòng thí nghiệm' },
  ];

  useEffect(() => {
    if (isEdit && id) {
      fetchProduct();
    }
  }, [id, isEdit]);

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove accents
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  };

  const handleNameChange = (name: string) => {
    setProduct({
      ...product,
      name,
      slug: generateSlug(name),
    });
  };

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      if (data) setProduct(data);
    } catch (error) {
      console.error('Error fetching product:', error);
      setSaveStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!product.name?.trim()) {
      newErrors.name = 'Tên sản phẩm là bắt buộc';
    }

    if (!product.slug?.trim()) {
      newErrors.slug = 'Slug URL là bắt buộc';
    } else if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(product.slug)) {
      newErrors.slug = 'Slug chỉ được chứa chữ thường, số và dấu gạch ngang';
    }

    if (!product.description?.trim()) {
      newErrors.description = 'Mô tả sản phẩm là bắt buộc';
    }

    if (!product.category?.trim()) {
      newErrors.category = 'Danh mục là bắt buộc';
    }

    if (product.image_url && !isValidUrl(product.image_url)) {
      newErrors.image_url = 'URL hình ảnh không hợp lệ';
    }

    if (product.display_order !== undefined && product.display_order < 0) {
      newErrors.display_order = 'Thứ tự hiển thị phải >= 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string: string): boolean => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setSaveStatus('error');
      return;
    }

    setLoading(true);
    setSaveStatus('saving');

    try {
      const productData = {
        ...product,
        updated_at: new Date().toISOString(),
      };

      if (isEdit) {
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('products')
          .insert([productData]);

        if (error) throw error;
      }

      setSaveStatus('success');
      setTimeout(() => {
        navigate('/admin/products');
      }, 1500);
    } catch (error) {
      console.error('Error saving product:', error);
      setSaveStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const addFeature = () => {
    if (newFeature.trim() && !product.features?.includes(newFeature.trim())) {
      setProduct({
        ...product,
        features: [...(product.features || []), newFeature.trim()],
      });
      setNewFeature('');
    }
  };

  const removeFeature = (index: number) => {
    setProduct({
      ...product,
      features: product.features?.filter((_, i) => i !== index) || [],
    });
  };

  const addSpecification = () => {
    if (newSpecKey.trim() && newSpecValue.trim()) {
      setProduct({
        ...product,
        specifications: {
          ...product.specifications,
          [newSpecKey.trim()]: newSpecValue.trim(),
        },
      });
      setNewSpecKey('');
      setNewSpecValue('');
    }
  };

  const removeSpecification = (key: string) => {
    const { [key]: _, ...rest } = product.specifications || {};
    setProduct({
      ...product,
      specifications: rest,
    });
  };

  const renderStatusMessage = () => {
    switch (saveStatus) {
      case 'saving':
        return (
          <div className="flex items-center gap-2 text-blue-600 bg-blue-50 px-4 py-2 rounded-lg">
            <div className="animate-spin h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full"></div>
            <span>Đang lưu...</span>
          </div>
        );
      case 'success':
        return (
          <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-lg">
            <CheckCircle2 className="h-4 w-4" />
            <span>Lưu thành công! Đang chuyển hướng...</span>
          </div>
        );
      case 'error':
        return (
          <div className="flex items-center gap-2 text-red-600 bg-red-50 px-4 py-2 rounded-lg">
            <AlertCircle className="h-4 w-4" />
            <span>Có lỗi xảy ra. Vui lòng thử lại.</span>
          </div>
        );
      default:
        return null;
    }
  };

  const ProductPreview = () => (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold mb-4">Preview</h3>
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="relative h-48 bg-gray-100">
          {product.image_url ? (
            <img 
              src={product.image_url} 
              alt={product.name || 'Product preview'} 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.setAttribute('style', 'display: flex');
              }}
            />
          ) : null}
          <div className="w-full h-full bg-gray-100 flex items-center justify-center" style={{ display: product.image_url ? 'none' : 'flex' }}>
            <Package className="h-12 w-12 text-gray-400" />
          </div>
          {product.category && (
            <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded">
              {categoryOptions.find(cat => cat.value === product.category)?.label || product.category}
            </div>
          )}
        </div>
        <div className="p-4">
          <h4 className="font-semibold text-lg mb-2">{product.name || 'Tên sản phẩm'}</h4>
          <p className="text-gray-600 text-sm mb-3">{product.description || 'Mô tả sản phẩm'}</p>
          {product.features && product.features.length > 0 && (
            <div className="mb-3">
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
        </div>
      </div>
    </div>
  );

  if (loading && isEdit) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-64"></div>
          <div className="bg-white rounded-lg p-6 space-y-4">
            <div className="h-4 bg-gray-200 rounded w-32"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-32"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {isEdit ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
        </h1>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Eye className="h-4 w-4" />
            {showPreview ? 'Ẩn preview' : 'Xem preview'}
          </button>
          <button
            onClick={() => navigate('/admin/products')}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <X className="h-4 w-4" />
            Đóng
          </button>
        </div>
      </div>

      {renderStatusMessage() && (
        <div className="mb-6">
          {renderStatusMessage()}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white shadow-sm rounded-lg border border-gray-200 p-6 space-y-6">
            {/* Basic Information */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Thông tin cơ bản</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tên sản phẩm *
                  </label>
                  <input
                    type="text"
                    required
                    value={product.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Nhập tên sản phẩm"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Slug URL *
                  </label>
                  <input
                    type="text"
                    required
                    value={product.slug}
                    onChange={(e) => setProduct({ ...product, slug: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.slug ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="duong-dan-url-cua-san-pham"
                  />
                  {errors.slug && <p className="mt-1 text-sm text-red-600">{errors.slug}</p>}
                  <p className="mt-1 text-sm text-gray-500">URL thân thiện cho sản phẩm (tự động tạo từ tên)</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Danh mục *
                  </label>
                  <select
                    required
                    value={product.category || ''}
                    onChange={(e) => setProduct({ ...product, category: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.category ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Chọn danh mục</option>
                    {categoryOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mô tả sản phẩm *
                </label>
                <textarea
                  rows={4}
                  required
                  value={product.description || ''}
                  onChange={(e) => setProduct({ ...product, description: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.description ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Nhập mô tả chi tiết về sản phẩm"
                />
                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
              </div>
            </div>

            {/* Media */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Hình ảnh</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL hình ảnh
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={product.image_url || ''}
                    onChange={(e) => setProduct({ ...product, image_url: e.target.value })}
                    className={`flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.image_url ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="https://example.com/image.jpg"
                  />
                  <button
                    type="button"
                    className="flex items-center gap-2 px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                    title="Tính năng upload sẽ được thêm sau"
                  >
                    <Upload className="h-4 w-4" />
                    Upload
                  </button>
                </div>
                {errors.image_url && <p className="mt-1 text-sm text-red-600">{errors.image_url}</p>}
                <p className="mt-1 text-sm text-gray-500">Nhập URL của hình ảnh sản phẩm</p>
              </div>
            </div>

            {/* Features */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Tính năng nổi bật</h2>
              
              <div className="space-y-3">
                {product.features?.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-md">
                    <span className="flex-1">{feature}</span>
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    placeholder="Nhập tính năng mới"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                  />
                  <button
                    type="button"
                    onClick={addFeature}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    Thêm
                  </button>
                </div>
              </div>
            </div>

            {/* Specifications */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Thông số kỹ thuật</h2>
              
              <div className="space-y-3">
                {Object.entries(product.specifications || {}).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-2 p-3 bg-gray-50 rounded-md">
                    <span className="font-medium text-gray-700 w-1/3">{key}:</span>
                    <span className="flex-1">{value}</span>
                    <button
                      type="button"
                      onClick={() => removeSpecification(key)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={newSpecKey}
                    onChange={(e) => setNewSpecKey(e.target.value)}
                    placeholder="Tên thông số"
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    value={newSpecValue}
                    onChange={(e) => setNewSpecValue(e.target.value)}
                    placeholder="Giá trị"
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSpecification())}
                  />
                </div>
                <button
                  type="button"
                  onClick={addSpecification}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  Thêm thông số
                </button>
              </div>
            </div>

            {/* Settings */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Cài đặt</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Thứ tự hiển thị
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={product.display_order || 0}
                    onChange={(e) => setProduct({ ...product, display_order: parseInt(e.target.value) || 0 })}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.display_order ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                  {errors.display_order && <p className="mt-1 text-sm text-red-600">{errors.display_order}</p>}
                  <p className="mt-1 text-sm text-gray-500">Số thứ tự để sắp xếp sản phẩm (0 = cao nhất)</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Trạng thái
                  </label>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="is_active"
                      checked={product.is_active}
                      onChange={(e) => setProduct({ ...product, is_active: e.target.checked })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="is_active" className="ml-2 text-sm text-gray-700">
                      Hiển thị công khai
                    </label>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">Bật để hiển thị sản phẩm trên website</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate('/admin/products')}
                className="px-6 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                disabled={loading}
              >
                Hủy
              </button>
              <button
                type="submit"
                disabled={loading || saveStatus === 'saving'}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                ) : (
                  <Save className="h-4 w-4" />
                )}
                {isEdit ? 'Cập nhật' : 'Tạo mới'}
              </button>
            </div>
          </form>
        </div>

        {/* Preview Panel */}
        {showPreview && (
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <ProductPreview />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductForm; 