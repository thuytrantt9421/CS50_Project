import React from "react";
import {
  Image,
  ScrollView,
  View,
  TextInput,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import { searchMovieById } from "../utils/api.js";
export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: null,
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("title", "Movie"),
      headerStyle: {
        backgroundColor: "#f4511e",
      },
      headerTitleStyle: {
        color: "#fff",
      },
    };
  };

  componentDidMount() {
    this.getMovieDetails(this.props.navigation.getParam("id", "n/a"));
  }

  // Lấy thông tin chi tiết 1 bộ phim
  getMovieDetails = async (id) => {
    const results = await searchMovieById(id);
    this.setState({ info: results });
  };

  render() {
    const { navigation } = this.props;
    const title = navigation.getParam("title", "N/A");
    const img = navigation.getParam(
      "img",
      "https://banner2.kisspng.com/20180216/kee/kisspng-photographic-film-reel-clip-art-movie-film-5a8677562304e0.0541516415187618141435.jpg"
    );
    return (
      <ScrollView style={StyleSheet.absoluteFill}>
        <View style={styles.view}>
          <Image
            style={styles.image}
            source={{ uri: img }}
            resizeMode="stretch"
          />
          <Text style={styles.title}>{title}</Text>
          {this.state.info && (
            <View>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                {this.state.info.Year}
              </Text>
              <Text>Thể loại: {this.state.info.Genre}</Text>
              <Text>Rated: {this.state.info.Rated}</Text>
              <Text>Phát hành: {this.state.info.Released}</Text>
              <Text>Thời lượng: {this.state.info.Runtime}</Text>
              <Text>Đạo diễn: {this.state.info.Director}</Text>
              <Text style={{ marginTop: 10 }}>
                Diễn viên: {this.state.info.Actors}
              </Text>
              <Text style={{ marginTop: 10, fontStyle: "italic" }}>
                Mô tả: {this.state.info.Plot}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    padding: 15,
  },
  image: {
    alignSelf: "center",
    width: (Dimensions.get("window").width - 30) * 0.75,
    height: (Dimensions.get("window").width - 30) * 0.75 * 1.4266666667,
  },
  title: {
    marginTop: 10,
    alignSelf: "flex-start",
    fontSize: 24,
  },
  row: {
    flex: 1,
    flexDirection: "row",
  },
});
