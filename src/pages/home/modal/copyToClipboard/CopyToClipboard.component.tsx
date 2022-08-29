import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface CopyToClipboardProps {
    url: string;
}

const CopyToClipboard: React.FC<CopyToClipboardProps> = ({ url }) => {
    const [icon, setIcon] = useState(<ContentCopyIcon />);

    const handleCopyToClipboard = async (url: string) => {
        await navigator.clipboard.writeText(url);
        setIcon(<CheckCircleIcon />);
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIcon(<ContentCopyIcon />);
        }, 2000);
        return () => clearTimeout(timeout);
    }, [handleCopyToClipboard]);

    return (
        <Button
            variant="outlined"
            onClick={() => handleCopyToClipboard(url)}
            endIcon={<>{icon}</>}
            sx={{ textTransform: 'none' }}
        >
            {url}
        </Button>
    );
};

export default CopyToClipboard;
