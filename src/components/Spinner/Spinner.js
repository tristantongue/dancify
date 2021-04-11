import React from 'react';
const CircularProgress = require('@material-ui/core/CircularProgress').default;
const { makeStyles, useTheme } = require('@material-ui/core/styles');

const useStyles = makeStyles({
    spinner: {
        color: 'green',
        display: 'flex',
        margin: 'auto',
    }
})

function Spinner() {
    const theme = useTheme();
    const classes = useStyles(theme);
    return (
        <div>
            <CircularProgress className={classes.spinner}></CircularProgress>
        </div>
    )
}

export default Spinner