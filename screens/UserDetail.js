import React, { useState } from "react";
import { ScrollView, RefreshControl } from "react-native";
import { useQuery } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import Loader from "../components/Loader";
import UserProfile from "../components/UserProfile";
import { USER_FRAGMENT } from "../fragment";

const GET_USER = gql`
    query seeUserProfile($username: String!){
        seeUserProfile(username: $username){
            ...UserParts
        }
    }
    ${USER_FRAGMENT}
`;


export default ({  route }) => {
    const [refreshing, setRefreshing] = useState(false);
    const { loading, data, refetch } = useQuery(GET_USER, {
        variables: {
            username: route.params.username
        }
    });
  
    return (
        <ScrollView>
            {loading ?
                <Loader /> :
                data && data.seeUserProfile && <UserProfile {...data.seeUserProfile} />
            }

        </ScrollView>
    );
};
