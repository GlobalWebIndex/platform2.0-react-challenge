import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    // palette: { mode: 'dark' },
    components: {
        MuiList: {
            styleOverrides: {
                root: {
                    paddingTop: 0,
                    paddingBottom: 0,
                },
            },
        },
    },
});

export default theme;
