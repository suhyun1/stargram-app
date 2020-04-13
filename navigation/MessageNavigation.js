import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Message from "../screens/Messages/Message";
import Messages from "../screens/Messages/Messages";

const MessageNavigation = createStackNavigator();

export default () => {
    return (
        <MessageNavigation.Navigator headerMode="none">
          <MessageNavigation.Screen name="Messages" component={Messages} />
          <MessageNavigation.Screen name="Message" component={Message}/>
        </MessageNavigation.Navigator>
    );
};