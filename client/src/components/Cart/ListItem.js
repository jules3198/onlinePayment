import { useContext } from "react";
import { ListContext } from "../../contexts/ListContext";
import Button from "../lib/Button";

export default function ListItem({ item, onEdit }) {
    const { deleteItem } = useContext(ListContext);

    return (
        <li>
            {item.name} {item.unitPrice} {item.quantity}
            <Button title="delete" onClick={() => deleteItem(item)} />
            <Button title="edit" onClick={() => onEdit(item)} />
        </li>
    );
}