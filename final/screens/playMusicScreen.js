import React, { useEffect, useRef, useState } from "react";
import { Text, View, Image, TouchableOpacity, Animated } from "react-native";
import Slider from "@react-native-community/slider";
import Ionicons from "react-native-vector-icons/Ionicons";
import SoundPlayer from "react-native-sound-player";

import styles from "../styles/styles";

export default class PlayMusicScreen extends React.Component {
  constructor(props) {
    super(props);
    const temp = this.props.route.params;
    this.state = {
      data: temp.data,
      img: temp.img,
      index: 0,
      status: "pause",
    };
    // console.log(this.state.img);
  }

  componentDidMount() {}

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
              {this.state.data[this.state.index].duration / 60 < 10 ? "0" : ""}
              {Math.floor(
                this.state.data[this.state.index].duration / 60
              )} :{" "}
              {this.state.data[this.state.index].duration % 60 <= 9 ? "0" : ""}
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
                this.state.status === "play" ? "pause-outline" : "play-outline"
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
              <Ionicons name={"play-forward-outline"} size={32} color="grey" />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={() => {}}>
            <Ionicons name={"heart-outline"} size={32} color="tomato" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
