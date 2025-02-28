import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import ButtonBust from '../ButtonBust/ButtonBust';
import './ui.css'; // Убедитесь, что стили подключены

const GET_TAGS = gql`
query Tag {
  tags {
    name
  }
}`;

const TagsList = () => {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_TAGS);

  // Определение функции handleTagClick
  const handleTagClick = (tagName) => {
    // Переход к компоненту PostsByTag с переданным тегом
    navigate('/PostsByTag', { state: { tagName } });
  };

  if (loading) return <p>Загрузка тегов...</p>;
  if (error) return <p>Ошибка: {error.message}</p>;

  return (
    <div className="buttoncontainer"> {/* Добавляем здесь класс buttoncontainer */}
      {data.tags.map((tag, index) => (
        <ButtonBust 
          key={index} 
          title={tag.name} 
          onClick={() => handleTagClick(tag.name)} // Здесь используется handleTagClick
        />
      ))}
    </div>
  );
};

export default TagsList;