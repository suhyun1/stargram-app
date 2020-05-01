import React, { useState } from "react";
import axios from "axios";
import { Image, ActivityIndicator, Alert } from "react-native";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useMutation } from "react-apollo-hooks";
import useInput from "../../hooks/useInput";
import style from "../../style";
import constants from "../../constants";
import apolloClientOptions from "../../apollo";
import { FEED_QUERY } from "../Tab/Home";

const UPLOAD = gql`
  mutation upload($caption: String!, $files: [String!]!, $location: String){
    upload(caption: $caption, files: $files, location: $location ){
      id
      caption
      location
    }
  }
`;

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
  const photo = route.params.photo;
  const captionInput = useInput("");
  const locationInput = useInput("");
  const [uploadMutation] = useMutation(UPLOAD, {
    refetchQueries: () => [{ query: FEED_QUERY }],
  });
  const handleSubmit = async() => {
    if (captionInput.value === "" || locationInput.value === "") {
      Alert.alert("All fields are required");
    }
    const formData = new FormData();
    const name = photo.filename;
    const [, type] = name.split(".");
    formData.append("file", {
      name,
      // type: type.toLowerCase(),
      type: "image/jpeg",
      uri: photo.uri
    });
    try{
      setIsLoading(true);
      const {
        data: { location },
      } = await axios.post(
        apolloClientOptions.uri.toString() + "/api/upload",
        formData,
        {
          headers: {
            "content-type": "multipart/form-data",
          }
        }
      );
      const {
        data: { upload },
      } = await uploadMutation({
        variables: {
          caption: captionInput.value,
          files: [location],
          location: locationInput.value,
        },
      }); //mutation 호출할 때 variable 추가
      if(upload.id){
        navigation.navigate("TabNavigation");
      }
    }catch(e){
      Alert.alert("Cant upload", "Try later");
      console.log(e);
    }finally{
      setIsLoading(false);
    }
  };
  return (
    <View>
      <Container>
        <Image
          source={{ uri: photo.uri }}
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
