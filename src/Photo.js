//import './Photo.css'; // importing css file
import axios from "axios"; // import URL fetch request
import React, { useState, useEffect } from "react"; // importing React into js file

function Photo(props) {
//   console.log(props);
  function createFlickrURL(obj) {
    // this function is fed the object shown on line 44 below
    // https://live.staticflickr.com/{server-id}/{id}_{secret}_{size-suffix}.jpg
    return `https://live.staticflickr.com/${obj.server}/${obj.id}_${obj.secret}_${"z"}.jpg`; // size suffix z = 640px - has to be string, this info is on the flickr api documentation page
  }

  return (
    <li>
      {/* {props.photoObj.id} -> used this line early on in making this project to make sure that a photo was being accessed. If un-commented, a group of numbers appears as an id over each individual image.*/}
      <br></br>
      <img class="ImgSizeMobile ImgSizeTablet ImgSizeDesktop" src={createFlickrURL(props.photoObj)}></img>
      {/* createFlickrURL consumes obj and returns URL string that delivers img */}
    </li>
  );
}

export default Photo; // this is called in the index.js file
