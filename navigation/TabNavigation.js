import "react-native-gesture-handler";
import * as React from "react";
import { Platform } from "react-native";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Home from "../screens/Tab/Home";
import Notifications from "../screens/Tab/Notifications";
import Profile from "../screens/Tab/Profile";
import Search from "../screens/Tab/Search";
import StackFactory from "./StackFactory";
import NavIcon from "../components/NavIcon";


const TabNavigation = createBottomTabNavigator();

export default() => {
    return (
      <TabNavigation.Navigator 
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = (Platform.OS === "ios" ? "ios-home" : "md-home" );
            } else if (route.name === 'Search') {
              iconName = (Platform.OS === "ios" ? "ios-search" : "md-search");
            } else if (route.name === 'Add') {
              iconName = (Platform.OS === "ios" ? "ios-add" : "md-add");
            } else if (route.name === 'Notifications') {
              iconName = (Platform.OS === "ios" ? "ios-heart" : "md-heart");
            } else if (route.name === 'Profile') {
              iconName = (Platform.OS === "ios" ? "ios-person" : "md-person");
            } 

            return <NavIcon focused={focused} name={iconName} size={28} />;
          },
        })}
        tabBarOptions={{
          showLabel: false,
          style: {
            backgroundColor: "#FAFAFA"
          }
        }}
      >
        <TabNavigation.Screen 
          name="Home" component={StackFactory} initialParams={{ initialRoute: Home}} />
        <TabNavigation.Screen 
          name="Search" component={StackFactory} initialParams={{ initialRoute: Search }} />
        <TabNavigation.Screen name="Add" component={View} listeners={({navigation}) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate("PhotoNavigation");
          }
          })}
         />
        <TabNavigation.Screen name="Notifications" component={StackFactory} initialParams={{ initialRoute: Notifications }} />
        <TabNavigation.Screen name="Profile" component={StackFactory} initialParams={{ initialRoute: Profile }} />
      </TabNavigation.Navigator>
    );

};