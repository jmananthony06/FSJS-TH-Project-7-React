//import './Photo.css'; // importing css file
// import axios from "axios"; // import URL fetch request
import React, { useState, useEffect } from "react"; // importing React into js file
import Photo from "./Photo.js";
import axios from "axios"; // import URL fetch request
import ReactDOM from "react-dom";
import {useParams} from "react-router-dom";


function Gallery(props) {
    const [photos, setPhotos] = useState([]);
    // let { topic } = useParams(); // creating var that destructures object 
    let topic = useParams().topic;
    console.log(topic);

    function searchForPhotos(term) {
        let url =
        `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=82c2463fa467c71ce62bea75e055fcb9&format=json&tags=${term}`;
        axios.get(url).then((response) => {
          // axios fetch request
          console.log(response.data);
          let substr = response.data.substring(14, response.data.length - 1); // starting at 14th character is a given substring and ending and the character before the last (dealing with API response)
          // console.log(response.data); tests response in console
          let data = JSON.parse(substr);
          // console.log(data); testing what data shows in console
          setPhotos(data?.photos?.photo || []); // array of objects filled with key value pairs.
          // .? makes sure data exists before going into the photos object and before going into the individual photo object. makes sure photos property is real and photo property is real. Makes sure what I'm trying to access is real.
        });
      }

      useEffect(() => { //lifecycle method for lack of better explanation. Used once or for when something changes. works when something happens. 
          searchForPhotos(topic);
        }, [topic]);

  return (
    <ul className = "photoList">
    {photos.map((item) => {
      // console.log(obj); // this test line returns the object in the console
      return <Photo photoObj={item} />; // photo on line 40 is dumped into and mapped into the Photo component. photoObj is the prop of Photo component. 
    })}
  </ul>
  );
}

export default Gallery; // this is called in the index.js file
