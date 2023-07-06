import { OrgMarker } from "../components/Markers";

export const getAddressString = (address) => {
  let addrString = "";
  if (address.address1) {
    addrString += address.address1;
    if (address.address2)
      addrString += " " + address.address2 + ", "; 
  }
  addrString += address.city;
  addrString += ", " + address.state;
  addrString += " " + address.postcode;
  addrString += " " + address.country;

  return addrString;
}

const handleOrgCoordDuplicates = (orgCoordList) => {
    let hashmap = {}
    let duplicates = []
    orgCoordList.map((org, key) => {
      if (hashmap[org.location.label]) {
        duplicates.push(key);
      }
      else {
        hashmap[org.location.label] = org;
      }
      return null;
    })
    duplicates.map((index) => {
      console.log("HANDLING DUPE");
      let offsetScale = Math.random() > 0.5 ? -.005 : .005;
      let xOffset = Math.random() * offsetScale;
      let yOffset = Math.random() * offsetScale;
      orgCoordList[index].location.x += xOffset;
      orgCoordList[index].location.y += yOffset;
      console.log(xOffset, yOffset);
      return null;
    })
}

const createOrgMarkers = (orgCoordList, setMarkers) => {
    let markers = [];
    orgCoordList.map((org, key) => {
      let photo;
      for (let photoIndex in org.photos) {
        photo = org.photos[photoIndex].small
      }
      if (!photo) {
        photo = "https://t3.ftcdn.net/jpg/01/63/12/16/360_F_163121616_76WYhq1hFN5B3BJYfASSp9ekLUBWUvhR.jpg";
      }
      markers.push(
        <OrgMarker key={key} org={org} photo={photo}/>
      )
      return null;
    })
    setMarkers(markers);
}

export const mapOrgs = async (organizationsList, provider, setMarkers) => {
    // Asynchronously get all organization coordinates using Esri API
    // Collect coordinates over time, create Markers from them and wait till all are gathered
    let orgCoordResults = await Promise.all(organizationsList.map(async (org) => {
      console.log(org);
      let locResult = await provider.search({query: getAddressString(org.address)})
      if (locResult) {
        console.log(locResult);
        org.location=locResult[0];
        return org;
      }
    }));
    // Offset the positions of orgs with duplicate coords to avoid blocking
    handleOrgCoordDuplicates(orgCoordResults);
    // Once all markers are available and processed set them to be displayed
    createOrgMarkers(orgCoordResults, setMarkers);
}