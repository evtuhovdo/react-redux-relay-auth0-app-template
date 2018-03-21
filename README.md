# Шаблонное приложение для разработки с использованием:
 - Auth0 для авторизаций
 - RelayModern
 - React
 - Redux

### Конфигурация:
 Скопировать файл `.env.local.dist` в `.env.local` и задать значения параметрам для Relay endpoint и Auth0 клиента.
 
 _P.S._ Можно добавлять свои параметры среды. Начинаться они должны с **REACT_APP_**. Подробнее в документации create-react-app.
 
### Использование
  - Установка зависимостей `yarn install`
  - Обновление схемы GraphQL `yarn update-schema`
  - Генерация relay `yarn relay`
  - Запуск приложения локально `yarn start`
  - Билд production `yarn build`
 


