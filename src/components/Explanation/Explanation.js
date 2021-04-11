import React from "react";
import "./Explanation.css";

function Explanation() {
    return (
        <div className="explain">
            <h3>How:</h3>
            After authorizing Dancify to access certain information related to your Spotify library
            from the Spotify API,
            Dancify will read through all of your liked songs and find the 50 songs with the highest "Danceability"
            rating, display them for you and, if you like, create a playlist for you to listen to on your Spotify app. Don't worry, none of this information is stored anywhere.
        </div>
    )
}

export default Explanation