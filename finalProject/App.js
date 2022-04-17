import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import ApplicationTabs from "./navigation/navigators";
import styles from "./styles/styles";
import { Provider } from "react-redux";
import store from "./redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <ApplicationTabs />
    </Provider>
  );
}
