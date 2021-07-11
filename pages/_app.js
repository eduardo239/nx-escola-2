import '../styles/reset.css';
import '../styles/globals.scss';
import '../styles/buttons.scss';
import '../styles/form.scss';
import { UserContextProvider } from '../utils/useUser';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from '../styles/globals';
import { lightTheme, darkTheme } from '../styles/theme';
import { useEffect, useState } from 'react';
import Layout from '../components/ui/Layout';
import { Button } from '../components/ui/Form';

function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    theme == 'light' ? setTheme('dark') : setTheme('light');
    theme === 'dark'
      ? window.localStorage.setItem('theme', 'light')
      : window.localStorage.setItem('theme', 'dark');
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    if (localTheme) setTheme(localTheme);
  }, []);

  return (
    <UserContextProvider>
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <GlobalStyles />
        <Layout>
          <Button primary onClick={toggleTheme}>
            Switch Theme
          </Button>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </UserContextProvider>
  );
}

export default MyApp;
