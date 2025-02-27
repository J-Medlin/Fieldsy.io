import React, { useState } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';
import { uploadImage } from '../lib/supabase-storage';

interface ImageUploadProps {
  onUpload: (url: string) => void;
  type: 'products' | 'workshops';
  className?: string;
}

export default function ImageUpload({ onUpload, type, className = '' }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setError(null);
      const file = event.target.files?.[0];
      if (!file) return;

      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image must be less than 5MB');
        return;
      }

      // Show preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      setUploading(true);
      const url = await uploadImage(file, type);
      onUpload(url);
    } catch (error) {
      setError('Failed to upload image');
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleClear = () => {
    setPreview(null);
    setError(null);
  };

  return (
    <div className={`relative ${className}`}>
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        disabled={uploading}
        className="hidden"
        id="image-upload"
      />
      
      {!preview && (
        <label
          htmlFor="image-upload"
          className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-green-500 transition-colors"
        >
          <Upload className="w-8 h-8 text-gray-400" />
          <span className="mt-2 text-sm text-gray-500">
            Click to upload image
          </span>
          <span className="mt-1 text-xs text-gray-400">
            Max size: 5MB
          </span>
        </label>
      )}

      {preview && (
        <div className="relative w-full h-40">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover rounded-lg"
          />
          <button
            onClick={handleClear}
            className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      )}

      {uploading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 rounded-lg">
          <Loader2 className="w-6 h-6 animate-spin text-green-600" />
        </div>
      )}

      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}