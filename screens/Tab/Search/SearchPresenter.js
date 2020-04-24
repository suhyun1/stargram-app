import React, { useState } from "react";
import PropTypes from "prop-types";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import { ScrollView, RefreshControl } from "react-native";
import Loader from "../../../components/Loader";
import SquarePhoto from "../../../components/SquarePhoto";

export const SEARCH = gql`
  query search($term: String!) {
    searchPost(term: $term) {
      id
      files {
        id
        url
      }
      likeCount
      commentCount
    }
  }
`;

const SearchPresenter = ({ term, fetch }) => {
    const [refreshing, setRefreshing ] = useState(false);
    const {data, loading, refetch} = useQuery(SEARCH, {
        variables:{
            term
        },
        skip: !fetch,    //fetch가 false이면 쿼리 요청 스킵
        fetchPolicy: "network-only" //캐시 사용하지 않음
    });
    const onRefresh = async() => {
        try{
            setRefreshing(true);
            await refetch({variables: {term}});
        }catch(e){
            console.log(e);
        }finally{
            setRefreshing(false);
        }
    };

    return (
        <ScrollView refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
            }
        >
            {loading ? (
                <Loader/>
            ) : (
                    data &&
                    data.searchPost &&
                    data.searchPost.map(post => <SquarePhoto key={post.id} {...post} />)
            )}
        </ScrollView>
    );
};


SearchPresenter.propTypes = {
    term: PropTypes.string.isRequired,
    fetch: PropTypes.bool.isRequired
};

export default SearchPresenter;