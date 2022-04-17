import React from "react";
import {
  Text,
  View,
  TextInput,
  FlatList,
  TouchableHighlight,
  Image,
} from "react-native";

import styles from "../styles/styles";

import { search, albumInfo, trackInfo } from "../api/api";

export default class SearchByScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      results: null,
      isSearching: false,
    };
    this.searchBy = this.props.route.params;
  }

  getResultBySearch = async (text) => {
    const results = await search(this.searchBy.searchBy, text);
    this.setState({ results: results, isSearching: false });
    console.log(this.state.results);
  };

  // getAlbumInfo = async (id) => {
  //   const results = await albumInfo(id);
  //   return results
  // }

  handleSearch = (text) => {
    if (text) {
      this.setState({ text }, () => this.getResultBySearch(text));
    }
  };

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }

  nextNav = async (item) => {
    if (this.searchBy.searchBy === "track") {
      let results = await trackInfo(item.id);
      console.log(results);
      this.props.navigation.navigate("Phát", {
        data: [results],
        img: results.album.cover
      });
    } else if (this.searchBy.searchBy === "album") {
      let results = await albumInfo(item.id);
      console.log(results);
      this.props.navigation.navigate("albumDetail", {
        item: results,
      });
    } else {
      this.props.navigation.navigate("Phát", {
        id: item.id,
      });
    }
  };

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
        {this.searchBy.searchBy === "track" && (
          <TextInput
            style={styles.textinput}
            autoCorrect={false}
            autoCapitalize="none"
            autoFocus
            maxLength={45}
            placeholder="Nhập tên bài hát ..."
            onChangeText={this.handleSearch}
            value={this.state.text}
          />
        )}
        {this.searchBy.searchBy === "album" && (
          <TextInput
            style={styles.textinput}
            autoCorrect={false}
            autoCapitalize="none"
            autoFocus
            maxLength={45}
            placeholder="Nhập tên album ..."
            onChangeText={this.handleSearch}
            value={this.state.text}
          />
        )}
        {this.searchBy.searchBy === "artist" && (
          <TextInput
            style={styles.textinput}
            autoCorrect={false}
            autoCapitalize="none"
            autoFocus
            maxLength={45}
            placeholder="Nhập tên nghệ sĩ ..."
            onChangeText={this.handleSearch}
            value={this.state.text}
          />
        )}
        {this.state.results && (
          <FlatList
            style={styles.flatlist}
            data={this.state.results}
            renderItem={this.renderItem}
            keyExtractor={(item) => item.id + Math.floor(Math.random() * 1000)}
          ></FlatList>
        )}
      </View>
    );
  }
}
