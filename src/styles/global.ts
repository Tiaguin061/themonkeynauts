import { COLORS, FONTS } from '@/theme';
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: ${FONTS.orbitron}, sans-serif;
  }

  button {
    border: none;
    background: none;
    cursor: pointer;
  }

  li {
    list-style: none;
  }

  a {
    text-decoration: none;
  }

  :root {
    font-size: 62.5%;
  }

  input {
    border: none;
    outline: 0;
  }

  body, html, #root {
    min-height: 100vh;
    width: 100%;
  }

  h1, h2, h3, h4, h5, h6, a, p, span, label, button {
    color: ${COLORS.fonts.primary};
  }

  @media(min-width: 280px) and (max-width: 1399px) {
    h1 {
      font-size: 2.4rem;
      font-weight: bold;
    }

    h2 {
      font-size: 1.2rem;
      font-weight: bold;
    }

    h3 {
      font-size: 1.1rem;
      font-weight: bold;
    }

    p, span, a, label {
      font-size: 1.2rem;
    }
  }
  
  @media(min-width: 1400px) {
    h1 {
      font-size: 2.4rem;
      font-weight: bold;
    }

    h2 {
      font-size: 1.8rem;
      font-weight: bold;
    }

    h3 {
      font-size: 1.4rem;
      font-weight: bold;
    }

    p, span, a, label {
      font-size: 1.4rem;
    }
  }
`; 