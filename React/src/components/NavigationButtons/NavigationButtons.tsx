import React from 'react';
import { useNavigate } from 'react-router-dom';
import './xui.scss'; // Убедитесь, что путь к вашему CSS файлу указан верно

// Определяем тип для пропсов
interface NavigationButtonsProps {
  postTitles: string[]; // Массив строк с названиями постов
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({ postTitles }) => {
  const navigate = useNavigate();

  const handleNavigation = (page: string) => {
    navigate(page);
  };

  return (
    <div className="btn-group">
      {postTitles.map((title, index) => (
        <div key={index} className="btn-wrapper">
          <button
            className="btn"
            onClick={() => handleNavigation(`/PostDetail1?title=${encodeURIComponent(title)}`)}
          >
            {title}
          </button>
        </div>
      ))}
    </div>
  );
};

export default NavigationButtons;
