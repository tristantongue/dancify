import React from "react";
import "./Explanation.css";

function Explanation() {
    return (
        <div className="explainBox">
            <span></span>
        <div className="explain">
            <h3>How:</h3>
            After authorizing Dancify to access certain information related to your Spotify library
            from the Spotify API,
            Dancify will read through all of your liked songs and find the 50 songs with the highest "Danceability"
            rating, display them for you and, if you like, create a playlist for you to listen to on your Spotify app.
            Read more about Spotify authorization <a href="https://developer.spotify.com/documentation/general/guides/authorization-guide/#implicit-grant-flow" 
            target="_blank" rel="noopener noreferrer" className="linktoguide">here</a>
        </div>
        </div>
    )
}

export default Explanation