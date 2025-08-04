import { useState, useEffect } from "react"
import RestaurantCard from "./RestaurantCard"
import ShimmerUI from "./ShimmerUI";
import { Link } from "react-router";

const Body = () => {
    const [listOfRestaurant, setListOfRestaurant] = useState([]);
    const [filterListOfRestaurant, setFilterListOfRestaurant] = useState([])
    const [searchText, setSearchText] = useState("")
    const [isLoading, setIsLoading] = useState(true);


    const handleTopRatedRestaurant = () => {
        const filterListOfRestaurant = listOfRestaurant.filter((item) => item.info.avgRating > 4)
        setFilterListOfRestaurant(filterListOfRestaurant)
    }

    useEffect(() => {
        fetchData()
    }, [])


    const fetchData = async () => {
        setIsLoading(true);

        try {
            const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.7459514&lng=77.1880559&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING")
            const response = await data.json()
            setListOfRestaurant(response.data.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
            setFilterListOfRestaurant(response.data.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants)

        } catch (err) {
            console.error("Failed to fetch restaurants", err);
        }
        setIsLoading(false);
    }


    const handleSearchRestaurant = (e) => {
        setSearchText(e.target.value);
        const searchText = e.target.value.toLowerCase();
        const result = listOfRestaurant.filter((item) =>
            item.info.name.toLowerCase().includes(searchText)
        );
        setFilterListOfRestaurant(result)
    }

    return (
        <div className="body-container">
            <div className="filters-container">
                <div className="res-search-container">
                    <div className="search">Search</div>
                    <input type="text" placeholder="Search the restaurant" onChange={handleSearchRestaurant} value={searchText} />
                </div>

                <button onClick={handleTopRatedRestaurant} className="top-rated-btn">Top rated restaurant</button>
            </div>
            <div className="res-container">
                {isLoading ? (
                    <ShimmerUI />
                ) : filterListOfRestaurant.length > 0 ? (
                    filterListOfRestaurant.map((items) => (
                        <Link to={`/restaurants/${items.info.id}`} key={items.info.id}>
                            <RestaurantCard items={items} />
                        </Link>
                    ))
                ) : (
                    <div className="no-results">🍽️ No restaurants found.</div>
                )}
            </div>
        </div>
    )
}
export default Body