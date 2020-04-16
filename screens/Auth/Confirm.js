import React, { useState } from "react";
import styled from "styled-components";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useMutation } from "react-apollo-hooks";
import { COMFIRM_SECRET } from "./AuthQueries";
import { useLogIn } from "../../AuthContext";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

export default ({ navigation, route }) => {
  const confirmInput = useInput("");
  const logIn = useLogIn();
  const [loading, setLoading] = useState(false);
  const [confirmSecretMutation] = useMutation(COMFIRM_SECRET, {
    variables: {
      secret: confirmInput.value,
      email: route.params.email
    }
  });

  const handleConfirm = async () => {
    //유효성 검사
    const { value } = confirmInput;
    if(value==="" || !value.includes(" ")){
      return Alert.alert("Invalid secret");
    }
    try {
      setLoading(true);
      const {data: {confirmSecret}} = await confirmSecretMutation();
      if(confirmSecret!="" || confirmSecret !==false){
        logIn(confirmSecret);
      }else{
        Alert.alert("Wrong Secret!");
      }
    } catch (e) {
      console.log(e);
      Alert.alert("Can't confirm secret");
    } finally {
      setLoading(false);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <AuthInput
          {...confirmInput}
          placeholder="secret"
          returnKeyType="send"
          onSubmitEditing={handleConfirm}
          autoCorrect={false}
        />
        <AuthButton loading={loading} text={"Confirm"} onPress={handleConfirm} />
      </View>
    </TouchableWithoutFeedback>
  );
};