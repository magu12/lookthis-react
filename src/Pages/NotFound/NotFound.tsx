import React from 'react';
import { Button } from '../../Components/Button/Button';
import logo from '../../Assets/Images/logo.svg';
import './NotFound.scss';

export const NotFound = () => {
  return (
    <main className="not-found">
      <section className="content">
        <img src={logo} alt="logo" className="logo" />
        <div className="logo-text">lookthis</div>
        <h1>404</h1>
        <p>Oops! The page you're looking for doesn't exist.</p>
        <Button variant="link" to="/">
          Back to Home
        </Button>
      </section>
    </main>
  );
}; 