import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';

import {
  text,
  relationship,
  password,
  timestamp,
  image,
  file,
} from '@keystone-6/core/fields';

import { document } from '@keystone-6/fields-document';

import { type Lists } from '.keystone/types';

export const lists = {
  User: list({
    access: allowAll,
ui: { 
  isHidden: false, 
  label: 'Пользователь', // Здесь вы задаете пользовательское название 
},
    fields: {
      name: text({ validation: { isRequired: true } }),
      email: text({
        validation: { isRequired: true },
        isIndexed: 'unique',
      }),
      password: password({ validation: { isRequired: true } }),
      posts: relationship({ ref: 'Post.author', many: true }),
      instrucias: relationship({ ref: 'Insrucia.author', many: true }),
      createdAt: timestamp({
        defaultValue: { kind: 'now' },
      }),
    },
  }),

  Post: list({
    access: allowAll,
  
  
ui: { 
  isHidden: true, 
  label: 'Посты', // Здесь вы задаете пользовательское название 
},
    fields: {
      title: text({ validation: { isRequired: true } }),
      content: document({
        formatting: {
          headingLevels: [2, 3], // Заголовки уровня H2 и H3
          blockTypes: {
            blockquote: true, // Цитаты
          },
          inlineMarks: {
            bold: true, // Жирный текст
            italic: true, // Курсив
          },
          alignment: {
            center: true, // Центрирование текста
          },
          listTypes: {
            ordered: true, // Нумерованные списки
            unordered: true, // Маркированные списки
          },
        },
        layouts: [[1]], // Одноколоночный макет
      }),
      author: relationship({
        ref: 'User.posts',
        ui: {
          displayMode: 'cards',
          cardFields: ['name', 'email'],
          inlineEdit: { fields: ['name', 'email'] },
          linkToItem: true,
          inlineConnect: true,
        },
        many: false,
      }),
      tags: relationship({
        ref: 'Tag.posts',
        many: true,
        ui: {
          displayMode: 'cards',
          cardFields: ['name'],
          inlineEdit: { fields: ['name'] },
          linkToItem: true,
          inlineConnect: true,
          inlineCreate: { fields: ['name'] },
        },
      }),
    },
  }),

  Insrucia: list({
    access: allowAll,
    
ui: { 
  isHidden: false, 
  label: 'Инструкции', // Здесь вы задаете пользовательское название 
},
    fields: {
      title: text({ validation: { isRequired: true } }),

      content: document({
        formatting: {
          headingLevels: [2, 3], // Заголовки уровня H2 и H3
          inlineMarks: {
            bold: true, // Жирный текст
            italic: true, // Курсив
          },

    }}),
        
      images: relationship({
        ref: 'Image.instrucias',
        many: true,
        ui: {
          displayMode: 'cards',
          cardFields: ['title'],
          inlineCreate: { fields: ['title', 'url'] },
        },
      }),

      videos: relationship({
        ref: 'Video.instrucias',
        many: true,
        ui: {
          displayMode: 'cards',
          cardFields: ['title'],
          inlineCreate: { fields: ['title', 'url'] },
        },
      }),

      author: relationship({
        ref: 'User.instrucias',
        ui: {
          displayMode: 'cards',
          cardFields: ['name', 'email'],
          inlineEdit: { fields: ['name', 'email'] },
          linkToItem: true,
          inlineConnect: true,
        },
        many: false,
      }),

      tags: relationship({
        ref: 'Tag.instrucias',
        many: true,
        ui: {
          displayMode: 'cards',
          cardFields: ['name'],
          inlineEdit: { fields: ['name'] },
          linkToItem: true,
          inlineConnect: true,
          inlineCreate: { fields: ['name'] },
        },
      }),
    },
  }),

  Image: list({
    access: allowAll,
    ui: {
      isHidden: false,
      label: 'Фото',
    },
    fields: {
      title: text({ validation: { isRequired: true } }),
      url: image({ storage: 'images' }),
      instrucias: relationship({ ref: 'Insrucia.images', many: true }),
    },
  }),

  Video: list({
    access: allowAll,
    

    ui: {

      isHidden: false, // Изменено на false, чтобы администраторы могли видеть видео
      label: 'Видео', 

    },
    fields: {
      title: text({ validation: { isRequired: true } }),
      url: file({ storage: 'videos' }),
      instrucias: relationship({
        ref: 'Insrucia.videos',
        many: true,
      }),
    },
  }),

  Tag: list({
    access: allowAll,
    

    ui: {

      isHidden: false, // Сделано видимым для удобства администраторов
      label: 'Тег', 

    },
    fields: {
      name: text(),
      posts: relationship({ ref: 'Post.tags', many: true }),
      instrucias: relationship({ ref: 'Insrucia.tags', many: true }),
    },
  }),
} satisfies Lists;
