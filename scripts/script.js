(function initTheme() {
  const theme = localStorage.getItem('theme');
  if (theme) {
    setTheme(theme);
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  const currentTheme = [...document.documentElement.classList]
    .find((cn) => cn.startsWith('theme-'))
    ?.replace('theme-', '') || 'auto';

  const themeButtons = [
    ...document.querySelectorAll('.themeMenuButton'),
  ];

  setActiveButton(themeButtons, currentTheme);

  themeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const chosenTheme = [...button.classList]
        .find((cn) => cn.startsWith('themeMenuButtonType'))
        .replace('themeMenuButtonType', '')
        .toLowerCase();

      setTheme(chosenTheme);
      setActiveButton(themeButtons, chosenTheme);
    });
  });
});

function setTheme(theme) {
  // Удаляем все классы, начинающиеся с theme-
  const classes = document.documentElement.classList;
  [...classes].forEach(cls => {
    if (cls.startsWith('theme-')) {
      classes.remove(cls);
    }
  });

  if (theme !== 'auto') {
    classes.add(`theme-${theme}`);
    localStorage.setItem('theme', theme);
  } else {
    localStorage.removeItem('theme');
  }
}

function setActiveButton(buttonsArray, theme) {
  buttonsArray.forEach((button) => {
    button.classList.remove('themeMenuButtonActive');
    button.removeAttribute('disabled');
  });

  if (theme === 'auto') {
    const autoButton = document.querySelector('.themeMenuButtonTypeAuto');
    if (autoButton) {
      autoButton.classList.add('themeMenuButtonActive');
      autoButton.setAttribute('disabled', true);
    }
    return;
  }

  const themeCapitalized = theme.charAt(0).toUpperCase() + theme.slice(1);
  const target = buttonsArray.find((button) =>
    button.classList.contains(`themeMenuButtonType${themeCapitalized}`)
  );

  if (target) {
    target.classList.add('themeMenuButtonActive');
    target.setAttribute('disabled', true);
  }
}