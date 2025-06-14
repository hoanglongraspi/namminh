import React, { useState, useRef } from 'react';
import { Upload, X, Image, AlertCircle, CheckCircle2, Link as LinkIcon, Camera, Folder, Grid } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import ImageGallery from './ImageGallery';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  onError?: (error: string) => void;
  className?: string;
  label?: string;
  accept?: string;
  maxSize?: number; // in MB
  bucket?: string;
  folder?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  onError,
  className = '',
  label = 'Upload Image',
  accept = 'image/*',
  maxSize = 5, // 5MB default
  bucket = 'images',
  folder = 'uploads'
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const validateFile = (file: File): string | null => {
    // Check file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
    if (!allowedTypes.includes(file.type.toLowerCase())) {
      return 'Vui lòng chọn file hình ảnh hợp lệ (JPG, PNG, GIF, WebP, SVG)';
    }

    // Check file size (use 50MB as max to match bucket config)
    const maxSizeBytes = Math.min(maxSize * 1024 * 1024, 50 * 1024 * 1024);
    if (file.size > maxSizeBytes) {
      return `Kích thước file phải nhỏ hơn ${Math.min(maxSize, 50)}MB`;
    }

    // Check file name
    if (!file.name || file.name.length === 0) {
      return 'File không hợp lệ';
    }

    if (file.name.length > 100) {
      return 'Tên file quá dài (tối đa 100 ký tự)';
    }

    return null;
  };

  const generateFileName = (file: File): string => {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 8);
    const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const sanitizedName = file.name
      .replace(/\.[^/.]+$/, '') // Remove extension
      .replace(/[^a-zA-Z0-9]/g, '_') // Replace special chars with underscore
      .substring(0, 20); // Limit length
    
    return `${folder}/${timestamp}_${randomString}_${sanitizedName}.${extension}`;
  };

  const uploadToSupabase = async (file: File): Promise<string> => {
    const fileName = generateFileName(file);
    
    console.log('Uploading file:', fileName, 'Size:', file.size, 'Type:', file.type);
    
    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.type
      });

    if (error) {
      console.error('Supabase upload error:', error);
      throw new Error(`Upload failed: ${error.message || 'Unknown error'}`);
    }

    console.log('Upload successful:', data);

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);

    if (!urlData?.publicUrl) {
      throw new Error('Failed to get public URL');
    }

    console.log('Public URL:', urlData.publicUrl);
    return urlData.publicUrl;
  };

  const handleFile = async (file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      setUploadStatus('error');
      onError?.(validationError);
      return;
    }

    setIsUploading(true);
    setUploadStatus('uploading');
    setUploadProgress(0);

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // Upload to Supabase Storage
      const publicUrl = await uploadToSupabase(file);
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      onChange(publicUrl);
      setUploadStatus('success');
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setUploadStatus('idle');
        setUploadProgress(0);
      }, 3000);
      
    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus('error');
      onError?.(error instanceof Error ? error.message : 'Tải lên thất bại. Vui lòng thử lại.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      // Basic URL validation
      try {
        new URL(urlInput);
        onChange(urlInput.trim());
        setUrlInput('');
        setShowUrlInput(false);
        setUploadStatus('success');
        setTimeout(() => setUploadStatus('idle'), 2000);
      } catch {
        onError?.('URL không hợp lệ');
      }
    }
  };

  const removeImage = () => {
    onChange('');
    setUploadStatus('idle');
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const getStatusIcon = () => {
    switch (uploadStatus) {
      case 'uploading':
        return <div className="animate-spin h-5 w-5 border-2 border-blue-600 border-t-transparent rounded-full" />;
      case 'success':
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Upload className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusMessage = () => {
    switch (uploadStatus) {
      case 'uploading':
        return `Đang tải lên... ${uploadProgress}%`;
      case 'success':
        return 'Tải lên thành công!';
      case 'error':
        return 'Tải lên thất bại';
      default:
        return 'Kéo thả hình ảnh vào đây hoặc click để chọn file';
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setShowGallery(!showGallery)}
            className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            <Grid className="h-3 w-3" />
            {showGallery ? 'Ẩn thư viện' : 'Thư viện'}
          </button>
          <button
            type="button"
            onClick={() => setShowUrlInput(!showUrlInput)}
            className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            <LinkIcon className="h-3 w-3" />
            {showUrlInput ? 'Ẩn URL' : 'Dùng URL'}
          </button>
        </div>
      </div>

      {/* Preview */}
      {value && (
        <div className="relative inline-block group">
          <img
            src={value}
            alt="Preview"
            className="h-40 w-40 object-cover rounded-xl border border-gray-200 shadow-sm"
            onError={(e) => {
              e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYwIiBoZWlnaHQ9IjE2MCIgdmlld0JveD0iMCAwIDE2MCAxNjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNjAiIGhlaWdodD0iMTYwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik04MCA0MEw2MCA2MEg3MFY5MEg5MFY2MEgxMDBMODAgNDBaIiBmaWxsPSIjOUI5QkEwIi8+Cjx0ZXh0IHg9IjgwIiB5PSIxMjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM5QjlCQTAiIGZvbnQtc2l6ZT0iMTIiPkltYWdlIEVycm9yPC90ZXh0Pgo8L3N2Zz4K';
            }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 rounded-xl flex items-center justify-center">
            <button
              type="button"
              onClick={removeImage}
              className="opacity-0 group-hover:opacity-100 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg transition-all duration-200 transform scale-90 group-hover:scale-100"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-sm">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </div>
        </div>
      )}

      {/* Gallery */}
      {showGallery && (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <ImageGallery
            onSelect={(imageUrl) => {
              onChange(imageUrl);
              setShowGallery(false);
              setUploadStatus('success');
              setTimeout(() => setUploadStatus('idle'), 2000);
            }}
            onClose={() => setShowGallery(false)}
            bucket={bucket}
            folder={folder}
            className="border-0 shadow-none"
          />
        </div>
      )}

      {/* URL Input */}
      {showUrlInput && (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nhập URL hình ảnh
          </label>
          <div className="flex gap-2">
            <input
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              onKeyPress={(e) => e.key === 'Enter' && handleUrlSubmit()}
            />
            <button
              type="button"
              onClick={handleUrlSubmit}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
            >
              Thêm
            </button>
          </div>
        </div>
      )}

      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-xl p-8 transition-all duration-200 ${
          dragActive
            ? 'border-blue-400 bg-blue-50 scale-105'
            : value
            ? 'border-gray-200 bg-gray-50'
            : 'border-gray-300 bg-white hover:border-gray-400 hover:bg-gray-50'
        } ${isUploading ? 'pointer-events-none opacity-75' : 'cursor-pointer'}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        <div className="text-center">
          <div className="flex justify-center mb-4">
            {value ? (
              <div className="relative">
                <Image className="h-12 w-12 text-gray-400" />
                <Camera className="h-5 w-5 text-blue-500 absolute -bottom-1 -right-1 bg-white rounded-full p-1" />
              </div>
            ) : (
              <div className="relative">
                {getStatusIcon()}
                {uploadStatus === 'uploading' && (
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                    <div className="w-12 bg-gray-200 rounded-full h-1">
                      <div 
                        className="bg-blue-600 h-1 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <p className={`text-sm font-medium ${
              uploadStatus === 'error' ? 'text-red-600' : 
              uploadStatus === 'success' ? 'text-green-600' :
              uploadStatus === 'uploading' ? 'text-blue-600' :
              'text-gray-700'
            }`}>
              {value ? 'Thay đổi hình ảnh' : getStatusMessage()}
            </p>
            
            {!value && uploadStatus === 'idle' && (
              <div className="space-y-1">
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF, WebP tối đa {maxSize}MB
                </p>
                <p className="text-xs text-gray-400">
                  Hình ảnh sẽ được lưu trữ an toàn trên Supabase Storage
                </p>
              </div>
            )}

            {uploadStatus === 'uploading' && (
              <p className="text-xs text-blue-500">
                Đang xử lý và tối ưu hóa hình ảnh...
              </p>
            )}
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={isUploading}
        />
      </div>

      {/* Upload Info */}
      {value && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <Folder className="h-4 w-4 text-green-600 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-green-800">Hình ảnh đã được tải lên</p>
              <p className="text-xs text-green-600 truncate">
                {value.includes('supabase') ? 'Lưu trữ trên Supabase Storage' : 'URL bên ngoài'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload; 