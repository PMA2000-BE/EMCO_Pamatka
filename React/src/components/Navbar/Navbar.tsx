import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Импорт JS bootstrap
import './ui.scss';

const Navbar: React.FC = () => {
  const [bgClass, setBgClass] = useState('bg-default');
  const [textColor, setTextColor] = useState('black'); // Состояние для цвета текста
  const instructionsLink = 'http://localhost:3000/signin';

  // Функция для смены цвета текста
  const toggleTextColor = () => {
    setTextColor((prevColor) => (prevColor === 'black' ? 'red' : 'black')); // Меняем цвет между черным и красным
  };

  return (
    <nav className={`navbar navbar-expand-lg ${bgClass}`}>
      <div className="container-fluid">
        {/* Логотип */}
        <Link className="navbar-brand" to="/">
          <img src="images/emco_logo_4 (1).png" alt="" />
        </Link>

        {/* Кнопка для мобильного меню */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Меню */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">Главная</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link btn btn-primary" href={instructionsLink} target="_blank" rel="noopener noreferrer">Панель администратора</a>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              {/* Используем текущее состояние цвета текста */}
              <h4 style={{ color: textColor }} onClick={toggleTextColor}>
                <b>номер поддержки: +7-918-820-07-29</b>
              </h4>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;