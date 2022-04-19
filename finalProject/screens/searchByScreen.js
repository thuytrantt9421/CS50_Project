import React from "react";
import {
  Text,
  View,
  TextInput,
  FlatList,
  TouchableHighlight,
  Image,
  Button,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import styles from "../styles/styles";

import { search, albumInfo, trackInfo } from "../api/api";

import { connect } from "react-redux";

import { getTrack, getAlbum, getType } from "../redux/action";

class SearchByScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      results: null,
      isSearching: false,
    };
    this.searchBy = this.props.route.params;
  }

  // gọi tới API tìm kiếm
  getResultBySearch = async (text) => {
    const results = await search(this.searchBy.searchBy, text);
    this.setState({ results: results, isSearching: false });
  };

  search = () => {
    this.getResultBySearch(this.state.text);
  };

  // Chuyển màn
  nextNav = async (item) => {
    if (this.searchBy.searchBy === "track") {
      let results = await trackInfo(item.id);
      // console.log(results);
      this.props.getTrack(results);
      this.props.getType("playTrack");
      this.props.navigation.navigate("Phát", { navToPlay: true });
    } else if (this.searchBy.searchBy === "album") {
      let results = await albumInfo(item.id);
      // console.log(results);
      this.props.getAlbum(results);
      this.props.getType("playAlbum");
      this.props.navigation.navigate("albumDetail");
    } else if (this.searchBy.searchBy === "album") {
    }
  };

  // render từng dòng trong danh sách api trả về
  renderItem = (results) => {
    const { item } = results;

    return (
      <TouchableHighlight
        style={styles.touchable}
        underlayColor="#ddd"
        onPress={() => this.nextNav(item)}
      >
        <View style={styles.view}>
          <Image
            style={styles.img}
            source={
              item.img
                ? { uri: item.img }
                : {
                    uri: "https://banner2.kisspng.com/20180216/kee/kisspng-photographic-film-reel-clip-art-movie-film-5a8677562304e0.0541516415187618141435.jpg",
                  }
            }
            resizeMode="stretch"
          />
          <View style={styles.column}>
            <Text style={styles.title}>{item.title}</Text>
            <View style={styles.row}>
              <Text>{item.artist.name}</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  render() {
    return (
      <View style={styles.searchContainer}>
        <View style={styles.textinput}>
          {this.searchBy.searchBy === "track" && (
            <TextInput
              style={styles.search_input}
              autoCorrect={false}
              autoCapitalize="none"
              autoFocus
              maxLength={45}
              placeholder="Nhập tên bài hát ..."
              onChangeText={(text) => {
                this.setState({ text });
              }}
              value={this.state.text}
            />
          )}
          {this.searchBy.searchBy === "album" && (
            <TextInput
              style={styles.search_input}
              autoCorrect={false}
              autoCapitalize="none"
              autoFocus
              maxLength={45}
              placeholder="Nhập tên album ..."
              onChangeText={(text) => {
                this.setState({ text });
              }}
              value={this.state.text}
            />
          )}
          {this.searchBy.searchBy === "artist" && (
            <TextInput
              style={styles.search_input}
              autoCorrect={false}
              autoCapitalize="none"
              autoFocus
              maxLength={45}
              placeholder="Nhập tên nghệ sĩ ..."
              onChangeText={(text) => {
                this.setState({ text });
              }}
              value={this.state.text}
            />
          )}
          <Button
            title="Tìm kiếm"
            onPress={this.search}
            style={styles.search_button}
          ></Button>
        </View>
        {this.state.results && (
          <FlatList
            style={styles.flatlist}
            data={this.state.results}
            renderItem={this.renderItem}
            keyExtractor={(item) =>
              item.id + Math.floor(Math.random() * 100000)
            }
          ></FlatList>
        )}
      </View>
    );
  }
}

export default connect(null, {
  getTrack: getTrack,
  getAlbum: getAlbum,
  getType: getType,
})(SearchByScreen);
