
import React from "react";
import List from "./Cart/List";
import ListProvider from "../contexts/ListContext";

function Body() {
    return (
        <div>
            <ListProvider>
                <List />
            </ListProvider>
        </div>
    );
}

export default Body;