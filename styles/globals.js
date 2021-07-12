import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.15s linear;
  }

  a {
    font-family: var(--ss);
    color: ${({ theme }) => theme.a};
  }

  input {
    color: ${({ theme }) => theme.text};
    background-color: ${({ theme }) => theme.bg};
    border-bottom: 2px solid ${({ theme }) => theme.text}
  }

  .menu-container ul {
    background-color: ${({ theme }) => theme.bg};
  }

  .menu-container ul a {
    color: ${({ theme }) => theme.text};
  }

  .separator  {
    background-color: ${({ theme }) => theme.text};
  }
`;
