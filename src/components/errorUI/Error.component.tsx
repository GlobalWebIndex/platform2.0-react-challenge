import { Box, Typography } from '@mui/material';
import { TestIds } from '../../utils/testids';

const Error = () => {
    return (
        <Box
            data-testid={TestIds.errorContainer}
            sx={{
                flexDireciton: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Typography sx={{ margin: '24px auto', textAlign: 'center', padding: 4 }} variant="h4">
                Something went terribly wrong
            </Typography>
            <a href="/" style={{ textAlign: 'center', display: 'block' }}>
                go home
            </a>
        </Box>
    );
};

export default Error;
