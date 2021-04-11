import React from "react";
import "./Authorize.css";

function Authorize(props) {
    return (
        <a
          className="btn btn--loginApp-link"
          href={`${props.spotify}?client_id=${props.client}&redirect_uri=${props.redirect}&scope=${props.scopes.join("%20")}&response_type=token&show_dialog=true`}
        >
          Login to Spotify
        </a>
    )
}

export default Authorize