import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MessagesLink from "../components/MessagesLink";

const Stack = createStackNavigator();

export default ({route}) => {
    const {name, params: {initialRoute}} = route;

    return(
        <Stack.Navigator >
            {name==="Home"? (
                <Stack.Screen 
                    name={name}
                    component={initialRoute}
                    options={{
                        headerRight: () => <MessagesLink />,
                        headerTitleAlign: "center"
                    }}
                />
            ):(
                <Stack.Screen
                    name={name}
                    component={initialRoute}
                    options={{
                        headerTitleAlign: "center"
                    }}
                />
            )}
            
        </Stack.Navigator>
    );
};