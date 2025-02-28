import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import Glava from '../Glava/glava';
import ButtonContent from '../ButtonContent/ButtonContent';
import Imagebigcontent from '../Imagebigcontent/Imagebigcontent';
import './ui.css';

const GET_POST = gql`
  query GetPost($title: String!) {
    insrucias(where: { title: { equals: $title } }) {
      title
      images {
        title
        url {
          url
        }
      }
    }
  }
`;

const PostImage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Получаем заголовок и удаляем лишние пробелы
  const { title } = location.state || {};
  const trimmedTitle = title ? title.trim() : ''; // Удаляем пробелы

  // Вызываем useQuery всегда, передавая оба аргумента
  const { loading, error, data } = useQuery(GET_POST, {
    variables: { title: trimmedTitle },
    skip: !trimmedTitle,
  });

  if (!trimmedTitle) {
    return <p>Пост не найден. Заголовок не передан.</p>;
  }

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error.message}</p>;

  const instruction = data?.insrucias?.[0];

  if (!instruction || !instruction.images || instruction.images.length === 0) {
    return <p>Изображения не найдены.</p>;
  }

  const renderImageRows = () => {
    const rows = [];
    if (instruction.images) {
      for (let i = 0; i < instruction.images.length; i += 2) {
         // Выводим в консоль значение url
          console.log("instruction.images[i]?.url?.url:", instruction.images[i]?.url?.url);

        const row = (
          <div className="image-row" key={i}>
            <Imagebigcontent
              title={instruction.images[i]?.title || 'Изображение'}
              imageUrl={instruction.images[i]?.url?.url || ''}
            />
            {instruction.images[i + 1] && (
              <Imagebigcontent
                title={instruction.images[i + 1]?.title || 'Изображение'}
                imageUrl={instruction.images[i + 1]?.url?.url || ''}
              />
            )}
          </div>
        );
        rows.push(row);
      }
    }
    return rows;
  };

  const handleSetActiveButton = (buttonName) => {
    switch (buttonName) {
      case 'left':
        navigate('/PostDetail', { state: { title: trimmedTitle } });
        break;
      case 'middle':
        navigate('/PostImage', { state: { title: trimmedTitle } });
        break;
      case 'right':
        navigate('/PostVideo', { state: { title: trimmedTitle } });
        break;
      default:
        break;
    }
  };

  return (
    <div className="">
      <Glava title={trimmedTitle} />
      {renderImageRows()}
      <ButtonContent
        activeButton="middle"
        setActiveButton={handleSetActiveButton}
        titleLeft=""
        titleMiddle=""
        titleRight=""
        postTitle={trimmedTitle}
      />
    </div>
  );
};

export default PostImage;