import * as React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import SelectPhoto from "../screens/Photo/SelectPhoto";
import TakePhoto from "../screens/Photo/TakePhoto";
import UploadPhoto from "../screens/Photo/UploadPhoto";
import { stackStyles } from "./config";
import style from "../style";

const TabNav = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const PhotoTabs = () => {
  return (
    <TabNav.Navigator
      tabBarPosition="bottom"
      tabBarOptions={{
        indicatorStyle: {
          backgroundColor: style.blackColor,
        },
        labelStyle: {
          color: style.blackColor,
          fontWeight: "600",
        },
        style: {
          ...stackStyles,
        },
      }}
    >
      <TabNav.Screen name="Take" component={TakePhoto} />
      <TabNav.Screen name="Select" component={SelectPhoto} />
    </TabNav.Navigator>
  );
};

export default () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        ...stackStyles,
      },
      headerTitleAlign: "center",
    }}
  >
    <Stack.Screen
      name="Photo"
      component={PhotoTabs}
      options={{
        title: "Choose Photo",
      }}
    />
    <Stack.Screen
      name="UploadPhoto"
      component={UploadPhoto}
      options={{
        title: null,
      }}
    />
  </Stack.Navigator>
); 