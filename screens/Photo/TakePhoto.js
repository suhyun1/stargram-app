import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as Permissions from "expo-permissions"; 
import { Camera } from 'expo-camera';
import {Ionicons} from "@expo/vector-icons";
import Loader from "../../components/Loader";
import constants from "../../constants";
import { TouchableOpacity } from "react-native";
import style from "../../style";

const View = styled.View`
  flex: 1;
`;

export default ({navigation}) =>{
  const [loading, setLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const askPermission = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      if (status === "granted") {
        setHasPermission(true);
      }
    } catch (e) {
      console.log(e);
      hasPermission(false);
    }finally{
      setLoading(false);
    }
  };
  const toggleType = () => {
    if(cameraType === Camera.Constants.Type.front){
      setCameraType(Camera.Constants.Type.back);
    }else{
      setCameraType(Camera.Constants.Type.front);
    }
  };
  useEffect(() => {
    askPermission();
  }, []);

  return (
    <View>
      {loading ? (
        <Loader/>
      ) : hasPermission ? (
        <Camera 
          type={cameraType}
          styles={{
            justifyContent: "flex-end",
            padding: 15,
            width: constants.width, 
            height: constants.height/2
          }}
        >
          <TouchableOpacity onPress={toggleType}>
            <Ionicons name={Platform.OS === "ios" ? "ios-reverse-camera" : "md-reverse-camera"} size={28} color={style.blackColor}/>
          </TouchableOpacity>
        </Camera>
      ): null}
    </View>
  );
};
