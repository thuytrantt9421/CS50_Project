import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import vibrate from "./utils/vibrate";

export default class App extends React.Component<any, any> {
  workTime: number;
  breakTime: number;
  interval: any;
  sec: number;
  min: number;

  constructor(props: any) {
    super(props);
    this.workTime = 25 * 60;
    this.breakTime = 5 * 60;

    this.state = {
      timeFor: this.workTime,
      title: "Work Time",
      counting: false,
    };

    this.sec = 0;
    this.min = 0;
  }

  componentDidMount() {
    this.timer();
  }

  componentDidUpdate() {
    this.update();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  timer = () => {
    this.interval = setInterval(() => {
      this.setState({
        timeFor: this.state.timeFor - 1,
        counting: true,
      });
    }, 1000);
  };

  update = () => {
    if (this.state.timeFor < 0) {
      vibrate();
      clearInterval(this.interval);
      if (this.state.title === "Work Time") {
        this.setState({
          title: "Break Time",
          counting: true,
          timeFor: this.breakTime,
        });
      } else {
        this.setState({
          title: "Work Time",
          counting: true,
          timeFor: this.workTime,
        });
      }
      this.timer();
    }
  };

  reset = () => {
    clearInterval(this.interval);
    this.state.title === "Work Time"
      ? this.setState({
          timeFor: this.workTime,
          counting: false,
        })
      : this.setState({
          timeFor: this.breakTime,
          counting: false,
        });
  };

  pause = () => {
    this.setState({ counting: false });
    clearInterval(this.interval);
  };

  workUserInput = (time: string, unitType: string) => {
    clearInterval(this.interval);
    unitType === "min"
      ? (this.min = parseInt(time) * 60)
      : (this.sec = parseInt(time));

    this.workTime = (this.min || 0) + (this.sec || 0);

    this.state.title !== "Break Time"
      ? this.setState({ timeFor: this.workTime, counting: false })
      : this.setState({ counting: false });
  };

  breakUserInput = (time: string, unitType: string) => {
    clearInterval(this.interval);
    unitType === "min"
      ? (this.min = parseInt(time) * 60)
      : (this.sec = parseInt(time));

    this.breakTime = (this.min || 0) + (this.sec || 0);

    this.state.title !== "Work Time"
      ? this.setState({ timeFor: this.breakTime, counting: false })
      : this.setState({ counting: false });
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="height">
        <Text style={styles.titleText}>Pomodoro Timer</Text>
        <Text style={styles.timeFor}>{this.state.title}</Text>

        <Text style={styles.time}>
          {this.state.timeFor / 60 < 10 ? "0" : ""}
          {Math.floor(this.state.timeFor / 60)} :{" "}
          {this.state.timeFor % 60 <= 9 ? "0" : ""}
          {this.state.timeFor % 60}
        </Text>
        <View style={styles.row}>
          <View style={styles.btn}>
            <Button title="Reset" onPress={this.reset} />
          </View>
          <View style={styles.btn}>
            {this.state.counting ? (
              <Button title="Pause" onPress={this.pause} />
            ) : (
              <Button title="Start" onPress={this.timer} />
            )}
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.inputFieldsTitle}>Input Work Time</Text>
          <TextInput
            style={styles.textInputBox}
            onChangeText={(numMin) => this.workUserInput(numMin, "min")}
            placeholder="Min"
            keyboardType="numeric"
          />
          <Text style={styles.inputFieldsTitle}>:</Text>
          <TextInput
            style={styles.textInputBox}
            onChangeText={(numSec) => this.workUserInput(numSec, "sec")}
            placeholder="Sec"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.row}>
          <Text style={styles.inputFieldsTitle}>Input Break Time</Text>
          <TextInput
            style={styles.textInputBox}
            onChangeText={(numMin) => this.breakUserInput(numMin, "min")}
            placeholder="Min"
            keyboardType="numeric"
          />
          <Text style={styles.inputFieldsTitle}>:</Text>
          <TextInput
            style={styles.textInputBox}
            onChangeText={(numSec) => this.breakUserInput(numSec, "sec")}
            placeholder="Sec"
            keyboardType="numeric"
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4FBDBA",
    alignItems: "center",
    justifyContent: "center",
  },
  textInputBox: {
    height: 25,
    borderColor: "#fff",
    borderWidth: 1,
    width: 50,
    borderRadius: 5,
    overflow: "hidden",
    marginLeft: 10,
    marginRight: 10,
    textAlign: "center",
  },

  timeFor: {
    marginBottom: 20,
    fontSize: 20,
    color: "#fff",
  },
  inputFieldsTitle: {
    paddingTop: 8,
    color: "#fff",
  },
  titleText: {
    marginTop: 5,
    color: "#FFF56D",
    fontSize: 40,
    textAlignVertical: "top",
    paddingBottom: 50,
    alignContent: "center",
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    marginTop: 20,
  },
  btn: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 50,
  },
  time: {
    color: "#FFC900",
    fontSize: 20,
  },
});
