// формат коммита:
// feat(scope): description
module.exports = {
  rules: {
    'body-leading-blank': [2, 'always'],
    'body-max-line-length': [2, 'always', 100],
    'footer-leading-blank': [2, 'always'],
    'footer-max-line-length': [2, 'always', 100],
    'header-max-length': [2, 'always', 100],
    'header-full-stop': [2, 'never', '.'],
    'subject-empty': [2, 'never'],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      [
        'feat', // нова фіча
        'fix', // баг фікс
        'refactor', // Рефакторинг кода
        'chore', // зміна файлів які не є частиною проекту, наприклад бібліотека
        'docs', // зміни до документіції
      ],
    ],
  },
};
