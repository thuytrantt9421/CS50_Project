import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import ApplicationTabs from "./navigation/navigators";
import styles from "./styles/styles";

export default function App() {
  return <ApplicationTabs />;
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
