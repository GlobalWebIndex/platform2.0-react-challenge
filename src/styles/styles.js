import {makeStyles} from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    image: {
        height: '100%',
        width: '100%'
    },
    btnLoadCats: {
        margin: theme.spacing(3),
        minWidth: 120,
    },
    loader: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalBodyCatImage: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        width:'600px',
        maxHeight: '500px',
        overflow: 'auto',
        fontSize: '14px'
    },
    alert: {
        backgroundColor: 'red'
    },
    checkIcon: {
        fontSize: '30px',
        color: 'green'
    },
    modalBodyBreedImage: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        width:'700px',
        height: '500px',
        overflow: 'auto'
    },
    imageItem: {
        margin: '10px',
        height: '80%',
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden'
    },
    rating: {
        display: 'flex',
        alignItems: 'center',
    },
    favImage: {
        height: '150px',
        width: '150px'
    },
    marginImg: {
        marginTop: '15px',
        cursor: 'default'
    }
}));