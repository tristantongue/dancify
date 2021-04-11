import React from 'react';
const CircularProgress = require('@material-ui/core/CircularProgress').default;
const { makeStyles, useTheme } = require('@material-ui/core/styles');

const useStyles = makeStyles({
    spinner: {
        color: 'green',
        display: 'flex',
        margin: 'auto',
    },
    '@keyframes fadeIn': {
        from: {opacity:0},
        to: {opacity:1}
      },
    loadingtext: {
        color: 'white',
        animation: 'fadeIn 2s',
        maxWidth: '60%',
        margin: 'auto',
        paddingTop: '10px',
    },
})

function Spinner() {
    const theme = useTheme();
    const classes = useStyles(theme);
    return (
        <div>
            <CircularProgress className={classes.spinner}></CircularProgress>
            <div className={classes.loadingtext}>This could take around 30 seconds if your library has thousands of songs in it.</div>
        </div>
    )
}

export default Spinner