import React, { useState, useCallback, useMemo, useRef } from 'react';
import ReactQuill from 'react-quill';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../../contexts/AlertContext';
import { Post, postsApi, UploadResponse } from '../../api/posts';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import 'react-quill/dist/quill.snow.css';
import './ArticleForm.scss';

// Utility functions for content encoding/decoding
const encodeContent = (content: string): string => {
  // Just return the content as is - no encoding needed
  // since we're sending it as JSON and the server handles UTF-8
  return content;
};

const decodeContent = (content: string): string => {
  // Just return the content as is - no decoding needed
  // since we're receiving it as JSON and the server handles UTF-8
  return content;
};

const modules = {
  toolbar: {
    container: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'align': [] }],
      ['link', 'image'],
      ['clean']
    ]
  }
};

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike',
  'list', 'bullet',
  'align',
  'link', 'image'
];

interface ArticleFormProps {
  initialData?: Post;
  onSubmit: (data: {
    title: string;
    shortDescription: string;
    content: string;
    featuredImage?: File;
  }) => Promise<void>;
  submitButtonText: string;
  loadingButtonText: string;
}

export const ArticleForm: React.FC<ArticleFormProps> = ({
  initialData,
  onSubmit,
  submitButtonText,
  loadingButtonText
}) => {
  const { showAlert } = useAlert();
  const [title, setTitle] = useState(initialData?.title || '');
  const [shortDescription, setShortDescription] = useState(initialData?.short_description || '');
  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState(initialData?.featured_image_url || '');
  const [content, setContent] = useState(initialData?.content ? decodeContent(initialData.content) : '<p><br></p>');
  const [isLoading, setIsLoading] = useState(false);
  const quillRef = useRef<ReactQuill>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await onSubmit({
        title,
        shortDescription,
        content: encodeContent(content),
        featuredImage: featuredImage || undefined
      });
    } catch (err) {
      showAlert(
        err instanceof Error ? err.message : 'Failed to submit article',
        'error'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const imageHandler = async () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (file) {
        try {
          const imageUrl = await handleImageUpload(file);
          const quill = quillRef.current?.getEditor();
          if (!quill) return;

          const range = quill.getSelection(true);
          const index = range ? range.index : 0;          
          quill.insertEmbed(index, 'image', imageUrl.url, 'user');
          quill.insertText(index + 1, '\n', 'user');
          quill.setSelection(index + 2, 0);
          setContent(quill.root.innerHTML);
        } catch (err) {
          showAlert(
            err instanceof Error ? err.message : 'Failed to upload image',
            'error'
          );
        }
      }
    };
  };

  const customModules = useMemo(() => ({
    ...modules,
    toolbar: {
      ...modules.toolbar,
      handlers: { image: imageHandler }
    }
  }), []);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFeaturedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = useCallback(async (file: File): Promise<UploadResponse> => {
    try {
      return await postsApi.uploadContentImage(file);
    } catch (error) {
      throw new Error('Failed to upload image');
    }
  }, []);

  return (
    <form className="article-form" onSubmit={handleSubmit}>
      <Input
        id="title"
        name="title"
        type="text"
        label="Title"
        placeholder="Enter article title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <div className="form-group">
        <label htmlFor="mainImage">Main Image</label>
        <input
          type="file"
          id="mainImage"
          accept="image/*"
          onChange={handleImageChange}
          required={!initialData}
        />
        {imagePreview && (
          <div className="image-preview">
            <img src={imagePreview} alt="Preview" />
          </div>
        )}
      </div>

      <Input
        id="shortDescription"
        name="shortDescription"
        type="text"
        label="Short Description"
        placeholder="Enter a short description"
        value={shortDescription}
        onChange={(e) => setShortDescription(e.target.value)}
        required
      />

      <div className="form-group">
        <label>Content</label>
        <div className="editor-wrapper">
          <ReactQuill
            ref={quillRef}
            theme="snow"
            value={content}
            onChange={setContent}
            modules={customModules}
            formats={formats}
            placeholder="Write your article content here..."
            bounds=".editor-wrapper"
          />
        </div>
      </div>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? loadingButtonText : submitButtonText}
      </Button>
    </form>
  );
}; 