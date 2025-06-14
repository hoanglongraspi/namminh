import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase, News } from '../../lib/supabase';
import { 
  Save, 
  X, 
  Plus, 
  Trash2, 
  Eye, 
  Upload, 
  AlertCircle, 
  CheckCircle2, 
  Newspaper, 
  Calendar,
  FileText,
  Image as ImageIcon,
  Tag as TagIcon,
  Settings,
  BookOpen,
  Clock,
  Globe,
  Lock
} from 'lucide-react';
import ImageUpload from '../../components/admin/ImageUpload';
import RichTextEditor from '../../components/admin/RichTextEditor';

interface ValidationErrors {
  [key: string]: string;
}

interface ArticleSection {
  id: string;
  type: 'heading' | 'paragraph' | 'image' | 'quote' | 'list';
  content: string;
  level?: number; // for headings (1-6)
  order: number;
}

const NewsForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [showPreview, setShowPreview] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [activeTab, setActiveTab] = useState<'content' | 'media' | 'seo' | 'settings'>('content');
  
  const [article, setArticle] = useState<Partial<News>>({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    featured_image: '',
    category: '',
    tags: [],
    is_published: false,
  });

  // Advanced fields for better article management
  const [articleMeta, setArticleMeta] = useState({
    subtitle: '',
    author_name: '',
    reading_time: 0,
    seo_title: '',
    seo_description: '',
    featured_image_alt: '',
    featured_image_caption: '',
    scheduled_publish: '',
  });

  const [newTag, setNewTag] = useState('');

  const categoryOptions = [
    'Tin tức công ty',
    'Thông báo',
    'Cập nhật sản phẩm', 
    'Hướng dẫn sử dụng',
    'Nghiên cứu y tế',
    'Khuyến mãi',
    'Kiến thức y tế',
    'Chăm sóc sức khỏe',
    'Công nghệ y tế'
  ];

  useEffect(() => {
    if (isEdit && id) {
      fetchArticle();
    }
  }, [id, isEdit]);

  // Calculate estimated reading time
  useEffect(() => {
    if (article.content) {
      const wordsPerMinute = 200;
      const wordCount = article.content.split(/\s+/).length;
      const readingTime = Math.ceil(wordCount / wordsPerMinute);
      setArticleMeta(prev => ({ ...prev, reading_time: readingTime }));
    }
  }, [article.content]);

  const fetchArticle = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      if (data) {
        setArticle(data);
        // Set meta fields from data if available
        setArticleMeta(prev => ({
          ...prev,
          seo_title: data.title,
          seo_description: data.excerpt || '',
        }));
      }
    } catch (error) {
      console.error('Error fetching article:', error);
      setSaveStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove accents
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  };

  const handleTitleChange = (title: string) => {
    const newSlug = generateSlug(title);
    setArticle({
      ...article,
      title,
      // Only auto-generate slug for new articles or if slug matches the old title's slug
      slug: !isEdit || article.slug === generateSlug(article.title || '') ? newSlug : article.slug,
    });
    // Auto-update SEO title if not manually set
    if (!articleMeta.seo_title || articleMeta.seo_title === article.title) {
      setArticleMeta(prev => ({ ...prev, seo_title: title }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!article.title?.trim()) {
      newErrors.title = 'Tiêu đề bài viết là bắt buộc';
    } else if (article.title.length > 100) {
      newErrors.title = 'Tiêu đề không được vượt quá 100 ký tự';
    }

    if (!article.content?.trim()) {
      newErrors.content = 'Nội dung bài viết là bắt buộc';
    } else if (article.content.length < 100) {
      newErrors.content = 'Nội dung bài viết quá ngắn (tối thiểu 100 ký tự)';
    }

    if (!article.excerpt?.trim()) {
      newErrors.excerpt = 'Mô tả tóm tắt là bắt buộc';
    } else if (article.excerpt.length > 300) {
      newErrors.excerpt = 'Mô tả tóm tắt không được vượt quá 300 ký tự';
    }

    if (article.featured_image && !isValidUrl(article.featured_image)) {
      newErrors.featured_image = 'URL hình ảnh không hợp lệ';
    }

    if (!article.slug?.trim()) {
      newErrors.slug = 'Slug URL là bắt buộc';
    } else if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(article.slug)) {
      newErrors.slug = 'Slug chỉ được chứa chữ thường, số và dấu gạch ngang';
    }

    if (articleMeta.seo_title && articleMeta.seo_title.length > 60) {
      newErrors.seo_title = 'Tiêu đề SEO không được vượt quá 60 ký tự';
    }

    if (articleMeta.seo_description && articleMeta.seo_description.length > 160) {
      newErrors.seo_description = 'Mô tả SEO không được vượt quá 160 ký tự';
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
      const articleData = {
        ...article,
        updated_at: new Date().toISOString(),
        published_at: article.is_published ? (article.published_at || new Date().toISOString()) : null,
      };

      if (isEdit) {
        const { error } = await supabase
          .from('news')
          .update(articleData)
          .eq('id', id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('news')
          .insert([articleData]);

        if (error) throw error;
      }

      setSaveStatus('success');
      setTimeout(() => {
        navigate('/admin/news');
      }, 1500);
    } catch (error) {
      console.error('Error saving article:', error);
      setSaveStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const addTag = () => {
    const trimmedTag = newTag.trim();
    if (trimmedTag && !article.tags?.includes(trimmedTag)) {
      setArticle({
        ...article,
        tags: [...(article.tags || []), trimmedTag],
      });
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setArticle({
      ...article,
      tags: article.tags?.filter(tag => tag !== tagToRemove) || [],
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit', 
      year: 'numeric'
    });
  };

  const NewsPreview = () => (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Eye className="h-5 w-5" />
        Preview
      </h3>
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="relative h-48 bg-gray-100">
          {article.featured_image ? (
            <img 
              src={article.featured_image} 
              alt={articleMeta.featured_image_alt || article.title || 'News preview'} 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.setAttribute('style', 'display: flex');
              }}
            />
          ) : null}
          <div className="w-full h-full bg-gray-100 flex items-center justify-center" style={{ display: article.featured_image ? 'none' : 'flex' }}>
            <Newspaper className="h-12 w-12 text-gray-400" />
          </div>
          {article.category && (
            <div className="absolute top-2 left-2 bg-purple-600 text-white text-xs font-semibold px-2 py-1 rounded">
              {article.category}
            </div>
          )}
          {!article.is_published && (
            <div className="absolute top-2 right-2 bg-gray-600 text-white text-xs font-semibold px-2 py-1 rounded flex items-center gap-1">
              <Lock className="h-3 w-3" />
              Nháp
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="flex items-center text-gray-500 text-sm mb-3 gap-4">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(article.published_at || new Date().toISOString())}</span>
            </div>
            {articleMeta.reading_time > 0 && (
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{articleMeta.reading_time} phút đọc</span>
              </div>
            )}
          </div>
          <h4 className="font-semibold text-lg mb-2">{article.title || 'Tiêu đề bài viết'}</h4>
          {articleMeta.subtitle && (
            <p className="text-gray-600 text-sm font-medium mb-2">{articleMeta.subtitle}</p>
          )}
          <p className="text-gray-600 text-sm mb-3">{article.excerpt || 'Mô tả tóm tắt'}</p>
          {article.tags && article.tags.length > 0 && (
            <div className="mb-3">
              <div className="flex flex-wrap gap-1">
                {article.tags.slice(0, 3).map((tag, index) => (
                  <span 
                    key={index}
                    className="inline-block bg-purple-50 text-purple-700 text-xs px-2 py-1 rounded"
                  >
                    #{tag}
                  </span>
                ))}
                {article.tags.length > 3 && (
                  <span className="text-xs text-gray-500">+{article.tags.length - 3} more</span>
                )}
              </div>
            </div>
          )}
          {articleMeta.author_name && (
            <div className="text-xs text-gray-500">
              Tác giả: {articleMeta.author_name}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const TabButton = ({ 
    id, 
    label, 
    icon: Icon, 
    isActive, 
    onClick 
  }: { 
    id: string; 
    label: string; 
    icon: any; 
    isActive: boolean; 
    onClick: () => void;
  }) => (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
        isActive
          ? 'bg-blue-600 text-white'
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
      }`}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
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
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {isEdit ? 'Chỉnh sửa bài viết' : 'Tạo bài viết mới'}
          </h1>
          <p className="text-gray-600 mt-1">
            {isEdit ? 'Cập nhật nội dung và thông tin bài viết' : 'Tạo bài viết mới với editor nâng cao'}
          </p>
        </div>
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
            onClick={() => navigate('/admin/news')}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <X className="h-4 w-4" />
            Đóng
          </button>
        </div>
      </div>

      {/* Status Message */}
      {renderStatusMessage() && (
        <div className="mb-6">
          {renderStatusMessage()}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
            {/* Tab Navigation */}
            <div className="border-b border-gray-200 bg-gray-50 p-4">
              <div className="flex space-x-2">
                <TabButton
                  id="content"
                  label="Nội dung"
                  icon={FileText}
                  isActive={activeTab === 'content'}
                  onClick={() => setActiveTab('content')}
                />
                <TabButton
                  id="media"
                  label="Hình ảnh"
                  icon={ImageIcon}
                  isActive={activeTab === 'media'}
                  onClick={() => setActiveTab('media')}
                />
                <TabButton
                  id="seo"
                  label="SEO"
                  icon={Globe}
                  isActive={activeTab === 'seo'}
                  onClick={() => setActiveTab('seo')}
                />
                <TabButton
                  id="settings"
                  label="Cài đặt"
                  icon={Settings}
                  isActive={activeTab === 'settings'}
                  onClick={() => setActiveTab('settings')}
                />
              </div>
            </div>

            <div className="p-6">
              {/* Content Tab */}
              {activeTab === 'content' && (
                <div className="space-y-6">
                  {/* Basic Information */}
                  <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Thông tin cơ bản
                    </h2>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tiêu đề bài viết *
                      </label>
                      <input
                        type="text"
                        required
                        value={article.title}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.title ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder="Nhập tiêu đề bài viết..."
                      />
                      {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                      <p className="mt-1 text-sm text-gray-500">{article.title?.length || 0}/100 ký tự</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phụ đề (tuỳ chọn)
                      </label>
                      <input
                        type="text"
                        value={articleMeta.subtitle}
                        onChange={(e) => setArticleMeta(prev => ({ ...prev, subtitle: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Phụ đề hoặc câu giới thiệu ngắn..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Slug URL *
                      </label>
                      <input
                        type="text"
                        required
                        value={article.slug}
                        onChange={(e) => setArticle({ ...article, slug: e.target.value })}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.slug ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder="duong-dan-url-cua-bai-viet"
                      />
                      {errors.slug && <p className="mt-1 text-sm text-red-600">{errors.slug}</p>}
                      <p className="mt-1 text-sm text-gray-500">URL thân thiện cho bài viết (tự động tạo từ tiêu đề)</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mô tả tóm tắt *
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={article.excerpt || ''}
                        onChange={(e) => setArticle({ ...article, excerpt: e.target.value })}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.excerpt ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder="Viết mô tả ngắn gọn về nội dung bài viết..."
                      />
                      {errors.excerpt && <p className="mt-1 text-sm text-red-600">{errors.excerpt}</p>}
                      <p className="mt-1 text-sm text-gray-500">{article.excerpt?.length || 0}/300 ký tự</p>
                    </div>
                  </div>

                  {/* Rich Text Content */}
                  <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-gray-900">Nội dung bài viết</h2>
                    
                    <RichTextEditor
                      value={article.content || ''}
                      onChange={(content) => setArticle({ ...article, content })}
                      placeholder="Bắt đầu viết nội dung bài viết tại đây..."
                      minHeight="500px"
                      error={errors.content}
                      label="Nội dung *"
                    />
                    {article.content && (
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{article.content.length} ký tự</span>
                        <span>Thời gian đọc: ~{articleMeta.reading_time} phút</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Media Tab */}
              {activeTab === 'media' && (
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <ImageIcon className="h-5 w-5" />
                    Hình ảnh đại diện
                  </h2>
                  
                  <ImageUpload
                    value={article.featured_image || ''}
                    onChange={(url) => setArticle({ ...article, featured_image: url })}
                    error={errors.featured_image}
                    label="Hình ảnh đại diện"
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mô tả hình ảnh (Alt text)
                    </label>
                    <input
                      type="text"
                      value={articleMeta.featured_image_alt}
                      onChange={(e) => setArticleMeta(prev => ({ ...prev, featured_image_alt: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Mô tả ngắn gọn về hình ảnh..."
                    />
                    <p className="mt-1 text-sm text-gray-500">Quan trọng cho SEO và accessibility</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Chú thích hình ảnh (tuỳ chọn)
                    </label>
                    <input
                      type="text"
                      value={articleMeta.featured_image_caption}
                      onChange={(e) => setArticleMeta(prev => ({ ...prev, featured_image_caption: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Chú thích hiển thị dưới hình ảnh..."
                    />
                  </div>
                </div>
              )}

              {/* SEO Tab */}
              {activeTab === 'seo' && (
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Tối ưu hóa SEO
                  </h2>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tiêu đề SEO
                    </label>
                    <input
                      type="text"
                      value={articleMeta.seo_title}
                      onChange={(e) => setArticleMeta(prev => ({ ...prev, seo_title: e.target.value }))}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.seo_title ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="Tiêu đề hiển thị trên kết quả tìm kiếm..."
                    />
                    {errors.seo_title && <p className="mt-1 text-sm text-red-600">{errors.seo_title}</p>}
                    <p className="mt-1 text-sm text-gray-500">{articleMeta.seo_title?.length || 0}/60 ký tự</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mô tả SEO
                    </label>
                    <textarea
                      rows={3}
                      value={articleMeta.seo_description}
                      onChange={(e) => setArticleMeta(prev => ({ ...prev, seo_description: e.target.value }))}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.seo_description ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="Mô tả hiển thị trên kết quả tìm kiếm..."
                    />
                    {errors.seo_description && <p className="mt-1 text-sm text-red-600">{errors.seo_description}</p>}
                    <p className="mt-1 text-sm text-gray-500">{articleMeta.seo_description?.length || 0}/160 ký tự</p>
                  </div>

                  {/* SEO Preview */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Preview kết quả tìm kiếm:</h3>
                    <div className="space-y-1">
                      <div className="text-blue-600 text-lg hover:underline cursor-pointer">
                        {articleMeta.seo_title || article.title || 'Tiêu đề bài viết'}
                      </div>
                      <div className="text-green-600 text-sm">
                        namminh.com/news/{article.slug || 'slug-url'}
                      </div>
                      <div className="text-gray-600 text-sm">
                        {articleMeta.seo_description || article.excerpt || 'Mô tả bài viết sẽ hiển thị tại đây...'}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Cài đặt bài viết
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Danh mục
                      </label>
                      <select
                        value={article.category || ''}
                        onChange={(e) => setArticle({ ...article, category: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Chọn danh mục</option>
                        {categoryOptions.map(category => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tác giả
                      </label>
                      <input
                        type="text"
                        value={articleMeta.author_name}
                        onChange={(e) => setArticleMeta(prev => ({ ...prev, author_name: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Tên tác giả..."
                      />
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <TagIcon className="h-4 w-4" />
                      Tags
                    </label>
                    <div className="space-y-3">
                      {article.tags && article.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {article.tags.map((tag, index) => (
                            <span 
                              key={index}
                              className="inline-flex items-center gap-1 bg-purple-50 text-purple-700 text-sm px-3 py-1 rounded-full"
                            >
                              #{tag}
                              <button
                                type="button"
                                onClick={() => removeTag(tag)}
                                className="text-purple-500 hover:text-purple-700"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          placeholder="Nhập tag mới"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                        />
                        <button
                          type="button"
                          onClick={addTag}
                          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                          Thêm
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Publishing */}
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Xuất bản</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="is_published"
                          checked={article.is_published}
                          onChange={(e) => setArticle({ ...article, is_published: e.target.checked })}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="is_published" className="ml-2 text-sm text-gray-700">
                          Xuất bản ngay lập tức
                        </label>
                      </div>
                      <p className="text-sm text-gray-500">
                        {article.is_published 
                          ? 'Bài viết sẽ hiển thị công khai trên website' 
                          : 'Bài viết sẽ được lưu dưới dạng nháp'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  {article.content && `${article.content.length} ký tự • Thời gian đọc ~${articleMeta.reading_time} phút`}
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => navigate('/admin/news')}
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
                    {isEdit ? 'Cập nhật' : (article.is_published ? 'Xuất bản' : 'Lưu nháp')}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Preview Panel */}
        {showPreview && (
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <NewsPreview />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsForm; 