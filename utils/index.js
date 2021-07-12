/**
 * @param {String} theme 'light' || 'dark'
 */
export const toggleTheme = (theme, setTheme) => {
  theme === 'dark'
    ? window.localStorage.setItem('theme', 'light')
    : window.localStorage.setItem('theme', 'dark');

  // theme == 'light' ? setTheme('dark') : setTheme('light');
  if (theme === 'light') {
    return 'dark';
  } else {
    return 'light';
  }
};
