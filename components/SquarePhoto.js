import React from "react";
import { Image, TouchableOpacity, Text } from "react-native";
import PropTypes from "prop-types";
import constants from "../constants";

const SquarePhoto = ({files=[], id}) => (
        <TouchableOpacity>
            <Image
                source={{ uri: files[0].url }}
                style={{ width: constants.width / 3, height: constants.height / 6 }}
            />
            {files.length === 0 && <Text>None</Text>}
        </TouchableOpacity>    
);

SquarePhoto.propTypes = {
    files: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired
        })
    ).isRequired,
    id: PropTypes.string.isRequired
};

export default SquarePhoto;