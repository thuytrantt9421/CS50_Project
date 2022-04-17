import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createAppContainer, StackRouter } from "react-navigation";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import PlayMusicScreen from "../screens/playMusicScreen";
import FavoriteListScreen from "../screens/favoriteListScreen";
import SearchScreen from "../screens/searchScreen";
import SearchByScreen from "../screens/searchByScreen";
import SettingScreen from "../screens/settingScreen";
import AlbumDetailScreen from "../screens/albumDetailScreen";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Stack ở tab tìm kiếm, gồm màn chọn cách tìm kiếm, màn tìm kiếm và màn chi tiết album
function SearchStack() {
  return (
    <Stack.Navigator
      initialRouteName="searchMain"
      options={({ navigation }) => ({
        headerShown: false,
      })}
    >
      <Stack.Screen
        name="searchMain"
        component={SearchScreen}
        options={({ navigation }) => ({
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="searchBy"
        component={SearchByScreen}
        options={({ navigation }) => ({
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="albumDetail"
        component={AlbumDetailScreen}
        options={({ navigation }) => ({
          headerShown: false,
        })}
      />
    </Stack.Navigator>
  );
}

export default function ApplicationTabs() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Yêu thích") {
              iconName = focused ? "heart" : "heart-outline";
            } else if (route.name === "Phát") {
              iconName = focused ? "play" : "play-outline";
            } else if (route.name === "Tìm kiếm") {
              iconName = focused ? "search" : "search-outline";
            } else if (route.name === "Cài đặt") {
              iconName = focused ? "settings" : "settings-outline";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen
          name="Tìm kiếm"
          component={SearchStack}
          options={({ navigation }) => ({ headerShown: false })}
        />
        <Tab.Screen
          name="Phát"
          component={PlayMusicScreen}
          options={({ navigation }) => ({ headerShown: false })}
        />
        <Tab.Screen
          name="Yêu thích"
          component={FavoriteListScreen}
          options={({ navigation }) => ({ headerShown: false })}
        />
        <Tab.Screen
          name="Cài đặt"
          component={SettingScreen}
          options={({ navigation }) => ({ headerShown: false })}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
