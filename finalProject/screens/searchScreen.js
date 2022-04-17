import React from "react";
import { Text, View, TouchableHighlight } from "react-native";
import { connect } from "react-redux";

import styles from "../styles/styles";

import { getType } from "../redux/action";

class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      musics: null,
      isSearching: false,
    };
  }

  render() {
    return (
      <View style={[styles.mainContainer]}>
        <Text style={styles.nameApp}>Music Player</Text>
        <TouchableHighlight
          style={styles.searchByButton}
          onPress={() => {
            this.props.navigation.navigate("searchBy", {
              searchBy: "track",
            });
            this.props.getType("playTrack")
          }}
        >
          <Text category="h4" style={{ color: "#fff" }}>
            Tìm kiếm bài hát
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.searchByButton}
          onPress={() => {
            this.props.navigation.navigate("searchBy", {
              searchBy: "album",
            });
            this.props.getType("playAlbum")
          }}
        >
          <Text category="h4" style={{ color: "#fff" }}>
            Tìm kiếm album
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.searchByButton}
          onPress={() => {
            this.props.navigation.navigate("searchBy", {
              searchBy: "artist",
            });
          }}
        >
          <Text category="h4" style={{ color: "#fff" }}>
            Tìm kiếm nghệ sĩ
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default connect(null, {getType: getType})(SearchScreen)
