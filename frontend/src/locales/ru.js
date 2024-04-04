export default {
  translation: {
    languages: {
      en: 'eng',
      ru: 'рус',
    },
    loginPage: {
      username: 'Ваш ник',
      password: 'Пароль',
      logIn: 'Войти',
      invalidFeedback: 'Неверный логин или пароль (x.x)',
    },
    mainPage: {
      logOut: 'Выйти',
      messages: {
        counter: {
          count_one: '{{count}} сообщение',
          count_few: '{{count}} сообщения',
          count_many: '{{count}} сообщений',
        },
        input: 'Введите сообщение...',
      },
      channels: 'Каналы',
      modals: {
        channelName: 'Имя канала',
        addChannel: 'Добавить канал',
        removeChannel: 'Удалить канал',
        renameChannel: 'Переименовать канал',
        cancel: 'Отменить',
        send: 'Отправить',
        ensuring: 'Уверены?',
        remove: 'Удалить',
        edit: 'Переименовать',
        notUnique: 'Должно быть уникальным',
        // invalidLength: 'От 3 до 20 символов',
        // required: 'Обязательное поле',
        // notUnique: 'Должно быть уникальным',
      },
    },
    signUpPage: {
      signingUp: 'Регистрация',
      toSignUp: 'Зарегистрироваться',
      username: 'Имя пользователя',
      password: 'Пароль',
      confirmPassword: 'Подтвердите пароль',
    },
    validationFeedback: {
      invalidLength: 'От 3 до 20 символов',
      invalidPassword: 'Не менее 6 символов',
      mustMatch: 'Пароли должны совпадать',
      userExists: 'Такой пользователь уже существует',
      required: 'Обязательное поле',
    },
  },
};
