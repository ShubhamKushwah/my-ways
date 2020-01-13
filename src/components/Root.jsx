import React, { useState } from 'react';
import { Grid, Paper, TextField, Button } from '@material-ui/core';
import Youtube from 'react-youtube';
import { connect } from 'react-redux';
import { changeVideoId, addVideoId, removeVideoId, playNextVideo, updateList } from '../store/player/actions';
import VideosList from './VideosList';
import queryString from 'query-string';

const youtubeOptions = {
  height: '390',
  width: '640',
  playerVars: {
    autoplay: 1
  }
}

const Root = props => {
  const [state, setState] = useState({
    videoUrl: ''
  });

  const { videoUrl } = state;
  const { player: { currentVideoId, list }, changeVideoId, removeVideoId, playNextVideo, updateList } = props;

  // https://www.youtube.com/watch?v=7wtfhZwyrcc, https://www.youtube.com/watch?v=ktvTqknDobU

  const onClick = () => {
    if (!videoUrl) {
      alert('Please enter a valid url');
      return;
    } else if (videoUrl.indexOf('youtube.com') < 0) {
      alert('This is not a valid Youtube Url');
      return;
    }

    const url = videoUrl.split('?')[1];
    const parsed = queryString.parse(url);
    props.addVideoId(parsed.v)
    setState({ videoUrl: '' })
  }

  const onChange = ({ target: { name, value } }) => setState({ [name]: value })

  const onEnd = () => {
    playNextVideo();
  }

  return (
    <Grid container className="root" spacing={2}>
      <Grid item xs={9}>
        <Paper className="paper">
          <div className="flex">
            <TextField
              fullWidth
              label="Add a youtube link"
              name="videoUrl"
              value={videoUrl}
              onChange={onChange}
            />
            <Button color="primary" variant="contained" onClick={onClick}>
              ADD
            </Button>
          </div>
          <br />
          {
            currentVideoId ? <Youtube
              videoId={currentVideoId}
              opts={youtubeOptions}
              onEnd={onEnd}
            /> : 'Please select a video to play'
          }
          <hr />
          <strong>FEATURES</strong>
          <ul>
            <li>Add any youtube video url e.g. Copy this one: <em>https://www.youtube.com/watch?v=7wtfhZwyrcc</em></li>
            <li>Click on the <strong>ADD</strong> button to add the video to your playlist</li>
            <li>Click on the video from playlist to start playing. The current playing video would be highlighted in Blue color.</li>
            <li>
              Keep adding more videos, if you wish
            </li>
            <li>
              When a video is finished it would be removed from the playlist, and next one would be played automatically.
            </li>
            <li>
              You can <strong>Delete</strong> any video from the list, by clicking on the "Trash" icon button, right next to it.
            </li>

          </ul>
          <strong>BONUS</strong>
          <ul>
            <li>
              You can rearrange the playlist by dragging the videos up and down.
            </li>
            <li>
              Regarding the Sync thing, it won't be possible to do that just on the client side,
              <br />
              as it needs a backend, and some work with Sockets, to create real-time interactions between multiple web pages.
              <br />
              So I'm leaving that part on purpose, although I know how to do it.
            </li>
          </ul>
        </Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper className="paper">
          <VideosList onReorder={updateList} currentVideoId={currentVideoId} list={list} changeVideoId={changeVideoId} removeVideoId={removeVideoId} />
        </Paper>
      </Grid>
    </Grid>
  )
}

const mapStateToProps = state => {
  const { player } = state;
  return {
    player
  };
}

const mapDispatchToProps = dispatch => {
  return {
    changeVideoId: payload => dispatch(changeVideoId(payload)),
    addVideoId: payload => dispatch(addVideoId(payload)),
    removeVideoId: payload => dispatch(removeVideoId(payload)),
    playNextVideo: payload => dispatch(playNextVideo(payload)),
    updateList: payload => dispatch(updateList(payload))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Root);