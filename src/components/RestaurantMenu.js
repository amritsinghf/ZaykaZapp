import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import ShimmerUI from "./ShimmerUI";
import { MENU_API_URL, SWIGGY_BASE_URL } from "../utils/constants";

const RestaurantMenu = () => {
    const { resId } = useParams();
    const [resInfo, setResInfo] = useState(null);

    useEffect(() => {
        fetchMenu();
    }, []);

    const fetchMenu = async () => {
        try {
            const data = await fetch(
                MENU_API_URL + resId
            );
            const response = await data.json();
            setResInfo(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const { name, areaName, cloudinaryImageId, cuisines } =
        resInfo?.cards[2]?.card?.card?.info || {};

    const { itemCards } =
        resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card || {};
    console.log(itemCards)
    return (
        <div className="restaurant-menu">
            {!resInfo ? (
                <ShimmerUI />
            ) : (
                <div className="menu-container">
                    <div className="restaurant-details">
                        <img
                            src={SWIGGY_BASE_URL + cloudinaryImageId}
                            alt={name}
                            className="restaurant-image"
                        />
                        <div className="restaurant-info">
                            <h1>{name}</h1>
                            <p>{areaName}</p>
                            <p>{cuisines?.join(", ")}</p>
                        </div>
                    </div>

                    <h2 className="menu-heading">Menu</h2>
                    <ul className="menu-items">
                        {itemCards?.map((item) => (
                            <li key={item.card.info.id} className="menu-item">
                                <div className="menu-item-header">
                                    <span>{item.card.info.name}</span>
                                    <span>
                                        ₹
                                        {item.card.info.price / 100 ||
                                            item.card.info.defaultPrice / 100}
                                    </span>
                                </div>
                                <p className="menu-item-description">{item.card.info.description}</p>
                            </li>
                        ))}
                    </ul>

                </div>
            )}
        </div>
    );
};

export default RestaurantMenu;
