import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MessagesLink from "../components/MessagesLink";
import NavIcon from "../components/NavIcon";
import Detail from "../screens/Detail";
import { stackStyles } from "./config";
import style from "../style";

const Stack = createStackNavigator();

export default ({route}) => {
    const {name, params: {initialRoute}} = route;

    return(
        <Stack.Navigator 
            screenOptions={{
                headerStyle:{
                    ...stackStyles
                },
                headerTitleAlign: "center",
                // headerTitle: ""
            }}    
        >
            <Stack.Screen
                name={name}
                component={initialRoute}
                options={{
                    headerRight: () => {
                        return name === "Home" && <MessagesLink />
                    },
                    headerTitle: () => {
                        return name === "Home" && <NavIcon name="logo-instagram" size={36} />
                    },
                }}
            />
            <Stack.Screen
                name={"Detail"}
                component={Detail}
                options={{
                    headerTintColor: style.blackColor,
                    title: "Photo"
                }}
            />
        </Stack.Navigator>
    );
};