import React from "react";
import "./SingleBar.css";
const Card = require('@material-ui/core/Card').default;
const { makeStyles, useTheme } = require('@material-ui/core/styles');

const useStyles = makeStyles({
    gridContainer: {
        color: 'black',
        backgroundColor: '#1db954',
        '&:hover': {
            backgroundColor: '#fff',
            boxShadow: '0 0 6px 2px #FFF',
          },
        maxWidth: '100%',
        margin: 'auto',
        padding: '10px',
        border: '5px',
        boxShadow: '0 0 3px 1px #FFF',
        textTransform: 'uppercase',
        transition: 'all 0.25s ease',
        justifyContent: 'center',
    },
})

function SingleBar(props) {
    const theme = useTheme();
    const classes = useStyles(theme);
    return (
        <div className="Bar">
            <a className="songlink" target="_blank" rel="noopener noreferrer" href={props.link}>
                <Card className={classes.gridContainer}><b>'{props.song}'</b> - {props.artist}</Card>
            </a>
        </div>
    )
}

export default SingleBar 