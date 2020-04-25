import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MessagesLink from "../components/MessagesLink";
import NavIcon from "../components/NavIcon";
import { stackStyles } from "./config";
import style from "../style";
import Detail from "../screens/Detail";
import UserDetail from "../screens/UserDetail";

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
                headerBackTitle: null,
                headerTintColor: style.blackColor,
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
                    title: name
                }}
            />
            <Stack.Screen
                name={"Detail"}
                component={Detail}
                options={{
                    title: "Photo"
                }}
            />
            <Stack.Screen
                name={"UserDetail"}
                component={UserDetail}
                options={({ route }) => ({ 
                    title: route.params.username 
                })}
            />
        </Stack.Navigator>
    );
};