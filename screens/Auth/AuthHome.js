import React from "react";
import styled from "styled-components";
import constants from "../../constants";
import AuthButton from "../../components/AuthButton";

const View = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1;
`;
const Image = styled.Image`
  width: ${constants.width / 2.5};
  height: ${constants.height / 8};
`;

const Touchable = styled.TouchableOpacity``;
const SignUpBtn = styled.View`
  background-color: ${props => props.theme.blueColor};
  padding: 10px;
  margin: 0px 50px;
  border-radius: 4px;
  width: ${constants.width / 2};
  margin-bottom: 25px;
`;
const SignUpBtnText = styled.Text`
  color: white;
  text-align: center;
  font-weight: 600;
`;

const LoginLink = styled.View``;
const LoginLinkText = styled.Text`
  color: ${props => props.theme.blueColor};
  margin-top: 20px;
  font-weight: 600;
`;

export default ({ navigation }) => (
    <View>
        <Image resizeMode={"contain"} source={require("../../assets/logo.png")}/>
        <AuthButton text={"Create New Account"} onPress={()=> navigation.navigate("Signup")}/>
        <Touchable onPress={() => navigation.navigate("Login")}>
            <LoginLink>
                <LoginLinkText>Log in</LoginLinkText>
            </LoginLink>
        </Touchable>
    </View>
);