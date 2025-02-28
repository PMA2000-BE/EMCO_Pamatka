import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useLocation } from 'react-router-dom'; // Удаляем navigate, так как он не нужен в этом компоненте
import ButtonPost from '../ButtonPost/ButtonPost'; // Импортируем новый компонент кнопки
import Glava from '../Glava/glava'; 
import './ui.css';

const GET_POSTS = gql`
  query GetInstruciasByTag($tagName: String!) {
    insrucias(where: { tags: { some: { name: { equals: $tagName } } } }) {
      id
      title
    }
  }
`;

const PostsByTag = () => {
  const location = useLocation();
  const { tagName } = location.state || {}; // Получаем tagName из location.state

  const { loading, error, data } = useQuery(GET_POSTS, {
    variables: { tagName: tagName || '' },
  });

  if (!tagName) {
    return <p>Тег не найден.</p>;
  }

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error.message}</p>;

  if (!data || !data.insrucias || data.insrucias.length === 0) {
    return <p>Нет постов с этим тегом.</p>;
  }

  return (
    <div>
      <Glava title={tagName} />
      <div className="buttoncontainer">
        {data.insrucias.map((insrucias) => (
          <ButtonPost 
            key={insrucias.id} 
            title={insrucias.title} 
            route={`/PostDetail`} // Динамически создаем путь для каждой кнопки
            postTitle={insrucias.title} // Передаем заголовок поста
          />
        ))}
      </div>
    </div>
  );
};

export default PostsByTag;