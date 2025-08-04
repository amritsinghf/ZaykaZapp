import { useEffect, useState } from "react";
import { Link } from "react-router";
import { LOGO_URL } from "../utils/constants"

const Header = () => {
    const [btnName, setBtnName] = useState("Login")
    const handleLogoutbtn = () => {
        if (btnName == "Login") {
            setBtnName("Logout")
        } else {
            setBtnName("Login")
        }
    }

    useEffect(() => {
        console.log("Hello world")
    }, [btnName])
    return (
        <div className="header-container">
            <div className="logo-container">
                <img src={LOGO_URL} alt="zayka logo" className="logo" />
            </div>
            <div className="nav-items">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About Us</Link>
                    </li>
                    <li><Link to="/contactUs">Contact Us</Link></li>
                    <li>Cart</li>
                    <li><button className="loginBtn" onClick={handleLogoutbtn}>{btnName}</button></li>
                </ul>
            </div>
        </div>
    );
};

export default Header