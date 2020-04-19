import React from "react";
import { Platform } from "react-native";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import style from "../style";

const Container = styled.TouchableOpacity`
    padding-right: 20px;
`;

export default () => {
    const navigation = useNavigation();

    return(
        <Container onPress={()=> navigation.navigate("MessageNavigation")}>
            <Ionicons name={Platform.OS === "ios" ? "ios-paper-plane" : "md-paper-plane"} color={style.blackColor} size={25}/>
        </Container>
    );
};
    
