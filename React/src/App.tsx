import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import NavigationButtons from './components/NavigationButtons/NavigationButtons';
import PostDetail from './components/PostDetail/PostDetail';
import PostImage from './components/PostImage/PostImage';
import PostVideo from './components/PostVideo/PostVideo';
import PostsByTag from './components/GetProblemByTag/GetProblemByTag';
import './styles.css';

const App: React.FC = () => {
  const [activeButton, setActiveButton] = useState<string>('left');

  // Реальные заголовки постов для навигации
  const postTitles = ['Post 1', 'Post 2', 'Post 3'];

  // Обработчик для кнопки
  const handleButtonClick = () => {
    console.log('Кнопка нажата!');
  };

  return (
    <Router>
      <Navbar />
      <div className="app-container">
        <Routes>
          {/* Главная страница */}
          <Route path="/" element={<Home />} />
          {/* Навигационные кнопки */}
          <Route
            path="/navigation"
            element={
              <NavigationButtons
                postTitles={postTitles} // Передаём заголовки для кнопок
              />
            }
          />
          {/* Посты по тегам */}
          <Route path="/PostsByTag" element={<PostsByTag />} />
          {/* Страницы деталей постов */}
          <Route path="/PostDetail" element={<PostDetail />} />
          <Route path="/PostImage" element={<PostImage />} />
          <Route path="/PostVideo" element={<PostVideo />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
