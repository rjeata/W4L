import "./styles.css";
import axios from 'axios'
import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import UserInput from './components/UserInput';

export default function App() {
  // state for fetched data
  const [data, setData] = useState({});

  // state for autoplay
  const [autoplay, setAutoplay] = useState(false);

  const [isSearching, setIsSearching] = useState(false);

  // fetch populated json from API
  const fetchData = () => {
    axios.get('/api/json-data')
      .then(response => {setData(response.data);})
      .catch(error => {
        console.error('Error fetching data: ', error);
    });
  };

  const toggleSearch = () => {
    if (isSearching) {
      stopSearch();
    } else {
      startSearch();
    }
    setIsSearching(!isSearching);
  };

  // functions to start/ stop carousel
  function startSearch() {
    setAutoplay(true);
  }

  function stopSearch() {
    setAutoplay(false);
  }

  // fetch data to reload page
  function refreshData(){
    fetchData();
  }

  return (
    <div className="App">
      <h1>What's for lunch?</h1>

      <Carousel className="crsl" 
        infiniteLoop centerMode
        showThumbs={false} showStatus={false}
        showIndicators={false} showArrows={true} 
        swipeable emulateTouch
        autoPlay={autoplay} interval={100}
        stopOnHover={false}>
        {data.results && data.results.length > 0 ? (
          data.results.map((result, index) => {
            console.log('Rendering restaurant:', result.name);
            return (
              <div key={index}>
              <img src={result.icon} alt={`${result.name} icon`} />
              {result.photos && result.photos.map((photo, photoIndex) => (
                <div key={photoIndex}>
              </div>
              ))}
                <p className="legend">{result.vicinity}</p>
                <p className="name">{result.name} </p>      
              </div>
            );
          })
        ) : (
          <p>No data available</p>
        )}
      </Carousel>

      <button onClick={toggleSearch}>
      {isSearching ? 'Stop Search' : 'Start Search'}
      </button>
      <button onClick={refreshData}>Refresh Data</button>

      <h2> Enter restaurant information: </h2>
      <UserInput/> 

    </div>
  );
}