import React from "react";
import SearchBar from "./SearchBar";
import youtube from "../apis/youtube";
import VideoList from "./VideosList";
import VideoDetail from "./VideoDetail";
class App extends React.Component {
  state = { term: [], selectedVideo: null };

  componentDidMount() {
    this.onTermSubmit("House MD");
  }
  onTermSubmit = async (term) => {
    const KEY = "AIzaSyDyUHOB1dqZ5Q34_mYGj7fCto48OPm83ao";
    const response = await youtube.get("/search", {
      params: {
        part: "snippet",
        maxResults: 5,
        key: KEY,
        q: term,
      },
    });
    this.setState({
      term: response.data.items,
      selectedVideo: response.data.items[1],
    });
  };

  onVideoSelect = (video) => {
    this.setState({ selectedVideo: video });
  };
  render() {
    return (
      <div className='ui container'>
        <SearchBar onFormSubmitting={this.onTermSubmit} />
        <div className='ui grid'>
          <div className='ui row'>
            <div className='eleven wide column'>
              <VideoDetail video={this.state.selectedVideo} />
            </div>
            <div className='five wide column'>
              <VideoList
                onVideoSelect={this.onVideoSelect}
                videos={this.state.term}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
