import React, { useState } from "react";
import SearchBar from "../../../components/SearchBar";
import SearchPresenter from "./SearchPresenter"

export default ({ navigation, route }) => {
    const [term, setTerm] = useState("");
    const [fetch, setFetch] = useState(false);

    const onChange = text => {
        setTerm(text);
        setFetch(false);
    };
    const onSubmit = () => {
        setFetch(true);
    }
    navigation.setOptions({
        headerTitle: () => (
            <SearchBar value={term} onChange={onChange} onSubmit={onSubmit} />
        )
    });

    return <SearchPresenter term={term} fetch={fetch}/>;
};