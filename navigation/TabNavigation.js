import "react-native-gesture-handler";
import * as React from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Tab/Home";
import Notifications from "../screens/Tab/Notifications";
import Profile from "../screens/Tab/Profile";
import Search from "../screens/Tab/Search";
import StackFactory from "./StackFactory";

const TabNavigation = createBottomTabNavigator();

export default() => {
    return (
      <TabNavigation.Navigator>
        <TabNavigation.Screen name="Home" component={StackFactory} initialParams={{ initialRoute: Home}} />
        <TabNavigation.Screen name="Search" component={StackFactory} initialParams={{ initialRoute: Search }} />
        <TabNavigation.Screen name="Add" component={View} listeners={({navigation, route}) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate("PhotoNavigation");
          }
        })} />
        <TabNavigation.Screen name="Notifications" component={StackFactory} initialParams={{ initialRoute: Notifications }} />
        <TabNavigation.Screen name="Profile" component={StackFactory} initialParams={{ initialRoute: Profile }} />
      </TabNavigation.Navigator>
    );

};