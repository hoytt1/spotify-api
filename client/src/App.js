import React, { Component } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import Player from './Player';
import './App.css';

const spotifyApi = new SpotifyWebApi();

class App extends Component {

  constructor() {
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token); 
    }
    this.state = {
      loggedIn: token ? true : false,
      item: { 
        album : {
           images: [{url: ''}]
          }, 
        name: '',
        artists: [{ name : ''}],
        duration_ms : 0,
      },
      is_playing : "Paused",
      progress_ms : 0
    };
    this.getNowPlaying = this.getNowPlaying.bind(this);
  };

  componentDidMount() {
    this.getNowPlaying();
  }

  getHashParams() {
    var hashParams= {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
           q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }

  getNowPlaying() {
    spotifyApi.getMyCurrentPlayingTrack()
      .then((response) => {
        this.setState({
          item: response.item,
          is_playing: response.is_playing,
          progress_ms: response.progress_ms,
        });
      });
  }

  render() {
    return (
      <div className='App'>
        <a className='btn btn--loginApp-link' href='http://localhost:8888'> Login to Spotify </a>
        { this.state.loggedIn && 
          // <button onClick = {() => this.getNowPlaying() }> Check Now Playing </button> 
          <Player item = { this.state.item }
          is_playing = { this.state.is_playing }
          progress_ms = { this.progress_ms } />
        }
      </div>
    );
  }
}

export default App;
