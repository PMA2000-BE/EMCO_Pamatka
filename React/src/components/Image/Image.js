import React from 'react';

const Image = ({ imageUrl, altText }) => {
  return (
    <div style={{ textAlign: 'center', margin: '20px' }}>
      {imageUrl ? (
        <img 
          src={imageUrl} 
          alt={altText} 
          style={{ maxWidth: '100%', height: 'auto' }} 
        />
      ) : (
        <p>Изображение не доступно</p>
      )}
    </div>
  );
};

export default Image;