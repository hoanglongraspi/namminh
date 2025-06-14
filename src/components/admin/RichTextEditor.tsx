import React, { useState, useRef, useEffect } from 'react';
import { 
  Bold, 
  Italic, 
  Underline, 
  List, 
  ListOrdered, 
  Link, 
  Quote,
  Type,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Code,
  Eye,
  EyeOff,
  Image as ImageIcon,
  Table,
  Palette,
  Minus,
  MoreHorizontal,
  Undo,
  Redo,
  Copy,
  Scissors,
  FileText,
  Hash,
  Strikethrough,
  Subscript,
  Superscript,
  Upload,
  Camera,
  Grid
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import ImageGallery from './ImageGallery';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  label?: string;
  error?: string;
  minHeight?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = 'Start writing...',
  className = '',
  label,
  error,
  minHeight = '300px'
}) => {
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showFontSizes, setShowFontSizes] = useState(false);
  const [currentColor, setCurrentColor] = useState('#000000');
  const [wordCount, setWordCount] = useState(0);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [showImageOptions, setShowImageOptions] = useState(false);
  const [showImageGallery, setShowImageGallery] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);
  const colorPickerRef = useRef<HTMLDivElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const imageOptionsRef = useRef<HTMLDivElement>(null);
  const isInternalUpdate = useRef(false);

  const colors = [
    '#000000', '#333333', '#666666', '#999999', '#CCCCCC',
    '#FF0000', '#FF6600', '#FFCC00', '#33CC00', '#00CCFF',
    '#0066CC', '#6600CC', '#CC0066', '#FF3366', '#FF9900'
  ];

  const fontSizes = [
    { label: 'Nhỏ', value: '12px' },
    { label: 'Bình thường', value: '14px' },
    { label: 'Trung bình', value: '16px' },
    { label: 'Lớn', value: '18px' },
    { label: 'Rất lớn', value: '24px' },
    { label: 'Khổng lồ', value: '32px' }
  ];

  useEffect(() => {
    if (editorRef.current && !isPreviewMode && !isInternalUpdate.current) {
      // Only update if the content is actually different
      if (editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = value;
      }
    }
    isInternalUpdate.current = false;
  }, [value, isPreviewMode]);

  // Initialize editor content on mount
  useEffect(() => {
    if (editorRef.current && value && !editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value;
    }
  }, []);

  useEffect(() => {
    // Count words
    const text = value.replace(/<[^>]*>/g, '').trim();
    const words = text ? text.split(/\s+/).length : 0;
    setWordCount(words);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target as Node)) {
        setShowColorPicker(false);
      }
      if (imageOptionsRef.current && !imageOptionsRef.current.contains(event.target as Node)) {
        setShowImageOptions(false);
      }
      // Hide all image controls when clicking outside
      document.querySelectorAll('.image-controls').forEach(control => {
        (control as HTMLElement).style.display = 'none';
      });
    };

    // Add global functions for image manipulation
    (window as any).selectImage = (imageId: string) => {
      // Hide all other image controls
      document.querySelectorAll('.image-controls').forEach(control => {
        (control as HTMLElement).style.display = 'none';
      });
      
      // Show controls for selected image
      const controls = document.getElementById(`controls_${imageId}`);
      if (controls) {
        controls.style.display = controls.style.display === 'none' ? 'block' : 'none';
      }
    };

    (window as any).resizeImage = (imageId: string, size: 'small' | 'medium' | 'large') => {
      const img = document.getElementById(imageId) as HTMLImageElement;
      if (img) {
        const container = img.parentElement;
        if (container) {
          switch (size) {
            case 'small':
              img.style.width = '200px';
              img.style.maxWidth = '200px';
              break;
            case 'medium':
              img.style.width = '400px';
              img.style.maxWidth = '400px';
              break;
            case 'large':
              img.style.width = '100%';
              img.style.maxWidth = '100%';
              break;
          }
          img.style.height = 'auto';
          
          // Trigger change event
          const editor = document.querySelector('[contenteditable="true"]') as HTMLElement;
          if (editor) {
            const event = new Event('input', { bubbles: true });
            editor.dispatchEvent(event);
          }
        }
      }
    };

    (window as any).alignImage = (imageId: string, alignment: 'left' | 'center' | 'right') => {
      const img = document.getElementById(imageId) as HTMLImageElement;
      if (img) {
        const container = img.parentElement;
        if (container) {
          switch (alignment) {
            case 'left':
              container.style.textAlign = 'left';
              img.style.float = 'left';
              img.style.marginRight = '15px';
              img.style.marginLeft = '0';
              break;
            case 'center':
              container.style.textAlign = 'center';
              img.style.float = 'none';
              img.style.marginLeft = 'auto';
              img.style.marginRight = 'auto';
              img.style.display = 'block';
              break;
            case 'right':
              container.style.textAlign = 'right';
              img.style.float = 'right';
              img.style.marginLeft = '15px';
              img.style.marginRight = '0';
              break;
          }
          
          // Trigger change event
          const editor = document.querySelector('[contenteditable="true"]') as HTMLElement;
          if (editor) {
            const event = new Event('input', { bubbles: true });
            editor.dispatchEvent(event);
          }
        }
      }
    };

    (window as any).removeImage = (imageId: string) => {
      if (confirm('Bạn có chắc chắn muốn xóa hình ảnh này?')) {
        const img = document.getElementById(imageId);
        if (img) {
          const container = img.parentElement;
          if (container && container.classList.contains('image-container')) {
            container.remove();
          } else {
            img.remove();
          }
          
          // Trigger change event
          const editor = document.querySelector('[contenteditable="true"]') as HTMLElement;
          if (editor) {
            const event = new Event('input', { bubbles: true });
            editor.dispatchEvent(event);
          }
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      // Clean up global functions
      delete (window as any).selectImage;
      delete (window as any).resizeImage;
      delete (window as any).alignImage;
      delete (window as any).removeImage;
    };
  }, []);

  const handleInput = () => {
    if (editorRef.current) {
      isInternalUpdate.current = true;
      const content = editorRef.current.innerHTML;
      onChange(content);
    }
  };

  const handleSelection = () => {
    const selection = window.getSelection();
    if (selection) {
      setSelectedText(selection.toString());
    }
  };

  const executeCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    handleInput();
  };

  const insertLink = () => {
    const url = prompt('Nhập URL:');
    if (url) {
      executeCommand('createLink', url);
    }
  };

  const uploadImageToSupabase = async (file: File): Promise<string> => {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 8);
    const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    
    // Clean filename - remove special characters and spaces
    const cleanName = file.name
      .replace(/\.[^/.]+$/, '') // Remove extension
      .replace(/[^a-zA-Z0-9]/g, '_') // Replace special chars with underscore
      .substring(0, 20); // Limit length
    
    const fileName = `editor/${timestamp}_${randomString}_${cleanName}.${extension}`;
    
    console.log('Uploading file:', fileName, 'Size:', file.size, 'Type:', file.type);
    
    const { data, error } = await supabase.storage
      .from('images')
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

    const { data: urlData } = supabase.storage
      .from('images')
      .getPublicUrl(fileName);

    if (!urlData?.publicUrl) {
      throw new Error('Failed to get public URL');
    }

    console.log('Public URL:', urlData.publicUrl);
    return urlData.publicUrl;
  };

  const handleImageUpload = async (file: File) => {
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
    if (!allowedTypes.includes(file.type.toLowerCase())) {
      alert('Vui lòng chọn file hình ảnh hợp lệ (JPG, PNG, GIF, WebP, SVG)');
      return;
    }

    // Validate file size (50MB limit to match bucket config)
    if (file.size > 50 * 1024 * 1024) {
      alert('File quá lớn. Vui lòng chọn file nhỏ hơn 50MB');
      return;
    }

    // Validate file name
    if (!file.name || file.name.length === 0) {
      alert('File không hợp lệ');
      return;
    }

    setIsUploadingImage(true);
    try {
      const imageUrl = await uploadImageToSupabase(file);
      insertImageWithOptions(imageUrl, 'Uploaded image');
      setShowImageOptions(false);
      
      // Show success message
      console.log('Image inserted successfully:', imageUrl);
    } catch (error) {
      console.error('Image upload error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      // Provide more specific error messages
      let userMessage = 'Tải lên hình ảnh thất bại';
      if (errorMessage.includes('413')) {
        userMessage = 'File quá lớn. Vui lòng chọn file nhỏ hơn.';
      } else if (errorMessage.includes('415')) {
        userMessage = 'Định dạng file không được hỗ trợ.';
      } else if (errorMessage.includes('401') || errorMessage.includes('403')) {
        userMessage = 'Không có quyền tải lên. Vui lòng thử lại.';
      } else {
        userMessage = `Lỗi: ${errorMessage}`;
      }
      
      alert(`${userMessage}\n\nVui lòng thử lại hoặc kiểm tra:\n- Kích thước file < 50MB\n- Định dạng file hợp lệ (JPG, PNG, GIF, WebP, SVG)\n- Kết nối internet ổn định`);
    } finally {
      setIsUploadingImage(false);
    }
  };

  const insertImageFromFile = () => {
    imageInputRef.current?.click();
  };

  const insertImageFromUrl = () => {
    const url = prompt('Nhập URL hình ảnh:');
    if (url) {
      insertImageWithOptions(url, 'Image');
      setShowImageOptions(false);
    }
  };

  const insertImageWithOptions = (src: string, alt: string) => {
    const imageId = `img_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const imageHtml = `
      <div class="image-container" style="position: relative; display: inline-block; margin: 10px 0; text-align: center;">
        <img 
          id="${imageId}" 
          src="${src}" 
          alt="${alt}" 
          style="max-width: 100%; height: auto; cursor: pointer; border: 2px solid transparent; transition: border-color 0.2s;" 
          onclick="selectImage('${imageId}')"
          onload="this.style.border='2px solid #007bff'; setTimeout(() => this.style.border='2px solid transparent', 2000);"
        />
        <div id="controls_${imageId}" class="image-controls" style="display: none; position: absolute; top: -45px; left: 50%; transform: translateX(-50%); background: white; border: 1px solid #ccc; border-radius: 6px; padding: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); z-index: 1000; white-space: nowrap;">
          <div style="margin-bottom: 4px; font-size: 11px; color: #666; text-align: center;">Kích thước:</div>
          <button type="button" onclick="resizeImage('${imageId}', 'small')" style="margin: 0 2px; padding: 4px 8px; font-size: 11px; border: 1px solid #ddd; background: #f8f9fa; cursor: pointer; border-radius: 3px;">Nhỏ</button>
          <button type="button" onclick="resizeImage('${imageId}', 'medium')" style="margin: 0 2px; padding: 4px 8px; font-size: 11px; border: 1px solid #ddd; background: #f8f9fa; cursor: pointer; border-radius: 3px;">Vừa</button>
          <button type="button" onclick="resizeImage('${imageId}', 'large')" style="margin: 0 2px; padding: 4px 8px; font-size: 11px; border: 1px solid #ddd; background: #f8f9fa; cursor: pointer; border-radius: 3px;">Lớn</button>
          <br/>
          <div style="margin: 4px 0 4px 0; font-size: 11px; color: #666; text-align: center;">Căn chỉnh:</div>
          <button type="button" onclick="alignImage('${imageId}', 'left')" style="margin: 0 2px; padding: 4px 8px; font-size: 11px; border: 1px solid #ddd; background: #f8f9fa; cursor: pointer; border-radius: 3px;" title="Căn trái">←</button>
          <button type="button" onclick="alignImage('${imageId}', 'center')" style="margin: 0 2px; padding: 4px 8px; font-size: 11px; border: 1px solid #ddd; background: #f8f9fa; cursor: pointer; border-radius: 3px;" title="Căn giữa">↔</button>
          <button type="button" onclick="alignImage('${imageId}', 'right')" style="margin: 0 2px; padding: 4px 8px; font-size: 11px; border: 1px solid #ddd; background: #f8f9fa; cursor: pointer; border-radius: 3px;" title="Căn phải">→</button>
          <button type="button" onclick="removeImage('${imageId}')" style="margin: 0 2px; padding: 4px 8px; font-size: 11px; border: 1px solid #dc3545; background: #f8d7da; color: #721c24; cursor: pointer; border-radius: 3px;" title="Xóa ảnh">×</button>
        </div>
      </div>
    `;
    
    executeCommand('insertHTML', imageHtml);
  };

  const insertImageFromGallery = () => {
    setShowImageGallery(true);
    setShowImageOptions(false);
  };

  const handleGalleryImageSelect = (imageUrl: string) => {
    insertImageWithOptions(imageUrl, 'Gallery image');
    setShowImageGallery(false);
  };

  const toggleImageOptions = () => {
    setShowImageOptions(!showImageOptions);
  };

  const insertTable = () => {
    const rows = prompt('Số hàng:', '3');
    const cols = prompt('Số cột:', '3');
    
    if (rows && cols) {
      const numRows = parseInt(rows);
      const numCols = parseInt(cols);
      
      let tableHTML = '<table border="1" style="border-collapse: collapse; width: 100%; margin: 10px 0;">';
      for (let i = 0; i < numRows; i++) {
        tableHTML += '<tr>';
        for (let j = 0; j < numCols; j++) {
          tableHTML += '<td style="padding: 8px; border: 1px solid #ddd;">&nbsp;</td>';
        }
        tableHTML += '</tr>';
      }
      tableHTML += '</table>';
      
      executeCommand('insertHTML', tableHTML);
    }
  };

  const insertHorizontalRule = () => {
    executeCommand('insertHorizontalRule');
  };

  const formatHeading = (level: string) => {
    if (level === 'div') {
      executeCommand('formatBlock', 'div');
    } else {
      executeCommand('formatBlock', `h${level}`);
    }
  };

  const setTextColor = (color: string) => {
    executeCommand('foreColor', color);
    setCurrentColor(color);
    setShowColorPicker(false);
  };

  const setFontSize = (size: string) => {
    executeCommand('fontSize', '7'); // Set to largest, then use CSS
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const span = document.createElement('span');
      span.style.fontSize = size;
      try {
        range.surroundContents(span);
      } catch {
        span.appendChild(range.extractContents());
        range.insertNode(span);
      }
      selection.removeAllRanges();
      handleInput();
    }
    setShowFontSizes(false);
  };

  const toolbarButtons = [
    // Text formatting
    { icon: Bold, command: 'bold', tooltip: 'Đậm (Ctrl+B)', group: 'format' },
    { icon: Italic, command: 'italic', tooltip: 'Nghiêng (Ctrl+I)', group: 'format' },
    { icon: Underline, command: 'underline', tooltip: 'Gạch chân (Ctrl+U)', group: 'format' },
    { icon: Strikethrough, command: 'strikethrough', tooltip: 'Gạch ngang', group: 'format' },
    
    // Lists and alignment
    { icon: List, command: 'insertUnorderedList', tooltip: 'Danh sách không đánh số', group: 'list' },
    { icon: ListOrdered, command: 'insertOrderedList', tooltip: 'Danh sách đánh số', group: 'list' },
    { icon: AlignLeft, command: 'justifyLeft', tooltip: 'Căn trái', group: 'align' },
    { icon: AlignCenter, command: 'justifyCenter', tooltip: 'Căn giữa', group: 'align' },
    { icon: AlignRight, command: 'justifyRight', tooltip: 'Căn phải', group: 'align' },
    
    // Special formatting
    { icon: Quote, command: 'formatBlock', value: 'blockquote', tooltip: 'Trích dẫn', group: 'special' },
    { icon: Code, command: 'formatBlock', value: 'pre', tooltip: 'Khối mã', group: 'special' },
    
    // History
    { icon: Undo, command: 'undo', tooltip: 'Hoàn tác (Ctrl+Z)', group: 'history' },
    { icon: Redo, command: 'redo', tooltip: 'Làm lại (Ctrl+Y)', group: 'history' }
  ];

  const specialButtons = [
    { icon: Link, action: insertLink, tooltip: 'Chèn liên kết' },
    { icon: ImageIcon, action: toggleImageOptions, tooltip: 'Chèn hình ảnh' },
    { icon: Table, action: insertTable, tooltip: 'Chèn bảng' },
    { icon: Minus, action: insertHorizontalRule, tooltip: 'Chèn đường kẻ ngang' }
  ];

  const headingOptions = [
    { label: 'Đoạn văn bình thường', value: 'div' },
    { label: 'Tiêu đề 1', value: '1' },
    { label: 'Tiêu đề 2', value: '2' },
    { label: 'Tiêu đề 3', value: '3' },
    { label: 'Tiêu đề 4', value: '4' },
    { label: 'Tiêu đề 5', value: '5' },
    { label: 'Tiêu đề 6', value: '6' }
  ];

  // Convert HTML to markdown-like format for preview
  const getMarkdownPreview = (html: string) => {
    return html
      .replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1\n\n')
      .replace(/<h2[^>]*>(.*?)<\/h2>/gi, '## $1\n\n')
      .replace(/<h3[^>]*>(.*?)<\/h3>/gi, '### $1\n\n')
      .replace(/<h4[^>]*>(.*?)<\/h4>/gi, '#### $1\n\n')
      .replace(/<h5[^>]*>(.*?)<\/h5>/gi, '##### $1\n\n')
      .replace(/<h6[^>]*>(.*?)<\/h6>/gi, '###### $1\n\n')
      .replace(/<p[^>]*>(.*?)<\/p>/gi, '$1\n\n')
      .replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**')
      .replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**')
      .replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*')
      .replace(/<i[^>]*>(.*?)<\/i>/gi, '*$1*')
      .replace(/<u[^>]*>(.*?)<\/u>/gi, '_$1_')
      .replace(/<s[^>]*>(.*?)<\/s>/gi, '~~$1~~')
      .replace(/<strike[^>]*>(.*?)<\/strike>/gi, '~~$1~~')
      .replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)')
      .replace(/<ul[^>]*>(.*?)<\/ul>/gis, (match, content) => {
        return content.replace(/<li[^>]*>(.*?)<\/li>/gi, '• $1\n') + '\n';
      })
      .replace(/<ol[^>]*>(.*?)<\/ol>/gis, (match, content) => {
        let counter = 1;
        return content.replace(/<li[^>]*>(.*?)<\/li>/gi, () => `${counter++}. $1\n`) + '\n';
      })
      .replace(/<blockquote[^>]*>(.*?)<\/blockquote>/gis, '> $1\n\n')
      .replace(/<pre[^>]*>(.*?)<\/pre>/gis, '```\n$1\n```\n\n')
      .replace(/<hr[^>]*>/gi, '\n---\n\n')
      .replace(/<br[^>]*>/gi, '\n')
      .replace(/<[^>]+>/g, '') // Remove remaining HTML tags
      .replace(/\n\n+/g, '\n\n') // Normalize line breaks
      .trim();
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <div className="border border-gray-300 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
        {/* Toolbar */}
        <div className="bg-gray-50 border-b border-gray-200 p-3">
          {/* First Row - Main formatting */}
          <div className="flex items-center space-x-1 flex-wrap gap-2 mb-2">
            {/* Heading Dropdown */}
            <select
              onChange={(e) => formatHeading(e.target.value)}
              className="text-sm border border-gray-300 rounded px-2 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {headingOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <div className="w-px h-6 bg-gray-300 mx-1" />

            {/* Font Size Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowFontSizes(!showFontSizes)}
                className="flex items-center gap-1 px-2 py-1 text-sm border border-gray-300 rounded bg-white hover:bg-gray-50"
              >
                <Type className="h-4 w-4" />
                <span className="text-xs">Size</span>
              </button>
              {showFontSizes && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded shadow-lg z-10">
                  {fontSizes.map((size) => (
                    <button
                      key={size.value}
                      type="button"
                      onClick={() => setFontSize(size.value)}
                      className="block w-full text-left px-3 py-1 text-sm hover:bg-gray-100"
                      style={{ fontSize: size.value }}
                    >
                      {size.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Color Picker */}
            <div className="relative" ref={colorPickerRef}>
              <button
                type="button"
                onClick={() => setShowColorPicker(!showColorPicker)}
                className="flex items-center gap-1 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors"
                title="Màu chữ"
              >
                <Palette className="h-4 w-4" />
                <div 
                  className="w-3 h-3 rounded border"
                  style={{ backgroundColor: currentColor }}
                />
              </button>
              {showColorPicker && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded shadow-lg p-2 z-10">
                  <div className="grid grid-cols-5 gap-1">
                    {colors.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setTextColor(color)}
                        className="w-6 h-6 rounded border hover:scale-110 transition-transform"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="w-px h-6 bg-gray-300 mx-1" />

            {/* Formatting Buttons by Group */}
            {toolbarButtons.filter(btn => btn.group === 'format').map((button, index) => (
              <button
                key={index}
                type="button"
                onClick={() => executeCommand(button.command, button.value)}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors"
                title={button.tooltip}
              >
                <button.icon className="h-4 w-4" />
              </button>
            ))}
          </div>

          {/* Second Row - Lists, alignment, special formatting */}
          <div className="flex items-center space-x-1 flex-wrap gap-2">
            {/* List Buttons */}
            {toolbarButtons.filter(btn => btn.group === 'list').map((button, index) => (
              <button
                key={index}
                type="button"
                onClick={() => executeCommand(button.command, button.value)}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors"
                title={button.tooltip}
              >
                <button.icon className="h-4 w-4" />
              </button>
            ))}

            <div className="w-px h-6 bg-gray-300 mx-1" />

            {/* Alignment Buttons */}
            {toolbarButtons.filter(btn => btn.group === 'align').map((button, index) => (
              <button
                key={index}
                type="button"
                onClick={() => executeCommand(button.command, button.value)}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors"
                title={button.tooltip}
              >
                <button.icon className="h-4 w-4" />
              </button>
            ))}

            <div className="w-px h-6 bg-gray-300 mx-1" />

            {/* Special Formatting */}
            {toolbarButtons.filter(btn => btn.group === 'special').map((button, index) => (
              <button
                key={index}
                type="button"
                onClick={() => executeCommand(button.command, button.value)}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors"
                title={button.tooltip}
              >
                <button.icon className="h-4 w-4" />
              </button>
            ))}

            <div className="w-px h-6 bg-gray-300 mx-1" />

            {/* Insert Buttons */}
            {specialButtons.map((button, index) => (
              <div key={index} className="relative">
                <button
                  type="button"
                  onClick={button.action}
                  className={`p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors ${
                    button.icon === ImageIcon && isUploadingImage ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  title={button.tooltip}
                  disabled={button.icon === ImageIcon && isUploadingImage}
                >
                  {button.icon === ImageIcon && isUploadingImage ? (
                    <div className="animate-spin h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full" />
                  ) : (
                    <button.icon className="h-4 w-4" />
                  )}
                </button>
                
                {/* Image Options Dropdown */}
                {button.icon === ImageIcon && showImageOptions && (
                  <div 
                    ref={imageOptionsRef}
                    className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg p-2 z-20 min-w-48"
                  >
                    <div className="space-y-2">
                      <button
                        type="button"
                        onClick={insertImageFromFile}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                      >
                        <Upload className="h-4 w-4" />
                        Tải lên từ máy tính
                      </button>
                      <button
                        type="button"
                        onClick={insertImageFromGallery}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                      >
                        <Grid className="h-4 w-4" />
                        Chọn từ thư viện
                      </button>
                      <button
                        type="button"
                        onClick={insertImageFromUrl}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                      >
                        <Camera className="h-4 w-4" />
                        Từ URL
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}

            <div className="w-px h-6 bg-gray-300 mx-1" />

            {/* History Buttons */}
            {toolbarButtons.filter(btn => btn.group === 'history').map((button, index) => (
              <button
                key={index}
                type="button"
                onClick={() => executeCommand(button.command, button.value)}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors"
                title={button.tooltip}
              >
                <button.icon className="h-4 w-4" />
              </button>
            ))}

            <div className="w-px h-6 bg-gray-300 mx-1" />

            {/* Preview Toggle */}
            <button
              type="button"
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              className={`p-2 rounded transition-colors ${
                isPreviewMode 
                  ? 'text-blue-600 bg-blue-100 hover:bg-blue-200'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
              }`}
              title={isPreviewMode ? 'Chế độ chỉnh sửa' : 'Chế độ xem trước'}
            >
              {isPreviewMode ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Editor/Preview */}
        <div style={{ minHeight }}>
          {isPreviewMode ? (
            <div className="p-4 prose prose-sm max-w-none">
              <div dangerouslySetInnerHTML={{ __html: value }} />
            </div>
          ) : (
            <div
              ref={editorRef}
              contentEditable
              onInput={handleInput}
              onMouseUp={handleSelection}
              onKeyUp={handleSelection}
              onKeyDown={(e) => {
                // Handle keyboard shortcuts
                if (e.ctrlKey || e.metaKey) {
                  switch (e.key.toLowerCase()) {
                    case 'b':
                      e.preventDefault();
                      executeCommand('bold');
                      break;
                    case 'i':
                      e.preventDefault();
                      executeCommand('italic');
                      break;
                    case 'u':
                      e.preventDefault();
                      executeCommand('underline');
                      break;
                    case 'z':
                      if (e.shiftKey) {
                        e.preventDefault();
                        executeCommand('redo');
                      } else {
                        e.preventDefault();
                        executeCommand('undo');
                      }
                      break;
                    case 'y':
                      e.preventDefault();
                      executeCommand('redo');
                      break;
                  }
                }
              }}
              onPaste={(e) => {
                // Allow paste but trigger handleInput after
                setTimeout(handleInput, 0);
              }}
              onFocus={() => {
                // Ensure editor is focused
                if (editorRef.current) {
                  editorRef.current.focus();
                }
              }}
              className="p-4 focus:outline-none prose prose-sm max-w-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 rounded-md transition-all"
              style={{ minHeight }}
              data-placeholder={placeholder}
              suppressContentEditableWarning={true}
            />
          )}
        </div>

        {/* Footer with stats */}
        <div className="bg-gray-50 border-t border-gray-200 px-4 py-2 flex justify-between items-center text-xs text-gray-500">
          <div className="flex items-center gap-4">
            <span>{wordCount} từ</span>
            <span>{value.length} ký tự</span>
            {selectedText && <span>Đã chọn: {selectedText.length} ký tự</span>}
          </div>
          <div className="flex items-center gap-2">
            <FileText className="h-3 w-3" />
            <span>Rich Text Editor</span>
          </div>
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      {/* Help Text */}
      <div className="text-xs text-gray-500">
        <p>
          Sử dụng thanh công cụ để định dạng văn bản. Phím tắt: 
          <kbd className="px-1 py-0.5 bg-gray-200 rounded text-xs mx-1">Ctrl+B</kbd> đậm,
          <kbd className="px-1 py-0.5 bg-gray-200 rounded text-xs mx-1">Ctrl+I</kbd> nghiêng,
          <kbd className="px-1 py-0.5 bg-gray-200 rounded text-xs mx-1">Ctrl+U</kbd> gạch chân,
          <kbd className="px-1 py-0.5 bg-gray-200 rounded text-xs mx-1">Ctrl+Z</kbd> hoàn tác.
        </p>
      </div>

      {/* Hidden File Input for Image Upload */}
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            handleImageUpload(file);
          }
        }}
        className="hidden"
      />

      {/* Image Gallery Modal */}
      {showImageGallery && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="max-w-6xl w-full max-h-[90vh] overflow-hidden">
            <ImageGallery
              onSelect={handleGalleryImageSelect}
              onClose={() => setShowImageGallery(false)}
              bucket="images"
              folder=""
            />
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{
        __html: `
          [contenteditable]:empty:before {
            content: attr(data-placeholder);
            color: #9CA3AF;
            font-style: italic;
          }
          
          .prose h1 { font-size: 2em; font-weight: bold; margin: 0.5em 0; }
          .prose h2 { font-size: 1.5em; font-weight: bold; margin: 0.5em 0; }
          .prose h3 { font-size: 1.2em; font-weight: bold; margin: 0.5em 0; }
          .prose h4 { font-size: 1.1em; font-weight: bold; margin: 0.5em 0; }
          .prose h5 { font-size: 1em; font-weight: bold; margin: 0.5em 0; }
          .prose h6 { font-size: 0.9em; font-weight: bold; margin: 0.5em 0; }
          .prose p { margin: 0.5em 0; line-height: 1.6; }
          .prose ul, .prose ol { margin: 0.5em 0; padding-left: 2em; }
          .prose li { margin: 0.25em 0; }
          .prose blockquote { 
            border-left: 4px solid #E5E7EB; 
            padding-left: 1em; 
            margin: 1em 0; 
            font-style: italic;
            color: #6B7280;
            background: #F9FAFB;
          }
          .prose pre { 
            background: #F3F4F6; 
            padding: 1em; 
            border-radius: 0.5em; 
            overflow-x: auto;
            font-family: 'Courier New', monospace;
            border: 1px solid #E5E7EB;
          }
          .prose a { 
            color: #3B82F6; 
            text-decoration: underline;
            transition: color 0.2s;
          }
          .prose a:hover { color: #1D4ED8; }
          .prose img {
            max-width: 100%;
            height: auto;
            border-radius: 0.5em;
            margin: 1em 0;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          }
          .prose table {
            width: 100%;
            border-collapse: collapse;
            margin: 1em 0;
            border: 1px solid #E5E7EB;
          }
          .prose table th,
          .prose table td {
            padding: 0.5em;
            border: 1px solid #E5E7EB;
            text-align: left;
          }
          .prose table th {
            background: #F9FAFB;
            font-weight: bold;
          }
          .prose hr {
            border: none;
            height: 1px;
            background: #E5E7EB;
            margin: 2em 0;
          }
          .prose s,
          .prose strike {
            text-decoration: line-through;
            opacity: 0.7;
          }
        `
      }} />
    </div>
  );
};

export default RichTextEditor; 