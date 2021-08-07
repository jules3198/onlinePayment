import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import Button from "./lib/Button";
import ButtonOldWay from "./lib/ButtonOldWay";

function Header() {
    const { toggleTheme } = useContext(ThemeContext);
    return (
        <nav>
            Website
            <Button title="contact" />
            <ButtonOldWay title="Toggle theme" onClick={toggleTheme} />
        </nav>
    );
}

export default Header;