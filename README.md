<h1>CHAT API</h1>
<p>API чатика</p>

<p>Пока что бекенд монолитный, но по мере роста проекта все будет перенесено на микросервисы </p>
<p>Возможно закину сюда несложный фронтенд, но суть проекта заключается в написании API</p>

Аутентификация
Юзеры
Чаты

<h1>Stack</h1>

<h2>Backend: </h2>

1. Nest.JS
2. TypeScript
3. RabbitMQ
4. Redis
5. Telegram API
6. PostgreSQL
7. Sequalize (ORM)
8. SocketIO
9. Unit Testing

<h1>Запуск и установка зависимостей</h1>

<h2>Backend</h2>

Нужно иметь установленный PostgreSQL и Redis, если вы запускаете проект без докера.

```
npm i
npm run start:dev
```

<h2>Docker</h2>

```
docker-compose build
docker-compose up
```
