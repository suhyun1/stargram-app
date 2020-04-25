import React, { useState } from "react";
import { ScrollView, RefreshControl } from "react-native";
import { useQuery } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import { POST_FRAGMENT } from "../fragment";
import Loader from "../components/Loader";
import Post from "../components/Post";

const POST_DETAIL = gql`
    query seeFullPost($id: String!){
        seeFullPost(id: $id){
            ...PostParts
        }
    }
    ${POST_FRAGMENT}
`;


export default ({navigation, route}) => {
    const [refreshing, setRefreshing] = useState(false);
    const { loading, data, refetch } = useQuery(POST_DETAIL,{
        variables: {
            id: route.params.id
        }
    });

   
    return (
        <ScrollView>
            {loading ? 
                <Loader /> :
                data && data.seeFullPost && <Post {...data.seeFullPost}/>
            }
        </ScrollView>
    );
};
