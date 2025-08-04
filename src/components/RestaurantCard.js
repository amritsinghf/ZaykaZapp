import { SWIGGY_BASE_URL } from "../utils/constants"


const RestaurantCard = ({ items }) => {
    const { name, avgRating, cuisines, costForTwo, sla, cloudinaryImageId } = items?.info
    return (
        <div className="res-card">
            <div className="res-image-container">
                <img src={SWIGGY_BASE_URL + cloudinaryImageId} className="res-image" />
                <div className="rating-container">
                    ⭐ {avgRating}
                </div>
            </div>

            <div className="card-items">
                <h3 className="res-name">{name}</h3>
                <div className="cuisine-container">
                    {cuisines.join(", ")}
                </div>

                <p className="card-text">{costForTwo}</p>
                <p className="card-text">{sla?.slaString ? `Delivery in ${sla.slaString}` : ""}</p>
            </div>
        </div>
    )
}


export default RestaurantCard