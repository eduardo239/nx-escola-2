import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.15s linear;
  }

  .bg-section {
    background-color: ${({ theme }) => theme.white};
    min-height: 100vh;
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

  .field--radio, .list-item {
   border: 1px solid ${({ theme }) => theme.border};
  }

  .button, .button-icon, .icon-button {
    &:disabled {
      background-color: ${({ theme }) => theme.black80};
      color: ${({ theme }) => theme.black20};
      outline-color: ${({ theme }) => theme.black80};
      cursor: not-allowed;
      & svg {
        fill: ${({ theme }) => theme.black20};
      }
      &:hover {
        filter: brightness(100%);
      }
    }
  }
 
  .button--primary, .button-icon--primary, .icon-button--primary {
    color: var(--white);
    background-color: ${({ theme }) => theme.primary};
    border: 1px solid transparent;
     & svg {
      fill: var(--white);
    }
    &:focus {
      border-color: ${({ theme }) => theme.primaryActive};
      box-shadow: inset 0 0 0 1px ${({ theme }) => theme.primaryActive},
        inset 0 0 0 2px var(--white);
    }
    &:active {
      background-color: ${({ theme }) => theme.primaryActive};
    }
  }

  .button--secondary, .button-icon--secondary, .icon-button--secondary {
    color: var(--white);
    background-color: ${({ theme }) => theme.secondary};
    border: 1px solid transparent;
     & svg {
      fill: var(--white);
    }
    &:focus {
      border-color: ${({ theme }) => theme.secondaryActive};
      box-shadow: inset 0 0 0 1px ${({ theme }) => theme.secondaryActive},
        inset 0 0 0 2px var(--white);
    }
    &:active {
      background-color: ${({ theme }) => theme.secondaryActive};
    }
  }

  .button--danger, .button-icon--danger, .icon-button--danger {
    color: var(--white);
    background-color: ${({ theme }) => theme.danger};
    border: 1px solid transparent;
     & svg {
      fill: var(--white);
    }
    &:focus {
    border-color: ${({ theme }) => theme.dangerActive};
      box-shadow: inset 0 0 0 1px ${({ theme }) => theme.dangerActive},
        inset 0 0 0 2px var(--white);
    }
    &:active {
      background-color: ${({ theme }) => theme.dangerActive};
    }
  }

  .menu-header {
    background-color: ${({ theme }) => theme.primary};

  }
  .menu-container ul {
    background-color: ${({ theme }) => theme.bg};
  }

  .menu-container ul a {
    color: ${({ theme }) => theme.text};
  }

  .separator,
  .spinner__center > div  {
    background-color: ${({ theme }) => theme.primary};
  }

  .question--header {
    background-color: ${({ theme }) => theme.text};
  }
  .question--header > * {
    color: ${({ theme }) => theme.body};
  }

  .table-header th {
    color: ${({ theme }) => theme.white};
    background-color: ${({ theme }) => theme.primary};
  }

  .table-row td {
    border: 1px solid ${({ theme }) => theme.border};
  }
// NORMAL
  .modal-body {
    color: ${({ theme }) => theme.text};
    background-color: ${({ theme }) => theme.white};
    border-bottom: 2px solid ${({ theme }) => theme.text};
  }
`;
