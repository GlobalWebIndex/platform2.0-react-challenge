import { Typography } from '@mui/material';

const Error = () => {
    return (
        <>
            <Typography
                sx={{ margin: '24px auto' }}
                variant="h3"
            >
                Something went terribly wrong
            </Typography>
            <a href="/">go back</a>
        </>
    );
};

export default Error;
