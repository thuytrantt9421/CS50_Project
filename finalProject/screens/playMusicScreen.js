// Màn phát nhạc
import * as React from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Animated,
  Button,
} from "react-native";
import Slider from "@react-native-community/slider";
import Ionicons from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";
import { Audio, Video } from "expo-av";

import styles from "../styles/styles";
import { throwIfAudioIsDisabled } from "expo-av/build/Audio/AudioAvailability";

const playbackInstance = new Audio.Sound();

class PlayMusicScreen extends React.Component {
  constructor(props) {
    super(props);

    // console.log(this.props.track);
    // console.log(this.props.album);
    console.log(this.props.typeForPlay);
    this.state = {
      index: 0,
      isPlaying: false,
    };
  }

  componentDidMount = async () => {
    const temp = this.props.route.params;
    if (temp) {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: false,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        playThroughEarpieceAndroid: false,
      });

      this.loadAudio();
    }
  };

  // Xử lý khi chuyển bài hát trong album hoặc đổi album
  componentDidUpdate(prevProps, prevState) {
    if (this.state.index != prevState.index) {
      this.loadAudio();
    }
    if (prevProps != this.props) {
      console.log("hii");
      this.loadAudio();
    }
  }

  componentWillUnmount() {
    playbackInstance.stopAsync();
  }

  playOrPause = async () => {
    if (!this.state.isPlaying) {
      await playbackInstance.playAsync();
    } else if (this.state.isPlaying) {
      await playbackInstance.pauseAsync();
    }
  };

  // Phát nhạc
  playSound = () => {
    this.setState((prevState) => ({ isPlaying: !this.state.isPlaying }));
    this.playOrPause();
  };

  loadAudio = async () => {
    let data = {};
    if (this.props.typeForPlay === "playTrack") {
      data = [this.props.track];
    } else {
      data = this.props.album.tracks.data;
    }

    await playbackInstance.unloadAsync();

    await playbackInstance.loadAsync(
      { uri: data[this.state.index].preview },
      { shouldPlay: this.state.isPlaying }
    );
  };

  // Chuyển về bài hát trước trong danh sách
  skipToPrevious = () => {
    this.setState((prevState) => ({
      index: prevState.index - 1,
      isPlaying: false,
    }));
  };

  // Chuyển tới bài hát tiếp theo trong danh sách
  skipToNext = () => {
    this.setState((prevState) => ({
      index: prevState.index + 1,
      isPlaying: false,
    }));
  };

  render() {
    // console.log(this.props.album);
    // console.log(this.props.track);
    if (this.props.typeForPlay) {
      let data = {};
      if (this.props.typeForPlay === "playTrack") {
        data = [this.props.track];
      } else {
        data = this.props.album.tracks.data;
      }
      return (
        <View style={styles.container}>
          {/* Ảnh */}
          <View>
            <Image
              style={styles.imageWrapper}
              source={{
                uri:
                  this.props.typeForPlay === "playTrack"
                    ? this.props.track.album.cover_xl
                    : this.props.album.cover_xl,
              }}
              resizeMode="stretch"
            />
          </View>
          {/* Tên + ca sĩ */}
          {data && (
            <View>
              <Text style={styles.songTitle}>
                {data[this.state.index].title}
              </Text>
              <Text style={styles.songArtist}>
                {data[this.state.index].artist.name}
              </Text>
            </View>
          )}

          <View>
            {/* Thanh trượt */}
            <Slider
              style={styles.progressBar}
              value={0}
              minimumValue={0}
              maximumValue={data[this.state.index].duration}
              thumbTintColor="tomato"
              minimumTrackTintColor="tomato"
              maximumTrackTintColor="fff"
              onSlidingComplete={() => {}}
            />
            {/* Thời gian */}
            <View style={styles.progressLevelDuraiton}>
              <Text style={styles.progressLabelText}>0 : 00</Text>
              <Text style={styles.progressLabelText}>
                {data[this.state.index].duration / 60 < 10 ? "0" : ""}
                {Math.floor(data[this.state.index].duration / 60)} :{" "}
                {data[this.state.index].duration % 60 <= 9 ? "0" : ""}
                {data[this.state.index].duration % 60}
              </Text>
            </View>
          </View>
          {/* Hành động */}
          <View style={styles.musicControlsContainer}>
            {data.length > 1 && (
              <TouchableOpacity onPress={() => {}}>
                <Ionicons name={"shuffle-outline"} size={32} color="tomato" />
              </TouchableOpacity>
            )}
            {data.length === 1 && (
              <TouchableOpacity onPress={() => {}}>
                <Ionicons name={"shuffle-outline"} size={32} color="grey" />
              </TouchableOpacity>
            )}
            {this.state.index > 0 && (
              <TouchableOpacity onPress={this.skipToPrevious}>
                <Ionicons name={"play-back-outline"} size={32} color="tomato" />
              </TouchableOpacity>
            )}
            {this.state.index === 0 && (
              <TouchableOpacity>
                <Ionicons name={"play-back-outline"} size={32} color="grey" />
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={this.playSound}>
              <Ionicons
                name={this.state.isPlaying ? "pause-outline" : "play-outline"}
                size={32}
                color="tomato"
              />
            </TouchableOpacity>
            {this.state.index < data.length - 1 && (
              <TouchableOpacity onPress={this.skipToNext}>
                <Ionicons
                  name={"play-forward-outline"}
                  size={32}
                  color="tomato"
                />
              </TouchableOpacity>
            )}
            {this.state.index === data.length - 1 && (
              <TouchableOpacity>
                <Ionicons
                  name={"play-forward-outline"}
                  size={32}
                  color="grey"
                />
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={() => {}}>
              <Ionicons name={"heart-outline"} size={32} color="tomato" />
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return <View style={styles.container}></View>;
    }
  }
}

// Lấy thông tin cần thiết từ store
const mapStateToProps = (state) => ({
  track: state.track,
  album: state.album,
  typeForPlay: state.typeForPlay,
});

export default connect(mapStateToProps)(PlayMusicScreen);
