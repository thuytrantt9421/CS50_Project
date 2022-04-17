import { StyleSheet, Dimensions } from "react-native";
import Constants from "expo-constants";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#222831",
    paddingTop: Constants.statusBarHeight,
  },
  searchContainer: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomSection: {
    borderTopColor: "#393E46",
    borderWidth: 1,
    width: width,
    alignItems: "center",
    paddingVertical: 15,
  },

  bottomIconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },

  mainWrapper: {
    width: width,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
  },

  imageWrapper: {
    width: 300,
    height: 340,
    marginBottom: 25,
    marginTop: 25,
  },
  musicImage: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
  },
  elevation: {
    elevation: 5,

    shadowColor: "#ccc",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
  },
  songContent: {
    textAlign: "center",
    color: "#EEEEEE",
  },
  songTitle: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    color: "#eeeeee",
  },

  songArtist: {
    fontSize: 16,
    fontWeight: "300",
    textAlign: "center",
    color: "#eeeeee",
  },

  progressBar: {
    width: 350,
    height: 40,
    marginTop: 25,
    flexDirection: "row",
  },
  progressLevelDuraiton: {
    width: 320,
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 15,
  },
  progressLabelText: {
    color: "#FFF",
  },

  musicControlsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
    width: "90%",
  },
  searchByButton: {
    backgroundColor: "tomato",
    borderRadius: 20,
    flexDirection: "row",
    height: height / 10,
    width: width / 1.2,
    marginBottom: 30,
    padding: 25,
  },
  nameApp: {
    fontSize: 32,
    fontWeight: "600",
    color: "green",
    marginBottom: 60,
  },
  textinput: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 3,
    width: width,
    height: 50,
    borderColor: "grey",
    // paddingTop: 10,
    // paddingBottom: 10,
    // paddingLeft: 15,
    // paddingRight: 15,
  },
  touchable: {
    backgroundColor: "lightgrey",
    width: width,
  },
  view: {
    // margin: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 20,
    paddingBottom: 10,
    // flex: 1,
    // display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    width: width,
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
    // border
    // borderTopColor: "#222831",
    // borderLeftColor:
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
  img: {
    marginRight: 10,
    height: 50,
    width: 50,
    backgroundColor: "grey",
  },
  details_img: {
    width: 80,
    height: 80,
  },
  details_title: {
    fontSize: 16,
    color: "#fff",
  },
  details_touchable: {
    backgroundColor: "lightgrey",
    // width: width,
  },
  details_flatlist: {
    marginTop: 100
  }
});
