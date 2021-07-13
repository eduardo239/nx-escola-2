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

  input, select, textarea {
    color: ${({ theme }) => theme.text};
    background-color: ${({ theme }) => theme.bg};
    border-bottom: 2px solid ${({ theme }) => theme.text}
  }

  .field label, label {
    color: ${({ theme }) => theme.text};
  }

  .field--radio {
   border: 1px solid ${({ theme }) => theme.border};
  }

  .button--secondary {
    color: ${({ theme }) => theme.text};
    background-color: ${({ theme }) => theme.bg};
    border-bottom: 2px solid ${({ theme }) => theme.text};
    &:focus {
      border-color: var(--secondary-active);
      box-shadow: inset 0 0 0 1px var(--secondary-active),
        inset 0 0 0 2px var(--white);
    }
    &:active {
      background-color: var(--secondary-active);
    }
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
