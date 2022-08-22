import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <>
            <h3>nothing to see here</h3>
            <Link to={'/'}>go back home</Link>
        </>
    );
};

export default NotFound;
