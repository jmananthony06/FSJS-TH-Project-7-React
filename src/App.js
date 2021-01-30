import "./App.css"; // importing css file
import axios from "axios"; // import URL fetch request
import React, { useState, useEffect } from "react"; // importing React into js file
import Photo from "./Photo.js";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Gallery from "./Gallery.js";
import { useParams } from "react-router";

function App() {
  //useState gives us a var called photos and a function called setPhotos using destructuring - useState is a fundamental react hook
  const [photos, setPhotos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [termArray, setTermArray] = useState(['one', 'two', 'three']);
  // dev link to access info in flickr server, key & format are in the url
  // let url =
  //   "https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=82c2463fa467c71ce62bea75e055fcb9&format=json";
    let url =
    "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=82c2463fa467c71ce62bea75e055fcb9&format=json&tags=banana";
  // let secret = "e5288ce0f856820c";
  // let api_key = "82c2463fa467c71ce62bea75e055fcb9";
  // let format = "json";
  // let config = {
  //               api_key: api_key,
  //               format: format,
  //             };

  // useEffect only runs once on load, it's a function and also a hook
  // useEffect(() => {
  //   axios.get(url).then((response) => {
  //     // axios fetch request
  //     let substr = response.data.substring(14, response.data.length - 1); // starting at 14th character is a given substring and ending and the character before the last (dealing with API response)
  //     // console.log(response.data); tests response in console
  //     let data = JSON.parse(substr);
  //     // console.log(data); testing what data shows in console
  //     setPhotos(data.photos.photo); // array of objects filled with key value pairs
  //   });
  // }, []);

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
      setPhotos(data.photos.photo); // array of objects filled with key value pairs
    });
  }

  return (
    <div className="App">
      <input value={searchTerm} onChange={function(e) {
        // console.log(e.target.value);
        setSearchTerm(e.target.value);
      }}></input>
      <button onClick={function(e) {
        //understanding that using single letter var names isn't best practice, for a small function where var is limited to this function's scope, single letter var name is okay
        let t = searchTerm.trim().toLowerCase();
        if (t == '' || termArray.includes(t)) {
          return;
        };
        searchForPhotos(t);
        setTermArray([...termArray, t]); // using spread operator 
        setSearchTerm('');
      }}>Search</button>
      <Router>
      <div className="termArray">
        {termArray.map((item) => {
          return <Link to ={`/gallery/${item}`}>{item}</Link>;
          // return <button onClick={function(e){
          //   searchForPhotos(item);
          // }}>{item}</button>
        })}
      </div>
        <Switch>
          <Route exact path="/">a</Route>
          {/* when the path is the route with nothing after it, a is displayed  */}
          <Route exact path="/gallery/:topic"><Gallery photos={photos}/></Route>
          {/* : followed by a word is a url parameter */}
          <Route exact path="/test">b</Route>
          {/* when test is written after the slash, the letter b is displayed on the page under search bar */}
          <Route exact path="/topics/:topic"><Topic /></Route>
        </Switch>
      </Router>
    </div>
  );
}

// this function is hoisted into the code on line 90
function Topic(props) {
  let { topic } = useParams();
  console.log(topic);
  return <div>Topic</div>;
}

export default App; // this is called in the index.js file
