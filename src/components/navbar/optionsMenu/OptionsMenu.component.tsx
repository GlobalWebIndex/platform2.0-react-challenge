import { ListItemIcon, Menu, MenuItem, MenuList, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LiveTvIcon from '@mui/icons-material/LiveTv';

interface OptionsMenuProps {
    open: boolean;
    anchorEl: (EventTarget & HTMLElement) | null;
    onClose: () => void;
}

const OptionsMenu: React.FC<OptionsMenuProps> = ({ open, anchorEl, onClose }) => {
    const handleLegacyCodeClick = () => window.open('https://github.com/thanosoncode/gwi-challenge', '_blank');
    const handleLegacyAppClick = () => window.open('https://gwi-challenge.netlify.app/', '_blank');

    return (
        <Menu open={open} anchorEl={anchorEl} onClose={onClose}>
            <MenuList>
                <MenuItem onClick={handleLegacyCodeClick}>
                    <ListItemIcon>
                        <GitHubIcon />
                    </ListItemIcon>
                    <Typography>legacy code</Typography>
                </MenuItem>
                <MenuItem onClick={handleLegacyAppClick}>
                    <ListItemIcon>
                        <LiveTvIcon />
                    </ListItemIcon>
                    <Typography>legacy app</Typography>
                </MenuItem>
            </MenuList>
        </Menu>
    );
};

export default OptionsMenu;
