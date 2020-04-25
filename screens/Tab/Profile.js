import React, { useEffect, useLayoutEffect } from "react";
import {gql} from "apollo-boost";
import { ScrollView } from "react-native";
import { USER_FRAGMENT } from "../../fragment";
import { useQuery } from "react-apollo-hooks";
import Loader from "../../components/Loader";
import UserProfile from "../../components/UserProfile";

export const ME = gql`
  {
    me {
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`;

export default ({navigation, route}) => {
  const {loading, data} = useQuery(ME);

  return (
    <ScrollView>
      {loading ? 
        <Loader/> : 
        data && data.me && <UserProfile {...data.me}/>
      }
    </ScrollView>
  )
};
