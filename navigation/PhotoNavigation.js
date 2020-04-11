import * as React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import SelectPhoto from "../screens/Photo/SelectPhoto";
import TakePhoto from "../screens/Photo/TakePhoto";
import UploadPhoto from "../screens/Photo/UploadPhoto";

const TabNav = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const PhotoTabs = () => {
  return (
    <TabNav.Navigator tabBarPosition="bottom">
      <TabNav.Screen name="SelectPhoto" component={SelectPhoto} />
      <TabNav.Screen name="TakePhoto" component={TakePhoto} />
    </TabNav.Navigator>
  );
};

export default () => (
  <Stack.Navigator mode="modal" headerMode="none">
    <Stack.Screen name="Photo" component={PhotoTabs} />
    <Stack.Screen name="UploadPhoto" component={UploadPhoto} />
  </Stack.Navigator>
); 