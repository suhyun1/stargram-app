import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { TextInput } from "react-native";
import constants from "../constants";
import style from "../style";

const SearchBar = ({onChange, value="", onSubmit}) => (
    <TextInput 
        style={{ 
            width: constants.width - 40, 
            height: 35, 
            backgroundColor: style.lightGreyColor, 
            padding: 10, 
            borderRadius: 5, 
            textAlign: "center" 
        }}

        returnKeyType="search"
        onChangeText={onChange} 
        onEndEditing={onSubmit} 
        value={value} 
        placeholder={"Search"}
        placeholderTextColor={style.darkGreyColor}
    />
);

SearchBar.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired
};

export default SearchBar;