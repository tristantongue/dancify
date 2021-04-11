import React, { useState, useEffect } from "react";
import './App.css';


import Header from "./components/Header/Header.js";
import Subheader from "./components/Subheader/Subheader.js";
import GraphArea from "./components/GraphArea/GraphArea.js";
import Explanation from "./components/Explanation/Explanation.js";
import Button from "./components/Button/Button.js";
import Authorize from "./components/Authorize/Authorize.js";
import Spinner from "./components/Spinner/Spinner.js";
import Footer from "./components/Footer/Footer.js";


function App() {

  const [songs, setSongs] = useState([]);
  const [songIds, setSongIds] = useState([]);
  const [songuris, setSonguris] = useState([])
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState('notClicked');
  const [playlist, setPlaylist] = useState();

  const {
    REACT_APP_CLIENT_ID,
  } = process.env;
  
  const REACT_APP_AUTHORIZE_URL = 'https://accounts.spotify.com/authorize'

  const scopes = [
    "user-library-read",
    "playlist-modify-public",
    "playlist-modify-private",
  ];
  const redirect_uri = window.location.origin
  

  function getMe() {
    // gets user information after token authorization 
    fetch('https://api.spotify.com/v1/me', {
        headers: {'Authorization': 'Bearer ' + token},
        json: true
    })
      .then(response => response.json())
      .then(data => {
        setUser(data.id);
      });
  }

  function updateStatusToLoading(){
    setStatus('loading');
  }

  async function getAllSongs() {
    setStatus('loading');
    const timer = ms => new Promise(res => setTimeout(res, ms))
    let x = 0;
    let checker = true;
    let listOfSongs = []
    let danceSongs = []
    while (x < 200 && checker) {
      let offset = x*50;
      fetch("https://api.spotify.com/v1/me/tracks?limit=50&offset="+offset, {
      headers: {'Authorization': 'Bearer ' + token},
      json: true
    })
    .then(response => response.json())
    .then(data => {
      for (let item of data.items) {
        let song = item.track;
        let songID = song.id;
        listOfSongs.push(songID)
        console.log(song.name)
      }
      if (data.items.length < 50) {
        checker = false;
      }
    });
      x++;
      await timer(500)
    }
    let totalSongs = listOfSongs.length;
    let tempList = []
    let checkerTwo = true
    while(totalSongs > 0 && checkerTwo) {
      tempList = listOfSongs.splice(0, 99)
      let query = tempList.join();
      fetch("https://api.spotify.com/v1/audio-features?ids="+query, {
      headers: {'Authorization': 'Bearer ' + token},
      json: true
      })
      .then(response => response.json())
      .then(data => {
        let featuresList = data.audio_features
        for (let feature of featuresList) {
          danceSongs.push(feature)
        }
        if (featuresList.length < 99) {
          checkerTwo = false
        }
      });
      await timer(300)
    }
    if (danceSongs) {
      danceSongs.sort((a, b) => b.danceability - a.danceability)}
    let finalDanceList = danceSongs.splice(0, 49)
    let finalIds = []
    let finalUris = []
    for (let banger of finalDanceList) {
      let id = banger.id;
      let uri = banger.uri;
      finalIds.push(id)
      finalUris.push(uri)
    }
    setSongIds(finalIds);
    setSonguris(finalUris);
    let finalList = []
    let finalQuery = finalIds.join();
    fetch("https://api.spotify.com/v1/tracks?ids="+finalQuery, {
      headers: {'Authorization': 'Bearer ' + token},
      json: true
      })
      .then(response => response.json())
      .then(data => {
        let trackList = data.tracks
        for (let track of trackList) {
          finalList.push(track)
        }
      });
      await timer(300)

    setSongs(finalList);
    setStatus('finished');
  };

  async function makeMyPlaylist() {
    let playlistID = ''
    const timer = ms => new Promise(res => setTimeout(res, ms))
    fetch("https://api.spotify.com/v1/users/"+user+"/playlists", {
      method: 'POST',
      headers: {'Authorization': 'Bearer ' + token},
      json: true,
      body: JSON.stringify({
        "name": "Dancify Playlist",
        "description": "50 groovy tunes!",
        "public": false
        }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('playlist info', data)
      playlistID = data.id
      setPlaylist(data);
    })
    await timer(500)
    fetch("https://api.spotify.com/v1/playlists/"+playlistID+"/tracks", {
      method: 'POST',
      headers: {'Authorization': 'Bearer ' + token},
      body: JSON.stringify({
        "uris": songuris
      })
    })
    .then(response => response.json())
    setStatus('madeplaylist')
  };


  function componentDidMount() {
    const hash = window.location.hash
    .substring(1)
    .split("&")
    .reduce(function(initial, item) {
    if (item) {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
    }, {});
    window.location.hash = "";
    let _token = hash.access_token;
    if (_token) {
      // Set token
      setToken(_token);
    }
  }

  useEffect(componentDidMount);
  useEffect(() =>
    {if(token) getMe()
    }, [token]);

  // useEffect(() => 
  //   {
  //     if(user) getSongs(0)
  //   }, [user]);

  return (
    <div className="App">
      <header><Header></Header></header>
      <div className="SubHeader">
        <Subheader></Subheader>
          {!token && (
            <Authorize 
              scopes={scopes} 
              spotify={REACT_APP_AUTHORIZE_URL} 
              client={REACT_APP_CLIENT_ID} 
              redirect={redirect_uri}>
            </Authorize>
          )}
          {status==='notClicked' && user && (<Button gotClicked={() => {getAllSongs(); updateStatusToLoading()}} children="Show me my grooviest tunes!"></Button>)}
          {status==='loading' && <Spinner></Spinner>}
          {status==='finished' && (<Button gotClicked={() => makeMyPlaylist()} children="Make my playlist!"></Button>)}
          {status==='madeplaylist' && <div className="LoadingInfo"><a className="linktospotify" target="_blank" rel="noopener noreferrer" href={playlist.external_urls.spotify}>Take me to my playlist!</a></div>}
      </div>
      <div className="GraphArea">
      {!user && <Explanation></Explanation>}
      {<GraphArea songs={songs}></GraphArea>}
      </div>
      <div className="footer"><Footer></Footer></div>
    </div>
  );
}

export default App;
