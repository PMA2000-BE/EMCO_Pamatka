import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

// Определите GraphQL-мутацию для создания поста
const CREATE_POST = gql`
  mutation CreatePost($title: String!) {
    createPost(data: { title: $title }) {
      id
      title
    }
  }
`;

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [createPost, { loading, error }] = useMutation(CREATE_POST);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPost({ variables: { title } });
      setTitle(''); // Очистить поле ввода после успешной отправки
      alert('Пост успешно создан!');
    } catch (err) {
      console.error(err);
      alert('Ошибка при создании поста: ' + err.message);
    }
  };

  return (
    <div>
      <h1>Создать новый пост</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Введите заголовок поста"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Создание...' : 'Создать пост'}
        </button>
      </form>
      {error && <p>Ошибка: {error.message}</p>}
    </div>
  );
};

export default CreatePost;
