import React, { useState } from 'react';
import './ui.scss';

interface ImagebigContentProps {
  title: string;
  imageUrl: string;
}

const Imagebigcontent: React.FC<ImagebigContentProps> = ({ title, imageUrl }) => {
    const [imageSrc, setImageSrc] = useState(imageUrl);
    // Пытаемся заменить .jpg или .jpeg на .webp для оптимизации формата
  const optimizedImageUrl = imageUrl.replace(/\.(jpg|jpeg)$/i, '.webp');

  const handleError = () => {
    setImageSrc(imageUrl);
  };

    console.log("Исходный URL:", imageUrl); // логируем исходный url
  console.log("Оптимизированный URL:", optimizedImageUrl); // логируем оптимизированный url


  return (
    <div className="image-item">
      <div className="fullscreen-image-container">
        <img
          className="fullscreen-big-image"
          src={imageSrc}
          alt={title}
          loading="lazy"
            onError={handleError}
        />
      </div>
      <div className="fullscreen-color-text">
        <h1>{title}</h1>
      </div>
    </div>
  );
};

export default Imagebigcontent;