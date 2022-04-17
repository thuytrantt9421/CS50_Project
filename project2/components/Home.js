import React from "react";
import {
  Image,
  TouchableHighlight,
  FlatList,
  View,
  TextInput,
  Text,
  StyleSheet,
} from "react-native";

import { searchMovieByName } from "../utils/api.js";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      movies: null,
      isSearching: false,
    };
  }

  static navigationOptions = {
    title: "Find Movies",
    headerStyle: {
      backgroundColor: "#f4511e",
    },
    headerTitleStyle: {
      color: "#fff",
    },
  };

  // Gọi tới api tìm kiếm phim theo tên
  getMovies = async (text) => {
    const results = await searchMovieByName(text);
    this.setState({ movies: results, isSearching: false });
  };

  // Xử lý khi nôi dung ô text thay đổi, đặt lại trạng thái text và tìm nạp danh sách phim mới
  handleSearch = (text) => {
    this.setState({ text }, () => this.getMovies(text));
  };

  // render từng dòng thông tin 1 bộ phim trong danh sách api trả về, khi ấn vào 1 dòng, sẽ chuyển sang màn Movie
  renderItem = (movie) => {
    const { item } = movie;
    return (
      <TouchableHighlight
        style={styles.touchable}
        underlayColor="#ddd"
        onPress={() => {
          this.props.navigation.navigate("Movie", {
            title: item.title,
            img: item.img,
            id: item.imdbID,
          });
        }}
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
              <Text>({item.year})</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  render() {
    return (
      <View style={StyleSheet.absoluteFill}>
        <TextInput
          style={styles.textinput}
          autoCorrect={false}
          autoCapitalize="none"
          autoFocus
          maxLength={45}
          placeholder="Nhập tên phim cần tìm"
          onChangeText={this.handleSearch}
          value={this.state.text}
        />
        {this.state.movies && (
          <FlatList
            style={styles.flatlist}
            data={this.state.movies}
            renderItem={this.renderItem}
            keyExtractor={(item) => item.imdbID}
          ></FlatList>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textinput: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 3,
    borderColor: "grey",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
  },
  flatlist: {
    backgroundColor: "lightgrey",
  },
  touchable: {
    backgroundColor: "lightgrey",
  },
  img: {
    marginRight: 10,
    height: 69.833333335,
    width: 50,
    backgroundColor: "grey",
  },
  view: {
    margin: 10,
    flex: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    flexWrap: "wrap",
    maxWidth: 300,
  },
  column: {
    flex: 1,
    flexDirection: "column",
  },
  row: {
    flex: 1,
    flexDirection: "row",
  },
});
