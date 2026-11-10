import React, { createContext, useContext, useState } from 'react';

export const colors = {
  primary: '#3E41F7',
  primaryDark: '#283058',
  primarySoft: '#DFE0FD',
  primaryLight: '#595CFB',
  btcGold: '#FFB721',
  btcOrange: '#FE852D',
  ethCyan: '#66BAE7',
  ethPurple: '#7066E7',
  incomeGreen: '#1DC290',
  incomeGreenSoft: '#E5FFF8',
  expenseRed: '#F53C3C',
  expenseRedSoft: '#FFE5E5',
  dark: '#1B1E26',
  white: '#FFFFFF',
  textDark: '#1B1E26',
  textMuted: '#6E6E6E',
  textLight: '#8D8D8D',
  border: '#E7E7E7',
  borderLight: '#F0F0F0',
  surface: '#FFFFFF',
  card: '#FFFFFF',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const radius = {
  sm: 8,
  md: 14,
  lg: 20,
  xl: 28,
  full: 9999,
};

export const palettes = {
  light: {
    bg: '#F9F5F5',
    surface: '#FFFFFF',
    surfaceSubtle: '#F0F4FC',
    card: '#FFFFFF',
    cardBorder: '#E7E7E7',
    text: '#1B1E26',
    subText: '#6E6E6E',
    iconColor: '#1B1E26',
    divider: '#E7E7E7',
    inputBg: '#F0F4FC',
  },
  dark: {
    bg: '#0F1117',
    surface: '#1A1D26',
    surfaceSubtle: '#222633',
    card: '#1A1D26',
    cardBorder: 'rgba(255, 255, 255, 0.08)',
    text: '#FFFFFF',
    subText: '#9E9E9E',
    iconColor: '#FFFFFF',
    divider: 'rgba(255, 255, 255, 0.12)',
    inputBg: '#222633',
  },
};

const ThemeContext = createContext({
  isDark: false,
  toggleTheme: () => {},
  theme: palettes.light,
});

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const theme = isDark ? palettes.dark : palettes.light;

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
