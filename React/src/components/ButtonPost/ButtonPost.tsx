import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button'; // Используем Bootstrap для стилизации кнопки
import './ui.scss';  

interface ButtonPostProps {
  title: string; // Заголовок кнопки
  route: string; // Путь для перенаправления
  postTitle: string; // Заголовок поста для передачи
}

const ButtonPost: React.FC<ButtonPostProps> = ({ title, route, postTitle }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(route, { state: { title: postTitle } }); // Переход на указанную страницу с заголовком
  };

  return (
    <div className="button-container2">
      <div className="button-row2">
    <Button className="button2" onClick={handleClick}>
      {title}
    </Button>
    </div>
    </div>
  );
};

export default ButtonPost;