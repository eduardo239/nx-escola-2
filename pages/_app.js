import { useEffect, useState } from 'react';
import { UserContextProvider } from '../utils/useUser';
import { CourseContextProvider } from '../utils/useCourse';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from '../styles/globals';
import Layout from '../components/ui/Layout';
import '../styles/reset.css';
import '../styles/globals.scss';
import '../styles/buttons.scss';
import '../styles/form.scss';
import { lightTheme, darkTheme } from '../styles/theme';

function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = (theme) => {
    theme === 'dark'
      ? window.localStorage.setItem('theme', 'light')
      : window.localStorage.setItem('theme', 'dark');

    theme == 'light' ? setTheme('dark') : setTheme('light');
  };

  useEffect(() => {
    let localTheme = window.localStorage.getItem('theme');
    if (localTheme) setTheme(localTheme);
  }, []);

  return (
    <UserContextProvider>
      <CourseContextProvider>
        <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
          <GlobalStyles />
          <Layout toggleTheme={toggleTheme} theme={theme}>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </CourseContextProvider>
    </UserContextProvider>
  );
}

export default MyApp;
