let currentTheme = {
    colors: {
      primary: '#f68b0d',
      secondary: '#b4b4b4',
      background: '#fff',
      backgroundSecondary: '#f7f7f7',
      text: '#343434',
      gray: '#777',
      grayLight: '#999',
    },
    // Otras configuraciones de tema, si es necesario
  };
  
  export const getTheme = () => currentTheme;
  
  export const updateTheme = (newTheme) => {
    currentTheme = {
      ...currentTheme,
      ...newTheme,
    };
  };