import axios from "axios";

export const searchPF = (category, searchQuery, setAnimalsList, setOrganizationsList, findLocation) => {
    let url = "http://localhost:5050/api/PF_API";
    let reqConfig = {
        params: {
            endpoint: category,
            location: searchQuery.location,
            distance: searchQuery.distance
        }
    }
    
    axios.get(url, reqConfig).then((response) => {
        if (category === "animals") {
            setOrganizationsList([]);
            setAnimalsList(response.data.animals);
        }
        if (category === "organizations") {
            setAnimalsList([]);
            setOrganizationsList(response.data.organizations);
        }
        findLocation(searchQuery.location)
    }).catch((e) => {
        console.log(e);
    })
}