import React, { useContext, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import Button from "./lib/Button";

const elems = [];
const item = {};
const ready = false;

function ButtonGroup() {
    const { toggleTheme } = useContext(ThemeContext);
    const [visible, setVisible] = useState(true);
    return (
        <>
            <Button
                title={`${(visible && "Hide") || "Display"} buttons`}
                onClick={() => setVisible(!visible)}
            />
            {visible && (
                <>
                    <Button title="coucou" onClick={() => alert("coucou")} />
                    <Button title="foo" onClick={() => alert("foo")} />
                    <Button title={true} />
                    <Button variant="icon" title={10} size={40} />
                    {elems.length > 0 && (
                        <ul>
                            <li>{item.deleteable && <button>Delete</button>} Item</li>
                        </ul>
                    )}
                    {!elems.length && ready && "No Elements"}
                    {!elems.length && !ready && "Loading"}
                    <Button title={(() => "ToggleTheme")()} onClick={toggleTheme} />
                    <Button variant="rounded" title={["test", "test2"]} />
                </>
            )}
        </>
    );
}

export default ButtonGroup;