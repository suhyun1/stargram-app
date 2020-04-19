import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MessagesLink from "../components/MessagesLink";
import NavIcon from "../components/NavIcon";
import { stackStyles } from "./config";

const Stack = createStackNavigator();

export default ({route}) => {
    const {name, params: {initialRoute}} = route;

    return(
        <Stack.Navigator >
            <Stack.Screen
                name={name}
                component={initialRoute}
                options={{
                    headerRight: () => {
                        return name === "Home" && <MessagesLink />
                    },
                    headerTitle: () => <NavIcon name="logo-instagram" size={36} />,
                    headerTitleAlign: "center",
                    headerStyle: {
                        ...stackStyles
                    }
                }}
            />
        </Stack.Navigator>
    );
};