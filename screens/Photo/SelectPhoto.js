import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as Permissions from "expo-permissions"; 
import * as MediaLibrary from "expo-media-library";
import Loader from "../../components/Loader";
import { Image, ScrollView, TouchableOpacity } from "react-native";
import constants from "../../constants";
import style from "../../style";

const View = styled.View`
  flex: 1;
`;

const Button = styled.TouchableOpacity`
  width: 100px;
  height: 30px;
  position: absolute;
  right: 5px;
  top: 15px;
  background-color: ${style.blueColor};
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`;

const Text = styled.Text`
  color: white;
  font-weight: 600;
`;

export default ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);
  const [selected, setSelected] = useState();
  const [allPhotos, setAllPhotos] = useState();
  const changeSelcted = (photo) => {  //사진 선택 시
    setSelected(photo);
  };
  const getPhotos = async() => {
    try{
      const { assets } = await MediaLibrary.getAssetsAsync({
        sortBy: [[MediaLibrary.SortBy.creationTime, false]],
      });
      const [firstPhoto] = assets;
      setSelected(firstPhoto);
      setAllPhotos(assets);
    }catch(e){
      console.log(e);
    }finally{
      setLoading(false);
    }
  };
  const askPermission = async() => {
    try{
    const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if(status === "granted"){
      setHasPermission(true);
      getPhotos();
    }
    }catch(e){
      console.log(e);
      hasPermission(false);
    }
  };
  const handleSelcted = () => {
    navigation.navigate("Upload", { photo: selected})
  };
  useEffect(()=> {
    askPermission();
  },[]);
  return (
    <View>
      {loading ? (
        <Loader />
      ) : (
        <View>
          {hasPermission ? (
            <>
              <Image
                style={{ width: constants.width, height: constants.height / 2 }}
                source={{ uri: selected.uri }}
              />
              <Button onPress={handleSelcted}>
                <Text>Select Photo</Text>
              </Button>
              <ScrollView
                contentContainerStyle={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                {allPhotos.map((photo) => (
                  <TouchableOpacity
                    key={photo.id}
                    onPress={() => changeSelcted(photo)}
                  >
                    <Image
                      style={{
                        width: constants.width / 3,
                        height: constants.height / 6,
                        opacity: photo.id === selected.id ? 0.5 : 1
                      }}
                      source={{ uri: photo.uri }}
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </>
          ) : null}
        </View>
      )}
    </View>
  );
};