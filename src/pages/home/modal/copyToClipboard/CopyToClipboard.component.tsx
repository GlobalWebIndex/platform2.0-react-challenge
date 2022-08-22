import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';

interface CopyToClipboardProps {
    textToCopy: string;
    duration: number;
    mainIcon: JSX.Element;
    secondaryIcon: JSX.Element;
}

const CopyToClipboard: React.FC<CopyToClipboardProps> = ({ duration, mainIcon, secondaryIcon, textToCopy }) => {
    const [icon, setIcon] = useState(<>{mainIcon}</>);
    const handleCopyToClipboard = (url: string) => {
        setIcon(<>{secondaryIcon}</>);
        navigator.clipboard.writeText(url);
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIcon(<>{mainIcon}</>);
        }, duration);
        return () => clearTimeout(timeout);
    }, [icon]);

    return (
        <Button onClick={() => handleCopyToClipboard(textToCopy)} endIcon={<>{icon}</>}>
            {textToCopy}
        </Button>
    );
};

export default CopyToClipboard;
