import "react-native-gesture-handler";
import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigation from "./TabNavigation";
import PhotoNavigation from "./PhotoNavigation";
import MessageNavigation from "./MessageNavigation";
import { stackStyles } from "./config";

const MainNavigation = createStackNavigator();

export default () => {
    return (
      <NavigationContainer>
        <MainNavigation.Navigator 
        screenOptions={{
            headerStyle: {
              ...stackStyles
            }
        }}
        headerMode="none" mode="modal">
          <MainNavigation.Screen
            name="TabNavigation"
            component={TabNavigation}
          />
          <MainNavigation.Screen
            name="PhotoNavigation"
            component={PhotoNavigation}
          />
          <MainNavigation.Screen
            name="MessageNavigation"
            component={MessageNavigation}
          />
        </MainNavigation.Navigator>
      </NavigationContainer>
    );
};