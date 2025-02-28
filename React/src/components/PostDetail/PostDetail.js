import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import Glava from '../Glava/glava';
import Content from '../Content/Content';
import ButtonContent from '../ButtonContent/ButtonContent';
import './ui.css';

// GraphQL-запрос
const GET_POST = gql`
  query GetPost($title: String!) {
    insrucias(where: { title: { equals: $title } }) {
      title
      content {
        document
      }
    }
  }
`;

const PostDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { title } = location.state || {};
  const trimmedTitle = title ? title.trim() : '';

  const { loading, error, data } = useQuery(GET_POST, {
    variables: { title: trimmedTitle },
    skip: !trimmedTitle,
  });

  if (!trimmedTitle) {
    return <p>Пост не найден. Заголовок не передан.</p>;
  }

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error.message}</p>;

  if (!data || !data.insrucias || data.insrucias.length === 0) {
    return <p>Пост не найден.</p>;
  }

  const postContent = data.insrucias[0]?.content?.document || [];

  // Рендеринг содержимого
  const renderContent = (content) => {
    if (!content || content.length === 0) {
      return <p>Нет доступного контента.</p>;
    }

    return content.map((block, index) => {
      if (!block || !block.children) return null;

      switch (block.type) {
        case 'paragraph':
          return (
            <p key={index} style={{ textAlign: block.align || 'left' }}>
              {block.children.map((child, childIndex) => renderText(child, childIndex))}
            </p>
          );

        case 'heading':
          const HeadingTag = `h${block.level || 2}`;
          return (
            <HeadingTag key={index} style={{ textAlign: block.align || 'left' }}>
              {block.children.map((child, childIndex) => renderText(child, childIndex))}
            </HeadingTag>
          );

        case 'blockquote':
          return (
            <blockquote key={index} style={{ textAlign: block.align || 'left' }}>
              {block.children.map((child, childIndex) => renderText(child, childIndex))}
            </blockquote>
          );

        case 'unordered-list':
          return (
            <ul key={index}>
              {block.children.map((listItem, listItemIndex) => (
                <li key={listItemIndex}>
                  {listItem.children.map((child, childIndex) => renderText(child, childIndex))}
                </li>
              ))}
            </ul>
          );

        case 'ordered-list':
          return (
            <ol key={index}>
              {block.children.map((listItem, listItemIndex) => (
                <li key={listItemIndex}>
                  {listItem.children.map((child, childIndex) => renderText(child, childIndex))}
                </li>
              ))}
            </ol>
          );

        case 'horizontal-rule':
          return <hr key={index} />;

        default:
          return null;
      }
    });
  };

  // Рендеринг текста
  const renderText = (child, key) => {
    if (!child || !child.text) return null;

    let textElement = child.text;

    if (child.bold) {
      textElement = <strong key={key}>{textElement}</strong>;
    }
    if (child.italic) {
      textElement = <em key={key}>{textElement}</em>;
    }
    if (child.underline) {
      textElement = <u key={key}>{textElement}</u>;
    }

    return <span key={key}>{textElement}</span>;
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
    <div className="post-detail">
      <Glava title={trimmedTitle} />
      <Content content={renderContent(postContent)} />
      <ButtonContent
        activeButton="left"
        setActiveButton={handleSetActiveButton}
        titleLeft=""
        titleMiddle=""
        titleRight=""
        postTitle={trimmedTitle}
      />
    </div>
  );
};

export default PostDetail;
