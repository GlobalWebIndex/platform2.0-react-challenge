import styled from '@emotion/styled';
import theme from '../../styles/theme';

export const SkeletonImage = styled('div')({
    '@keyframes pulsate': {
        to: {
            backgroundPositionX: '-200%',
        },
    },
    animation: 'pulsate 0.8s infinite linear',
    background: 'linear-gradient(100deg, #d1d1d1 8%, #cccccc 18%, #d1d1d1 33%)',
    height: '100%',
    backgroundSize: '200% 100%',
});

export const SkeletonTitle = styled('div')({
    '@keyframes pulsate': {
        to: {
            backgroundPositionX: '-200%',
        },
    },
    animation: 'pulsate 0.8s infinite linear',
    background: 'linear-gradient(100deg, #d1d1d1 8%, #cccccc 18%, #d1d1d1 33%)',
    height: 16,
    backgroundSize: '200% 100%',
    width: 120,
    margin: '0 auto',
    marginBottom: theme.spacing(1),
    borderRadius: 4,
});
