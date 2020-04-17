import React, { useState } from "react";
import styled from "styled-components";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useMutation } from "react-apollo-hooks";
import { CREATE_ACCOUNT } from "./AuthQueries";
import * as Facebook from 'expo-facebook';
import * as Google from "expo-google-app-auth";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const FBContainer = styled.View`
  margin-top: 25px;
  padding-top: 25px;
  border-top-width: 1px;
  border-color: ${props=> props.theme.lightGreyColor};
  border-style: solid;
`;

const GoogleContainer = styled.View`
  margin-top: 10px;
`;

export default ({ navigation, route }) => {
  const emailInput = useInput(route.params ? route.params.email : "");
  const fNameInput = useInput("");
  const lNameInput = useInput("");
  const usernameInput = useInput("");
  const [loading, setLoading] = useState(false);
  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    variables: {
      email: emailInput.value,
      username: usernameInput.value,
      firstName: fNameInput.value,
      lastName: lNameInput.value
    }
  });

  const handleSignup = async () => {
    const { value: email} = emailInput;
    const { value: fName } = fNameInput;
    const { value: lNnme } = lNameInput;
    const { value: username } = usernameInput;

    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(email === ""){
      return Alert.alert("I need your email");
    }else if (!emailRegex.test(email)) {
      return Alert.alert("That email is invalid");
    }
    if (fName===""){
      return Alert.alert("I need your name");
    }
    if (username === "") {
      return Alert.alert("Invalid username");
    }


    try {
      setLoading(true);
      const {
        data: { createAccount }
      } = await createAccountMutation();
      if(createAccount){
        Alert.alert("Account created", "Log in now!");
        navigation.navigate("Login", { email });
      }
    } catch (e) {
      console.log(e);
      Alert.alert("Username taken", "Log in instead");
      navigation.navigate("Login", { email });
    } finally {
      setLoading(false);
    }
  };

  const fbLogin = async() => {
    const APP_ID = "242065393832323";
    try{
      setLoading(true);
      await Facebook.initializeAsync(APP_ID);
      const {
        type,
        token
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', "email"],
      });
      console.log(type);
      console.log(token);
      if(type === "success"){
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,last_name,first_name,email`);
        const {email, first_name, last_name} = await response.json();
        updateFormData(email, first_name, last_name);
        
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    } finally{
      setLoading(false);
    }

  };

  const googleLogin = async() => {
    const GOOGLE_ID = "598150485635-77dbjaupuq4nc0mgr6itn65hfvjh5539.apps.googleusercontent.com";
    try {
      setLoading(true);
      const result = await Google.logInAsync({
        androidClientId: GOOGLE_ID,
        // iosClientId: GOOGLE_ID,
        scopes: ["profile", "email"]
      });
      
      if (result.type === "success") {
        const userInfo = await fetch(
          "https://www.googleapis.com/userinfo/v2/me",
          {
            headers: { Authorization: `Bearer ${result.accessToken}` },
          }
        );
        const { email, family_name, given_name } = await userInfo.json();
        updateFormData(email, family_name, given_name);
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    } finally{
      setLoading(false);
    }
  };
  const updateFormData = (email, firstName, lastName) => {
    emailInput.setValue(email);
    fNameInput.setValue(firstName);
    lNameInput.setValue(lastName);
    const [username] = email.split("@");
    usernameInput.setValue(username); //email 주소 @ 앞부분을 username으로 가져옴
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <AuthInput
          {...fNameInput}
          placeholder="First name"
          autoCapitalize="words"
        />
        <AuthInput
          {...lNameInput}
          placeholder="Last name"
          autoCapitalize="words"
        />
        <AuthInput
          {...emailInput}
          placeholder="Email"
          keyboardType="email-address"
          returnKeyType="send"
          autoCorrect={false}
        />
        <AuthInput
          {...usernameInput}
          placeholder="Username"
          returnKeyType="send"
          autoCorrect={false}
        />
        <AuthButton loading={loading} text={"Sign up"} onPress={handleSignup} />
        <FBContainer>
          <AuthButton
            bgColor={"#2D4DA7"}
            loading={false}
            onPress={fbLogin}
            text="Connect Facebook"
          />
        </FBContainer>
        <GoogleContainer>
          <AuthButton
            bgColor={"#EE1922"}
            loading={false}
            onPress={googleLogin}
            text="Connect Google"
          />
        </GoogleContainer>
      </View>
    </TouchableWithoutFeedback>
  );
};