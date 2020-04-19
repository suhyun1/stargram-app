import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Message from "../screens/Messages/Message";
import Messages from "../screens/Messages/Messages";
import { stackStyles } from "./config";

const MessageNavigation = createStackNavigator();

export default () => {
    return (
        <MessageNavigation.Navigator 
          screenOptions={{
            headerStyle: {
              ...stackStyles
            }
          }}
          headerMode="none">
          <MessageNavigation.Screen name="Messages" component={Messages} />
          <MessageNavigation.Screen name="Message" component={Message}/>
        </MessageNavigation.Navigator>
    );
};