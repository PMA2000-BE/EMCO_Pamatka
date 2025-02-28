import React from 'react';
import { useQuery, gql } from '@apollo/client';

// Определите GraphQL-запрос для получения заголовков постов
const GET_POSTS = gql`
{
  posts {
    title
  }
}

`;

const Posts = () => {
  const { loading, error, data } = useQuery(GET_POSTS);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error.message}</p>;

  if (!data || !data.posts) {
    return <p>Нет данных для отображения.</p>;
  }

  return (
    <div>
      <h1>Заголовки постов</h1>
      <ul>
        {data.posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;