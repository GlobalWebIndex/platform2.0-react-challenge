import styled from '@emotion/styled';
import { Grid } from '@mui/material';

const StyledImageGrid = styled(Grid)({
    display: 'grid',
    justifyContent: 'center',
    alignItems: 'center',
    gridTemplateColumns: 'repeat(auto-fill, 200px)',
    gap: '20px',
    padding: '20px 40px',
});

const ImageGrid = () => {
    return <StyledImageGrid></StyledImageGrid>;
};

export default ImageGrid;
