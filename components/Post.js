import React, { useState } from "react";
import { Image, Platform } from "react-native";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import Swiper from "react-native-swiper";
import { gql } from "apollo-boost";
import constants from "../constants";
import style from "../style";
import { useMutation } from "react-apollo-hooks";

const LIKE_POST = gql`
    mutation toggleLike($postId: String!){
        toggleLike(postId: $postId)
    }
`;

const Container = styled.View`
`;
const Header = styled.View`
    padding: 15px;
    flex-direction: row;
    align-items: center;
`;
const Touchable = styled.TouchableOpacity``;
const HeaderUserColumn = styled.View`
    margin-left: 10px;
`;
const Bold = styled.Text`
    font-weight: bold;
`;
const Location = styled.Text`
    font-size: 12px;
`;
const IconsContainer = styled.View`
    flex-direction: row;
    margin-bottom: 3px;
`;

const IconContainer = styled.View`
    margin-right: 10px;
`;

const InfoContainer = styled.View`
    padding: 12px;
`;

const Caption = styled.Text`
    margin: 3px 0px;
`;
const CommentCount = styled.Text`
    opacity: 0.5;
    font-size: 13px;
`;

const Post = ({
id,
  user,
  location,
  files = [],
  likeCount: likeCountProp,
  caption,
  comments = [],
  isLiked: isLikedProp
}) => {
    const [isLiked, setIsLiked] = useState(isLikedProp);
    const [likeCount, setlikeCount] = useState(likeCountProp);
    const [toggleLikeMutation] = useMutation(LIKE_POST, {
        variables:{
            postId: id
        }
    });
    const handleLike = async() => {
        if(isLiked===true){
            setlikeCount((l) => l - 1);
        }else{
            setlikeCount((l) => l + 1);
        }
        setIsLiked((p) => !p);

        try{
            await toggleLikeMutation();
        }catch(e){
            console.log(e);
        }
    };
  return (
    <Container>
      <Header>
        <Touchable>
          <Image
            style={{ height: 40, width: 40, borderRadius: 20 }}
            source={{ uri: user.avatar }}
          />
        </Touchable>
        <Touchable>
          <HeaderUserColumn>
            <Bold>{user.username}</Bold>
            <Location>{location}</Location>
          </HeaderUserColumn>
        </Touchable>
      </Header>
      <Swiper
        showsPagination={false}
        style={{ height: constants.height / 2.5 }}
      >
        {files &&
          files.map((file) => (
            <Image
              style={{
                height: constants.height / 2.5,
                width: constants.width,
              }}
              key={file.id}
              source={{ uri: file.url }}
            />
          ))}
      </Swiper>
      <InfoContainer>
        <IconsContainer>
          <Touchable onPress={handleLike}>
            <IconContainer>
              <Ionicons
                size={28}
                color={isLiked ? style.redColor : style.blackColor}
                name={
                  Platform.OS === "ios"
                    ? isLiked
                      ? "ios-heart"
                      : "ios-heart-empty"
                    : isLiked
                    ? "md-heart"
                    : "md-heart-empty"
                }
              />
            </IconContainer>
          </Touchable>
          <Touchable>
            <IconContainer>
              <Ionicons
                size={28}
                color={style.blackColor}
                name={Platform.OS === "ios" ? "ios-text" : "md-text"}
              />
            </IconContainer>
          </Touchable>
        </IconsContainer>
        <Touchable>
          <Bold>{likeCount === 1 ? "1 like" : `${likeCount} likes`}</Bold>
        </Touchable>
        <Caption>
          <Bold>{user.username}</Bold> {caption}
        </Caption>
        <Touchable>
          <CommentCount>See all {comments.length} comments</CommentCount>
        </Touchable>
      </InfoContainer>
    </Container>
  );
};

Post.propTypes = {
    id: PropTypes.string.isRequired,
    user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        avatar: PropTypes.string,
        username: PropTypes.string.isRequired
    }).isRequired,
    files: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired
        })
    ).isRequired,
    likeCount: PropTypes.number.isRequired,
    isLiked: PropTypes.bool.isRequired,
    comments: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            user: PropTypes.shape({
                id: PropTypes.string.isRequired,
                username: PropTypes.string.isRequired
            }).isRequired
        })
    ).isRequired,
    caption: PropTypes.string.isRequired,
    location: PropTypes.string,
    createdAt: PropTypes.string.isRequired
};

export default Post;