import React from "react";
import { View } from "react-native";
import { useIsLoggedIn } from "../AuthContext";
import AuthNavigation from "../navigation/AuthNavigation";
import MainNavigation from "../navigation/MainNavigation";

export default () => {
    // const isLoggedIn = useIsLoggedIn();
    const isLoggedIn = true;  //임의로 로그인 상태로
    return (
      <View style={{ flex: 1 }}>
        {isLoggedIn ? <MainNavigation /> : <AuthNavigation />}
      </View>
    );
};
