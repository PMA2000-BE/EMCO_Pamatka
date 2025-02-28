// Glava.tsx
import React from 'react';
import './ui.scss';

interface GlavaProps {
  title: string; // Определите тип для пропса title
}

const Glava: React.FC<GlavaProps> = ({ title }) => {
    return (
        <div className="header-box2">
            <h1>{title}</h1> {/* Используйте переданный заголовок */}
        </div>
    );
};

export default Glava;