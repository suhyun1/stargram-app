import "react-native-gesture-handler";
import * as React from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../screens/Tab/Home";
import Notifications from "../screens/Tab/Notifications";
import Profile from "../screens/Tab/Profile";
import Search from "../screens/Tab/Search";

const TabNavigation = createBottomTabNavigator();

export default() => {
    return (
      <NavigationContainer>
        <TabNavigation.Navigator>
          <TabNavigation.Screen name="Home" component={Home} />
          <TabNavigation.Screen name="Add" component={View} listeners={{
              tabPress:e => {
                  e.preventDefault();
                  console.log("add");
              }
          }} />
          <TabNavigation.Screen name="Search" component={Search} />
          <TabNavigation.Screen
            name="Notifications"
            component={Notifications}
          />
          <TabNavigation.Screen name="Profile" component={Profile} />
        </TabNavigation.Navigator>
      </NavigationContainer>
    );

};