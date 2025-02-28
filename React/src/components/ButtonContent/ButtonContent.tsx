import React from 'react';
import { useNavigate } from 'react-router-dom';
import './xui.scss';

interface Button4Props {
  activeButton: string;
  setActiveButton: (buttonName: string) => void;
  titleLeft: string;
  titleMiddle: string;
  titleRight: string;
  postTitle: string; 
}

const ButtonContent: React.FC<Button4Props> = ({
  activeButton,
  setActiveButton,
  titleLeft,
  titleMiddle,
  titleRight,
  postTitle,
}) => {
  const navigate = useNavigate();

  const handleClick = (buttonName: string, page: string) => {
    if (activeButton === buttonName) return;
    setActiveButton(buttonName);
    navigate(page, { state: { title: postTitle } });
  };

  return (
    <div className="btn-group">
      <div className="btn-wrapper">
        <button
          className={`btn ${activeButton === 'left' ? 'btn-active' : ''}`}
          onClick={() => handleClick('left', '/PostDetail')}
          
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-card-text" viewBox="0 0 16 16">
  <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z"/>
  <path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8m0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5"/>
</svg>
          {titleLeft}
        </button>
      </div>
      <div className="btn-wrapper">
        <button
          className={`btn ${activeButton === 'middle' ? 'btn-active' : ''}`}
          
          onClick={() => handleClick('middle', '/PostImage')} >
            
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-images" viewBox="0 0 16 16">
  <path d="M4.502 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"/>
  <path d="M14.002 13a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2V5A2 2 0 0 1 2 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-1.998 2M14 2H4a1 1 0 0 0-1 1h9.002a2 2 0 0 1 2 2v7A1 1 0 0 0 15 11V3a1 1 0 0 0-1-1M2.002 4a1 1 0 0 0-1 1v8l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71a.5.5 0 0 1 .577-.094l1.777 1.947V5a1 1 0 0 0-1-1z"/>
</svg>
          {titleMiddle}
        </button>
      </div>
      <div className="btn-wrapper">
        <button
          className={`btn ${activeButton === 'right' ? 'btn-active' : ''}`}
          onClick={() => handleClick('right', '/PostVideo')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-camera-video-fill" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2z"/>
</svg>
          {titleRight}
        </button>
      </div>
    </div>
  );
};

export default ButtonContent;