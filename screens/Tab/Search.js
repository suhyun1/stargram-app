import React, { useLayoutEffect, useState } from "react";
import styled from "styled-components";
import SearchBar from "../../components/SearchBar";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

export default ({navigation, route}) =>{
  const [term, setTerm] = useState("");
  const onChange = text => {
    setTerm(text);
  };
  const onSubmit = () => {
    console.log("submit");
  }
  navigation.setOptions({
    headerTitle: () => (
      <SearchBar value={term} onChange={onChange} onSubmit={onSubmit}/>
    )
  });
  return (
    <View>
      <Text>Search</Text>
    </View>
  );
}; 
