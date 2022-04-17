import React, { useEffect, useRef, useState } from "react";
import { Text, View, Image, TouchableOpacity, Animated } from "react-native";
import Slider from "@react-native-community/slider";
import Ionicons from "react-native-vector-icons/Ionicons";
import SoundPlayer from "react-native-sound-player";
import { connect } from "react-redux";

import styles from "../styles/styles";

class PlayMusicScreen extends React.Component {
  constructor(props) {
    super(props);

    // console.log(this.props.track);
    // console.log(this.props.album);
    console.log(this.props.typeForPlay);

    if (this.props.typeForPlay === "playAlbum") {
      this.state = {
        data: this.props.album.tracks.data,
        img: this.props.album.cover_xl,
        index: 0,
        status: "pause",
      };
    } else if (this.props.typeForPlay === "playTrack") {
      this.state = {
        data: [this.props.track],
        img: this.props.track.album.cover,
        index: 0,
        status: "pause",
      };
    } else {
      this.state = {
        data: [],
      };
    }
  }

  // static getDerivedStateFromProps() {
  //   console.log("rerender here");
  //   //this.yourFunction()
  //   //this.setState({})
  // }

  UNSAFE_componentWillReceiveProps(nextProps) {
    // This will erase any local state updates!
    // Do not do this.
    // this.setState({ email: nextProps.email });
    console.log(nextProps.track);
    if(nextProps.typeForPlay === "playTrack") {
      this.setState({
        data: [nextProps.track],
        img: nextProps.track.album.cover,
        index: 0,
        status: "pause",
      });
    } else {
      this.setState({
        data: nextProps.album.tracks.data,
        img: nextProps.album.cover_xl,
        index: 0,
        status: "pause",
      });
    }
  }

  skipToPrevious = () => {
    if (this.state.index > 0) {
      this.setState((prevState) => ({ index: prevState.index - 1 }));
    }
  };

  skipToNext = () => {
    if (this.state.index < this.state.data.length) {
      this.setState((prevState) => ({ index: prevState.index + 1 }));
    }
  };

  // playSound = () => {
  //   console.log(this.state.data[this.state.index].preview)
  //   if (this.state.status === "play") {
  //     this.setState((prevState) => ({ status: "pause" }));
  //     SoundPlayer.pause();
  //   } else if (this.state.status === "pause") {
  //     this.setState((prevState) => ({ status: "play" }));
  //     // SoundPlayer.playUrl("https://www.deezer.com/track/3135553/");
  //     SoundPlayer.playSoundFile("Moon", "mp3")
  //   } else {
  //     this.setState((prevState) => ({ status: "play" }));
  //     // SoundPlayer.playUrl("https://www.deezer.com/track/3135553/");
  //   }
  // };

  render() {
    if (this.state.data.length) {
      return (
        <View style={styles.container}>
          {/* Ảnh */}
          <View>
            <Image
              style={styles.imageWrapper}
              source={{ uri: this.state.img }}
              resizeMode="stretch"
            />
          </View>

          {/* Tên + ca sĩ */}
          {this.state.data && (
            <View>
              <Text style={styles.songTitle}>
                {this.state.data[this.state.index].title}
              </Text>
              <Text style={styles.songArtist}>
                {this.state.data[this.state.index].artist.name}
              </Text>
            </View>
          )}

          <View>
            {/* Thanh trượt */}
            <Slider
              style={styles.progressBar}
              value={0}
              minimumValue={0}
              maximumValue={this.state.data[this.state.index].duration}
              thumbTintColor="tomato"
              minimumTrackTintColor="tomato"
              maximumTrackTintColor="fff"
              onSlidingComplete={() => {}}
            />
            {/* Thời gian */}
            <View style={styles.progressLevelDuraiton}>
              <Text style={styles.progressLabelText}>0 : 00</Text>
              <Text style={styles.progressLabelText}>
                {this.state.data[this.state.index].duration / 60 < 10
                  ? "0"
                  : ""}
                {Math.floor(this.state.data[this.state.index].duration / 60)} :{" "}
                {this.state.data[this.state.index].duration % 60 <= 9
                  ? "0"
                  : ""}
                {this.state.data[this.state.index].duration % 60}
              </Text>
            </View>
          </View>
          {/* Hành động */}
          <View style={styles.musicControlsContainer}>
            {this.state.data.length > 1 && (
              <TouchableOpacity onPress={() => {}}>
                <Ionicons name={"shuffle-outline"} size={32} color="tomato" />
              </TouchableOpacity>
            )}
            {this.state.data.length === 1 && (
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
                name={
                  this.state.status === "play"
                    ? "pause-outline"
                    : "play-outline"
                }
                size={32}
                color="tomato"
              />
            </TouchableOpacity>
            {this.state.index < this.state.data.length - 1 && (
              <TouchableOpacity onPress={this.skipToNext}>
                <Ionicons
                  name={"play-forward-outline"}
                  size={32}
                  color="tomato"
                />
              </TouchableOpacity>
            )}
            {this.state.index === this.state.data.length - 1 && (
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

const mapStateToProps = (state) => ({
  track: state.track,
  album: state.album,
  typeForPlay: state.typeForPlay,
});

export default connect(mapStateToProps)(PlayMusicScreen);
