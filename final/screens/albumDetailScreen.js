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

export default class AlbumDetailScreen extends React.Component {
  constructor(props) {
    super(props);
    const temp = this.props.route.params;
    this.state = {
      info: temp.item,
    };
    console.log(this.state.info.tracks.data);
  }

  renderItem = (results) => {
    const { item } = results;

    return (
      <TouchableHighlight
        style={styles.details_touchable}
        underlayColor="#ddd"
        onPress={() => {}}
      >
        <View style={[styles.view, {width: 360}]}>
          <Image
            style={styles.img}
            source={
              this.state.info.cover
                ? { uri: this.state.info.cover }
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
        <View style={styles.view}>
          <Image
            style={styles.details_img}
            source={{ uri: this.state.info.cover_xl }}
            resizeMode="stretch"
          />
          <View>
            <Text style={styles.details_title}>{this.state.info.title}</Text>
            <Text style={styles.details_title}>
              {this.state.info.artist.name}
            </Text>
            <Text style={styles.details_title}>
              {this.state.info.nb_tracks} Bài hát
            </Text>
          </View>
          <TouchableOpacity onPress={() => {this.props.navigation.navigate("Phát", {
              data: this.state.info.tracks.data,
              img: this.state.info.cover_xl
          })}}>
            <Ionicons name={"play-circle-outline"} size={34} color="tomato" />
          </TouchableOpacity>
        </View>
        <FlatList
          style={styles.flatlist}
          data={this.state.info.tracks.data}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.id + Math.floor(Math.random() * 1000)}
        ></FlatList>
      </View>
    );
  }
}
