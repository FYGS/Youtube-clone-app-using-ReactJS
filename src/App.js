import React from 'react';

import { Grid } from '@material-ui/core';

import { SearchBar, VideoDetail, VideoList } from './components';

import youtube from './api/youtube';

class App extends React.Component {
    state = {
        videos: [],
        videoSelected: null,
    }

    componentDidMount() {
        this.handleSubmit('pdf generation with react and node');
    }

    onVideoSelect = (video) => {
        this.setState({ videoSelected: video });
    }

    handleSubmit = async (searchTerm) => {
        const response = await youtube.get('search', {
            params: {
                part: 'snippet',
                maxResults: 5,
                key: 'AIzaSyAjSAVGvaeJ30nQ-Y5X5Fe7lPzljV8OyWQ',
                q: searchTerm
            }
        });

        // console.log(response.data.items);
        
        this.setState({ videos: response.data.items, videoSelected: response.data.items[0] });
    }

    render() {
        const { videoSelected, videos } = this.state;

        return (
            <Grid justify="center" container spacing={10}>
                <Grid item xs={12}>
                    <Grid container spacing={10}>
                        <Grid item xs={12}>
                            <SearchBar onFormSubmit={this.handleSubmit}/>
                        </Grid>
                        <Grid item xs={8}>
                            <VideoDetail video={videoSelected}/>
                        </Grid>
                        <Grid item xs={4}>
                            <VideoList videos={videos} onVideoSelect={this.onVideoSelect}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default App;