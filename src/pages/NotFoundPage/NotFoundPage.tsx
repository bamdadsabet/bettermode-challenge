import paths from '@/routes/paths';
import { ArrowLeft } from '@phosphor-icons/react';
import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.scss';

const NotFoundPage: React.FC = () => {
  return (
    <div className="not-found-page">
      <h1 className="not-found-page__status">404</h1>
      <h2 className="not-found-page__title">Page not found</h2>
      <p className="not-found-page__description">Sorry, we couldn’t find the page you’re looking for.</p>
      <Link to={paths.ROOT_PATH} className="not-found-page__button">
        <ArrowLeft size={20} />
        Go back home
      </Link>
    </div>
  );
};

export default NotFoundPage;
