import React from "react";
import "./GraphArea.css";
import SingleBar from "../SingleBar/SingleBar.js";

function GraphArea(props) {
    return (
       <div className="GraphArea">
           {
               props.songs.map(
                (song, index) => (
                <SingleBar song={song.name} artist={song.artists[0].name} link={song.external_urls.spotify} key={index}></SingleBar>
                  )
               )
           }
       </div>
       
    )
}

export default GraphArea