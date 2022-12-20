import './App.css';
import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import Spotify from "../../util/Spotify";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: "New Playlist",
      playlistTracks: []
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    let newPlaylist = this.state.playlistTracks;
    if (!this.state.playlistTracks.find((savedTrack) => savedTrack.id === track.id)){
      newPlaylist.push(track);
      this.setState({
        playlistTracks: newPlaylist
      })
    }
  }

  removeTrack(track) {
    let newPlaylist = this.state.playlistTracks.filter((savedTrack) => savedTrack.id !== track.id);
    this.setState({
      playlistTracks: newPlaylist
    })
  }

  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    })
  }

  savePlaylist() {
    let trackURIs = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs)
    this.setState({
      // playlistName: "I'm so freaky fishy fishy",
      playlistTracks: []
    });
  }

  async search(term) {
    let results = await Spotify.search(term);
    this.setState({
      searchResults: results
    })
  }

  componentDidMount() {
    Spotify.getAccessToken();
  }
  
  render() {
    return (
      <div>
      <h1>Kw<span className="highlight">angya</span></h1>
      <div className="App">
        <SearchBar onSearch={this.search}/>
        <div className="App-playlist">
          <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
          <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} 
          onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist}/>
        </div>
      </div>
    </div>
  )
 };
}

export default App;
