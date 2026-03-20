(function initTheme() {
  const theme = localStorage.getItem('theme');
  if (theme) {
    setTheme(theme);
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  const currentTheme = [...document.documentElement.classList]
    .find((cn) => cn.startsWith('theme-'))
    ?.replace('theme-', '');

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
  document.documentElement.className = '';
  document.documentElement.classList.add(`theme-${theme}`);
  localStorage.setItem('theme', theme);
}

function setActiveButton(buttonsArray, theme) {
  buttonsArray.forEach((button) => {
    button.classList.remove('themeMenuButtonActive');
    button.removeAttribute('disabled');
  });

  const themeCapitalized =
    theme.charAt(0).toUpperCase() + theme.slice(1);

  const target = buttonsArray.find((button) =>
    button.classList.contains(
      `themeMenuButtonType${themeCapitalized}`
    )
  );

  if (target) {
    target.classList.add('themeMenuButtonActive');
    target.setAttribute('disabled', true);
  } else {
    const autoButton = document.querySelector(
      '.themeMenuButtonTypeAuto'
    );
    autoButton.classList.add('themeMenuButtonActive');
    autoButton.setAttribute('disabled', true);
  }
}