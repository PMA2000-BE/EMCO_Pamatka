
// Glava.tsx
import React, { ReactNode } from 'react';
import './ui.scss';

interface GlavaProps {
  content: ReactNode; // Изменен тип на ReactNode
}

const Content: React.FC<GlavaProps> = ({ content }) => {
    return (
      <div className="container">
      <div className="page-wrapper">
        <div className="instruction-box2">
          <div className="container2">
            <div className="flex-container2">
              
                {content} {/* Используйте переданный контент */}
              </div>
            </div>
          </div>
        </div>
      </div>
      
    );
};

export default Content;