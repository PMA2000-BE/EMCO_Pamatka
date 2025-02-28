import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import Glava from '../Glava/glava';
import ButtonContent from '../ButtonContent/ButtonContent';
import './ui.css';

// GraphQL-запрос для получения данных о видео
const GET_POST = gql`
  query GetPost($title: String!) {
    insrucias(where: { title: { equals: $title } }) {
      title
      videos {
        title
        url {
          url
        }
      }
    }
  }
`;

const PostVideo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { title } = location.state || {};
  const trimmedTitle = title ? title.trim() : ''; // Удаляем пробелы

  const { loading, error, data } = useQuery(GET_POST, {
    variables: { title: trimmedTitle },
    skip: !trimmedTitle, // Пропускаем запрос, если заголовок не передан
  });

  if (!trimmedTitle) {
    return <p>Пост не найден. Заголовок не передан.</p>;
  }

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error.message}</p>;

  if (!data || !data.insrucias || data.insrucias.length === 0) {
    return <p>Пост не найден.</p>;
  }

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

  const videos = data.insrucias[0]?.videos || []; // Получаем массив видео

  return (
    <div className="post-video">
      <Glava title={trimmedTitle} />

      {/* Отображение списка видео */}
      <div className="video-gallery">
      
        {videos.length > 0 ? (
          videos.map((video, index) => (
            <div key={index} className="video-item">
              {/* Видеоплеер */}
              <video controls className="video-player">
                <source src={video.url.url} type="video/mp4" />
                Ваш браузер не поддерживает воспроизведение видео.
              </video>
              {/* Заголовок видео перемещен под плеер */}
              <h3 className="video-title">{video.title}</h3>
            </div>
          ))
        ) : (
          <p>Видео не найдены.</p>
        )}
      </div>
     

      {/* Кнопки навигации */}
      <ButtonContent
        activeButton="right" // Эта кнопка активна
        setActiveButton={handleSetActiveButton}
        titleLeft=""
        titleMiddle=""
        titleRight=""
        postTitle={trimmedTitle} // Передаем обрезанный заголовок
      />
    </div>
  );
};

export default PostVideo;
