import '../styles/globals.css';
import { UserContextProvider } from '../utils/useUser';
import Layout from '../components/ui/Layout';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from '../styles/globals';
import { lightTheme, darkTheme } from '../styles/theme';
import { useState } from 'react';

function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    theme == 'light' ? setTheme('dark') : setTheme('light');
  };

  return (
    <UserContextProvider>
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <GlobalStyles />
        <Layout>
          <button onClick={toggleTheme}>Switch Theme</button>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </UserContextProvider>
  );
}

export default MyApp;
