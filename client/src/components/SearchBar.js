// SearchBar component
// Get search query and make request to server

import { useState } from "react"
import axios from "axios";
import {EsriProvider} from "leaflet-geosearch";
import {searchPF} from "../api_funcs/searchFuncs.js";

export const SearchBar = (props) => {
    const setLocation = props.setLocation;
    const setAnimalsList = props.setAnimalsList;
    const setOrganizationsList = props.setOrganizationsList;

    const provider = new EsriProvider();

    const [category, setCategory] = useState('organizations')
    const [searchQuery, setSearchQuery] = useState({
        location: '',
        distance: 10
    });

    const findLocation = async (query) => {
        let response = await provider.search({query: query});
        console.log(response);
        setLocation({...response[0], zoom: 10});
    }

    const handleSearchQueryChange = (event) => {
        let newQuery = {...searchQuery}
        newQuery[event.target.name] = event.target.value;
        setSearchQuery(newQuery);
    }
    const handleSearchCategoryChange = (event) => {
        setCategory(event.target.value)
    };

    const handleSearch = () => {
        searchPF(category, searchQuery, setAnimalsList, setOrganizationsList, findLocation);
    }

    return (
        <div className={props.className}>
            {/* <h3>Search For 
                <select value={category} onChange={handleSearchCategoryChange}>
                    <option value={"animals"}>animals</option>
                    <option value={"organizations"}>organizations</option>
                </select>
            </h3> */}
            <div className="py-2">
                <div className="flex w-[80%] m-auto">
                    <label className="mr-2 basis-1/2 text-white">Location: </label>
                    <input className="mr-4 p-1 basis-1/2 border border-slate-300" name="location" value={searchQuery.location} onChange={handleSearchQueryChange} placeholder="enter location..."></input>
                </div>
                <div className="flex w-[80%] m-auto">
                    <label className="mr-2 basis-1/2 text-white">Distance (miles):</label>
                    <input className="mr-4 p-1 basis-1/2 border border-slate-300" name="distance" type="number" value={searchQuery.distance} onChange={handleSearchQueryChange}></input>
                </div>
            </div>
            <button className="mt-2 p-2 px-8 text-lg text-white rounded-lg bg-[var(--secondary-bg)]" onClick={handleSearch}>Search</button>
        </div>
    )
}