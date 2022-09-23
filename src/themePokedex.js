import { createTheme } from "@mui/material/styles";

const themePokedex = createTheme({
    palette: {
        rojo: {
            light: '#D55E5E',
            main: '#D93F3F',
            dark: '#C42424',
            contrastText: '#ffffff'
        }
    },
});

export default themePokedex