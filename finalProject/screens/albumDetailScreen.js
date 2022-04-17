// Màn chi tiết album
import React from "react";
import {
  Image,
  ScrollView,
  View,
  TextInput,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
  FlatList,
} from "react-native";
import Constants from "expo-constants";
import Ionicons from "react-native-vector-icons/Ionicons";

import styles from "../styles/styles";
import { connect } from "react-redux";

class AlbumDetailScreen extends React.Component {
  constructor(props) {
    super(props);
    // const temp = this.props.route.params;
    // this.state = {
    //   info: this.props.album,
    // };
    // console.log(this.props.album.tracks.data);
    console.log(this.props.album);
  }

  renderItem = (results) => {
    const { item } = results;

    return (
      <TouchableHighlight
        style={styles.details_touchable}
        underlayColor="#ddd"
        onPress={() => {}}
      >
        <View style={[styles.view, { width: 360 }]}>
          <Image
            style={styles.img}
            source={
              this.props.album.cover
                ? { uri: this.props.album.cover }
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
      <View style={styles.container}>
        {/* Thông tin album */}
        <View style={styles.view}>
          <Image
            style={styles.details_img}
            source={{ uri: this.props.album.cover_xl }}
            resizeMode="stretch"
          />
          <View>
            <Text style={styles.details_title}>{this.props.album.title}</Text>
            <Text style={styles.details_title}>
              {this.props.album.artist.name}
            </Text>
            <Text style={styles.details_title}>
              {this.props.album.nb_tracks} Bài hát
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("Phát", {
                data: this.props.album.tracks.data,
                img: this.props.album.cover_xl,
              });
            }}
          >
            <Ionicons name={"play-circle-outline"} size={34} color="tomato" />
          </TouchableOpacity>
        </View>
        {/* Danh sách bài hát */}
        <FlatList
          style={styles.flatlist}
          data={this.props.album.tracks.data}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.id + Math.floor(Math.random() * 1000)}
        ></FlatList>
      </View>
    );
  }
}

// Lấy thông tin album được lưu trong store
const mapStateToProps = (state) => ({
  album: state.album,
});

export default connect(mapStateToProps)(AlbumDetailScreen);
