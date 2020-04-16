 import "react-native-gesture-handler"; 
 import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Signup from "../screens/Auth/Signup";
import Login from "../screens/Auth/Login";
import AuthHome from "../screens/Auth/AuthHome";
import Confirm from "../screens/Auth/Confirm";


const AuthNavigation = createStackNavigator();

export default () => {
    return (
      <NavigationContainer>
        <AuthNavigation.Navigator initialRouteName="Login" headerMode="none">
          <AuthNavigation.Screen name="Login" component={Login} />
          <AuthNavigation.Screen name="Confirm" component={Confirm} />
          <AuthNavigation.Screen name="Signup" component={Signup} />
          <AuthNavigation.Screen name="AuthHome" component={AuthHome} />
        </AuthNavigation.Navigator>
      </NavigationContainer>
    );
}