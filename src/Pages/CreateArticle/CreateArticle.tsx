import React from 'react';
import './CreateArticle.scss';
import { CreateArticleForm } from '../../Components/CreateArticleForm/CreateArticleForm';

const CreateArticle: React.FC = () => {
  return (
    <main className="create-article">
      <section className="wrap">
        <h1>Create New Article</h1>
        <p>Share your thoughts with the world</p>
        
        <CreateArticleForm />
      </section>
    </main>
  );
};

export default CreateArticle; 