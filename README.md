
Инструкция для запуска сайта.
1.	Для работы нужно установить:
 Node.js

 Visual Studio Code (или любой другой редактор)
 
2.	Данные о проекте.
Приложение использует следующие библиотеки: React, Bootstrap, ApolloClient.
В качестве базы данных используется Keystone.js
Для связи React с Keystone используется ApolloClient.
В качестве языка запросов используется mysql.

3.	Установка.
   
Так как проект разделен на два приложения базу данных и приложение react необходимо:

3.1. Установить зависимости в Keystone и React командой npm install.

3.2. Поменять IP адреса в файлах Apollo Client (React)
```
  uri: 'http://Поменяйте айпи здесь:3000/api/graphql',
 на необходимый и в Keystone, в файле keystone.ts
const baseUrl = process.env.BASE_URL || 'http://Поменяйте айпи здесь:3001';
```
Настройки CORS разрешены все подключения, при необходимости установить необходимые IP адреса в файле keystone.ts
```
  cors: {
      origin: '*', 
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE'], 
      allowedHeaders: ['Content-Type', 'Authorization'],
    },
  },
```

4.	Запуск самой программы.
   
4.1.	Keystone запускается командой
```
npm run dev
```
4.2.	React часть запускается командой 
```
npm run start
```
Первым мы запускаем Keystone потом React.

5.	Веб- приложение
   
Для веб-приложение нужно обязательно выполнить команду
```
npm build
```
Настройки находятся public/manifest.json



