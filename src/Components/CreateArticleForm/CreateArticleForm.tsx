import React, { useState, useCallback, useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import { postsApi } from '../../api/posts';
import { useNavigate } from 'react-router-dom';
import './CreateArticleForm.scss';

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

export const CreateArticleForm: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setMainImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = useCallback(async (file: File): Promise<string> => {
    try {
      const imageUrl = await postsApi.uploadContentImage(file);
      return imageUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw new Error('Failed to upload image');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (!mainImage) {
        throw new Error('Main image is required');
      }

      await postsApi.createPost(
        title,
        shortDescription,
        content,
        mainImage
      );

      // Redirect to home page or article list after successful creation
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create article');
    } finally {
      setIsLoading(false);
    }
  };

  // Custom image handler for ReactQuill
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
          
          // Get the Quill editor instance
          const quill = (document.querySelector('.ql-editor') as any)?.getEditor();
          const range = quill?.getSelection(true);
          
          // Insert the image
          quill?.insertEmbed(range?.index, 'image', imageUrl);
          // Move cursor after image
          quill?.setSelection((range?.index || 0) + 1);
        } catch (err) {
          console.error('Error uploading content image:', err);
          setError('Failed to upload content image');
        }
      }
    };
  };

  // Update modules to include custom image handler
  const customModules = useMemo(() => ({
    toolbar: {
      container: modules.toolbar.container,
      handlers: {
        image: imageHandler
      }
    }
  }), [imageHandler]);

  return (
    <form className="create-article-form" onSubmit={handleSubmit}>
      {error && <div className="error-message">{error}</div>}
      
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
          required
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
            theme="snow"
            value={content}
            onChange={setContent}
            modules={customModules}
            formats={formats}
            placeholder="Write your article content here..."
          />
        </div>
      </div>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Creating...' : 'Create Article'}
      </Button>
    </form>
  );
}; 