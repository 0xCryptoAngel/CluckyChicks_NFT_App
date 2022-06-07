import React, { createContext, useContext, useEffect, useState } from "react";
import { createGlobalStyle, css, ThemeProvider as ThemeProviderStyled } from "styled-components";

/**
 * Create ThemeContext
 * Context to use theme on the app
 */
export const ThemeContext = createContext();

/**
 * Api provider to manage theme
 * @param {props} props
 */
export const ThemeProvider = ({ children, ...props }) => {
  const [theme, setTheme] = useState(props.theme);

  const GlobalStyle = createGlobalStyle`

    @media (max-width: 768px) {
      /** Mozilla scrollbar*/
      * {
        scrollbar-color: #CCC !important;
        scrollbar-width: 0px !important;
      }

      /** Scrollbar for browser based on webkit */
      ::-webkit-scrollbar {
        width: 0px;
        height: 0px;
      }
      ::-webkit-scrollbar-thumb {
        background: #CCCCCC;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: #AFAFAF;
      }
      ::-webkit-scrollbar-thumb:active {
        background: #6b6b6b;
      }
      ::-webkit-scrollbar-track {
        background: rgba(204, 204, 204, 0.3);
      }
    }

    html {
      scroll-behavior: smooth;
    }

    body {
      font-family: '${theme.fonts.primary?.name || "Helvetica"}', sans-serif;
      margin: 0;
      background-color: #0A0520;
      color: ${props => props.theme.colors?.headingColor || "#000"};

      ${
        theme.rtl &&
        css`
          direction: rtl;
        `
      }
    }

    * {
      box-sizing: border-box;
    }

    input, textarea, button {
      font-family: inherit;
    }
  `;

  useEffect(() => {
    const fonts = Object.entries(theme.fonts || {});
    fonts.forEach(([name, fontFamily]) => {
      if (!window.document.getElementById(`${name}-font-styles`)) {
        const font = window.document.createElement("link");
        font.id = `${name}-font-styles`;
        font.rel = "stylesheet";
        font.async = true;
        font.defer = true;
        font.href = `https://fonts.googleapis.com/css2?family=${fontFamily.name}:wght@${fontFamily.weights.join(
          ";",
        )}&display=swap`;

        window.document.body.appendChild(font);
      }
    });
  }, [theme]);

  const update = theme => {
    setTheme(theme);
  };

  const merge = partTheme => {
    setTheme({
      ...theme,
      ...partTheme,
    });
  };

  return (
    <ThemeContext.Provider value={[theme, { update, merge }]}>
      <ThemeProviderStyled theme={theme}>
        <GlobalStyle />
        {children}
      </ThemeProviderStyled>
    </ThemeContext.Provider>
  );
};

/**
 * Hook to get theme state
 */
export const useTheme = () => {
  const themeManager = useContext(ThemeContext);
  return themeManager || [{}];
};
