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
    box-shadow: var(--shadow-2);
  }

  a {
    color: ${({ theme }) => theme.primary};
  }

  .primary {
    color: ${({ theme }) => theme.primary};
  }
  
  .secondary {
    color: ${({ theme }) => theme.secondary};
  }

  .white {
    color: ${({ theme }) => theme.white};
  }
  
  .black80 {
    color: ${({ theme }) => theme.black80};
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
      background-color: ${({ theme }) => theme.bg};
      color: ${({ theme }) => theme.black80};
      outline-color: ${({ theme }) => theme.white};
      cursor: not-allowed;
      & svg {
        fill: ${({ theme }) => theme.black80};
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

  .button-link--primary {
    color:  ${({ theme }) => theme.primary};
    background-color: transparent;
    border: 1px solid transparent;
     & svg {
      fill: ${({ theme }) => theme.primary};
    }
    &:focus {
      border-color: ${({ theme }) => theme.primaryActive};
      box-shadow: inset 0 0 0 1px ${({ theme }) => theme.primaryActive},
        inset 0 0 0 2px var(--white);
    }
  }

  .button-link--secondary {
    color:  ${({ theme }) => theme.secondary};
    background-color: transparent;
    border: 1px solid transparent;
     & svg {
      fill: ${({ theme }) => theme.secondary};
    }
    &:focus {
      border-color: ${({ theme }) => theme.secondaryActive};
      box-shadow: inset 0 0 0 1px ${({ theme }) => theme.secondaryActive},
        inset 0 0 0 2px var(--white);
    }
  }
  
  .button-link--white {
    color:  ${({ theme }) => theme.black};
    background-color: transparent;
    border: 1px solid transparent;
     & svg {
      fill: ${({ theme }) => theme.black};
    }
    &:focus {
      border-color: ${({ theme }) => theme.black};
      box-shadow: inset 0 0 0 1px ${({ theme }) => theme.black},
        inset 0 0 0 2px ${({ theme }) => theme.black};
    }
  }

  .button-outline--primary {
    color:  ${({ theme }) => theme.primary};
    background-color: transparent;
    border: 1px solid ${({ theme }) => theme.primary};
     & svg {
      fill: ${({ theme }) => theme.primary};
    }
    &:focus {
      border-color: ${({ theme }) => theme.primaryActive};
      box-shadow: inset 0 0 0 1px ${({ theme }) => theme.primaryActive},
        inset 0 0 0 2px var(--white);
    }
    &:active {
      color: ${({ theme }) => theme.primaryActive};
       box-shadow: inset 0 0 0 1px ${({ theme }) => theme.primaryActive};
    }
  }
  
  .button-outline--secondary {
    color:  ${({ theme }) => theme.secondary};
    background-color: transparent;
    border: 1px solid ${({ theme }) => theme.secondary};
     & svg {
      fill: ${({ theme }) => theme.secondary};
    }
    &:focus {
      border-color: ${({ theme }) => theme.secondaryActive};
      box-shadow: inset 0 0 0 1px ${({ theme }) => theme.secondaryActive},
        inset 0 0 0 2px var(--white);
    }
    &:active {
      color: ${({ theme }) => theme.secondaryActive};
       box-shadow: inset 0 0 0 1px ${({ theme }) => theme.secondaryActive};
    }
  }
  .button-outline--white {
    color:  ${({ theme }) => theme.black};
    background-color: transparent;
    border: 1px solid ${({ theme }) => theme.black};
     & svg {
      fill: ${({ theme }) => theme.black};
    }
    &:focus {
      border-color: ${({ theme }) => theme.black};
      box-shadow: inset 0 0 0 1px ${({ theme }) => theme.black},
        inset 0 0 0 2px var(--white);
    }
    &:active {
      color: ${({ theme }) => theme.secondaryActive};
       box-shadow: inset 0 0 0 1px ${({ theme }) => theme.secondaryActive};
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
    color: var(--white);
    background-color: ${({ theme }) => theme.primary};
  }

  .table-row td {
    border-bottom: 1px solid ${({ theme }) => theme.border};
  }
// NORMAL
  .message {
    p {
      color: ${({ theme }) => theme.text};
    }
  }
  .message-info {
    color: ${({ theme }) => theme.black80};
    border: 1px solid ${({ theme }) => theme.black20};
  }

  .modal-body {
    color: ${({ theme }) => theme.text};
    background-color: ${({ theme }) => theme.white};
    border-bottom: 2px solid ${({ theme }) => theme.text};
  }
  
  .navbar-nav ul > li a, .navbar-nav ul > li button {
    font-size: 0.75rem;
    color: ${({ theme }) => theme.text};
    background-color: ${({ theme }) => theme.white};
    border-bottom: 1px solid ${({ theme }) => theme.border};
  }

  .dash, .navbar-nav ul {
    background-color: ${({ theme }) => theme.white};
    color: ${({ theme }) => theme.text};
  }

    .subject-header {
      background-color: ${({ theme }) => theme.text};
      color: ${({ theme }) => theme.bg};
    }

  // DISABLED
  input:disabled,
  textarea:disabled {
    background-color: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.black80};
    border-bottom: 2px solid ${({ theme }) => theme.secondary};
  }
`;
