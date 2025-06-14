import React, { useState, useEffect } from 'react';
import { Search, Grid, List, Trash2, Eye, Copy, Check, X, Image as ImageIcon, Calendar, FileText } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface ImageFile {
  name: string;
  id: string;
  updated_at: string;
  created_at: string;
  last_accessed_at: string;
  metadata: {
    size: number;
    mimetype: string;
    cacheControl: string;
  };
  publicUrl: string;
}

interface ImageGalleryProps {
  onSelect?: (imageUrl: string) => void;
  onClose?: () => void;
  bucket?: string;
  folder?: string;
  className?: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  onSelect,
  onClose,
  bucket = 'images',
  folder = '',
  className = ''
}) => {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  useEffect(() => {
    loadImages();
  }, [bucket, folder]);

  const loadImages = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase.storage
        .from(bucket)
        .list(folder, {
          limit: 100,
          offset: 0,
          sortBy: { column: 'created_at', order: 'desc' }
        });

      if (error) {
        throw error;
      }

      // Filter only image files and get public URLs
      const imageFiles = data
        ?.filter(file => 
          file.metadata?.mimetype?.startsWith('image/') || 
          /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file.name)
        )
        .map(file => {
          const { data: urlData } = supabase.storage
            .from(bucket)
            .getPublicUrl(folder ? `${folder}/${file.name}` : file.name);
          
          return {
            ...file,
            publicUrl: urlData.publicUrl
          };
        }) || [];

      setImages(imageFiles);
    } catch (err) {
      console.error('Error loading images:', err);
      setError(err instanceof Error ? err.message : 'Không thể tải danh sách hình ảnh');
    } finally {
      setLoading(false);
    }
  };

  const deleteImage = async (imageName: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa hình ảnh này?')) {
      return;
    }

    try {
      const filePath = folder ? `${folder}/${imageName}` : imageName;
      const { error } = await supabase.storage
        .from(bucket)
        .remove([filePath]);

      if (error) {
        throw error;
      }

      // Remove from local state
      setImages(prev => prev.filter(img => img.name !== imageName));
    } catch (err) {
      console.error('Error deleting image:', err);
      alert('Không thể xóa hình ảnh. Vui lòng thử lại.');
    }
  };

  const copyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedUrl(url);
      setTimeout(() => setCopiedUrl(null), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredImages = images.filter(image =>
    image.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className={`bg-white rounded-lg shadow-lg ${className}`}>
        <div className="p-6 text-center">
          <div className="animate-spin h-8 w-8 border-2 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải hình ảnh...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-white rounded-lg shadow-lg ${className}`}>
        <div className="p-6 text-center">
          <div className="text-red-500 mb-4">
            <ImageIcon className="h-12 w-12 mx-auto mb-2" />
            <p className="font-medium">Lỗi tải hình ảnh</p>
            <p className="text-sm text-gray-600 mt-1">{error}</p>
          </div>
          <button
            onClick={loadImages}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-lg ${className}`}>
      {/* Header */}
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Thư viện hình ảnh</h3>
          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm hình ảnh..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* View Mode Toggle */}
          <div className="flex border border-gray-300 rounded-md">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {filteredImages.length === 0 ? (
          <div className="text-center py-12">
            <ImageIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-medium">
              {searchTerm ? 'Không tìm thấy hình ảnh nào' : 'Chưa có hình ảnh nào'}
            </p>
            <p className="text-sm text-gray-400 mt-1">
              {searchTerm ? 'Thử tìm kiếm với từ khóa khác' : 'Tải lên hình ảnh đầu tiên của bạn'}
            </p>
          </div>
        ) : (
          <>
            {/* Grid View */}
            {viewMode === 'grid' && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {filteredImages.map((image) => (
                  <div
                    key={image.name}
                    className={`group relative bg-gray-100 rounded-lg overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-md ${
                      selectedImage === image.publicUrl ? 'ring-2 ring-blue-500' : ''
                    }`}
                    onClick={() => setSelectedImage(image.publicUrl)}
                  >
                    <div className="aspect-square">
                      <img
                        src={image.publicUrl}
                        alt={image.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 flex gap-2">
                        {onSelect && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelect(image.publicUrl);
                            }}
                            className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                            title="Chọn hình ảnh"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            copyToClipboard(image.publicUrl);
                          }}
                          className="p-2 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-colors"
                          title="Copy URL"
                        >
                          {copiedUrl === image.publicUrl ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteImage(image.name);
                          }}
                          className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                          title="Xóa hình ảnh"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {/* File name */}
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-2">
                      <p className="text-xs truncate" title={image.name}>
                        {image.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* List View */}
            {viewMode === 'list' && (
              <div className="space-y-2">
                {filteredImages.map((image) => (
                  <div
                    key={image.name}
                    className={`flex items-center gap-4 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors ${
                      selectedImage === image.publicUrl ? 'bg-blue-50 border-blue-300' : ''
                    }`}
                    onClick={() => setSelectedImage(image.publicUrl)}
                  >
                    {/* Thumbnail */}
                    <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={image.publicUrl}
                        alt={image.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{image.name}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                        <span className="flex items-center gap-1">
                          <FileText className="h-3 w-3" />
                          {formatFileSize(image.metadata?.size || 0)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(image.created_at)}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      {onSelect && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelect(image.publicUrl);
                          }}
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded-md transition-colors"
                          title="Chọn hình ảnh"
                        >
                          <Check className="h-4 w-4" />
                        </button>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          copyToClipboard(image.publicUrl);
                        }}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                        title="Copy URL"
                      >
                        {copiedUrl === image.publicUrl ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteImage(image.name);
                        }}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-md transition-colors"
                        title="Xóa hình ảnh"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Footer */}
      {filteredImages.length > 0 && (
        <div className="border-t border-gray-200 px-4 py-3 bg-gray-50">
          <p className="text-sm text-gray-600">
            {filteredImages.length} hình ảnh
            {searchTerm && ` (lọc từ ${images.length} hình ảnh)`}
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageGallery; 