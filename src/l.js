import React, { useEffect, useState } from "react";
import axios from "axios";
import'./App.css'

const RestaurantByCityz = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [inputCity, setInputCity] = useState("");
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);

    // Fetch restaurant data from API
    useEffect(() => {
        axios.get('http://localhost:5402/shoes')
            .then((res) => {
                console.log("API response:", res.data.list);
                setRestaurants(res.data.list); // Assuming API response has a 'list' property
                setFilteredRestaurants(res.data.list); // Initially, show all restaurants
            })
            .catch(err => console.error("Error fetching data:", err));
    }, []);

    // Input change handler
    const handleInputChange = (event) => {
        setInputCity(event.target.value);
    };

    // Filter logic triggered by Search button
    const handleSearch = () => {
        if (inputCity.trim()) {
            const cityToSearch = inputCity.trim().toLowerCase();
            const filtered = restaurants.filter(r => r.category.toLowerCase() === cityToSearch);
            setFilteredRestaurants(filtered);
        } else {
            setFilteredRestaurants(restaurants); // Show all restaurants if input is empty
        }
    };

    return (
        <div>
            <div className="ne">
            <input
                type="text"
                value={inputCity}
                onChange={handleInputChange}
                placeholder="Enter City Name"
            />
            <button onClick={handleSearch}>Search</button></div>
            {filteredRestaurants.map(data => (
                            <div className="mxs">
                            <div  key={data.id} className="card__mxs">
                               <article class="card__article">
                                  <img src={data.img} lt={data.name} class="card__img"/>
                   
                                  <div className="card__data">
                                  <h1>{data.name}</h1>
                                  <h5>{data.id}</h5>
                              <p><h2>{data.brand}</h2></p>
                              <p className="price">${data.price}</p>
                              <p>{data.category}</p>
                              <p>{data.gender}</p>
                              <p><button>Add to Cart</button></p>
                   
                                     
                                  </div>
                               </article>
                   
                              
                            </div>
                         </div>
            ))}
        </div>
    );
};

export default RestaurantByCityz;
