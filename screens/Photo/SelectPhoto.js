import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as Permissions from "expo-permissions"; 
import * as MediaLibrary from "expo-media-library";
import Loader from "../../components/Loader";
import { Image, ScrollView } from "react-native";
import constants from "../../constants";

const View = styled.View`

  flex: 1;
`;

const Text = styled.Text``;

export default ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);
  const [selected, setSelected] = useState();
  const [allPhotos, setAllPhotos] = useState();
  const getPhotos = async() => {
    try{
      const {assets} = await MediaLibrary.getAssetsAsync();
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
              <ScrollView contentContainerStyle={{flexDirection: "row", flexWrap:"wrap"}}>
                {allPhotos.map((photo) => (
                  <Image
                    key={photo.id}
                    style={{
                      width: constants.width / 3,
                      height: constants.height / 6,
                    }}
                    source={{ uri: photo.uri }}
                  />
                ))}
              </ScrollView>
            </>
          ) : null}
        </View>
      )}
    </View>
  );
};