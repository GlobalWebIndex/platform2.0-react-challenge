import { Box, Rating, Typography } from '@mui/material';
import { getCatInfo } from '../../../../utils/helpers';
import { Cat } from '../../../../utils/models';
import { sxBox } from './Stats.styled';

interface StatsProps {
    selectedCat: Cat | null;
}

const Stats: React.FC<StatsProps> = ({ selectedCat }) => {
    return (
        <Box sx={sxBox}>
            {selectedCat?.breeds ? (
                getCatInfo(selectedCat?.breeds[0]).stats.map((item) => (
                    <div key={item.name}>
                        <Typography
                            component="legend"
                            sx={{ textAlign: 'center' }}
                        >
                            {item.name}
                        </Typography>
                        <Rating
                            value={item.value}
                            readOnly
                        />
                    </div>
                ))
            ) : (
                <h3>Info not available for this beauty!</h3>
            )}
        </Box>
    );
};

export default Stats;
