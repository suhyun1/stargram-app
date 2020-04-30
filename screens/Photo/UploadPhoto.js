import React, { useState } from "react";
import { Image } from "react-native";
import styled from "styled-components";
import useInput from "../../hooks/useInput";
import style from "../../style";
import constants from "../../constants";

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Container = styled.View`
  padding: 20px;
  flex-direction: column;
`;

const Form = styled.View`
  justify-content: flex-start;
  margin-top: 15px;
`;

const STextInput = styled.TextInput`
  margin-bottom: 15px;
  border: 0px solid ${style.lightGreyColor};
  border-bottom-width: 1px;
  padding-bottom: 10px;
`;

const Button = styled.TouchableOpacity`
  background-color: ${props => props.theme.blueColor};
  padding: 10px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`;

const Text = styled.Text`
  color: white;
  font-weight: 600;
`;

export default ({navigation, route}) => {
  const [loading, setIsLoading] = useState(false);
  const [fileUrl, setFileUrl] = useState("");
  const captionInput = useInput("");
  const locationInput = useInput("");
  const handleSubmit =() => {
    if (captionInput.value === "" || locationInput.value === "") {
      Alert.alert("All fields are required");
    }
  };
  return (
    <View>
      <Container>
        <Image
          source={{ uri: route.params.photo.uri }}
          style={{ height: 200, width: constants.width*2/3}}
        />
        <Form>
          <STextInput
            onChangeText={captionInput.onChange}
            value={captionInput.value}
            placeholder="Caption"
            multiline={true}
            placeholderTextColor={style.darkGreyColor}
          />
          <STextInput
            onChangeText={locationInput.onChange}
            value={locationInput.value}
            placeholder="Location"
            multiline={true}
            placeholderTextColor={style.darkGreyColor}
          />
          <Button onPress={handleSubmit}>
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
                <Text>Upload </Text>
              )}
          </Button>
        </Form>
      </Container>
    </View>
  );
};
