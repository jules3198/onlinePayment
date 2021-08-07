import { useContext, useMemo } from "react";
import { useParams } from "react-router";
import { ListContext } from "../../contexts/ListContext";

export default function ShowItem() {
  const { id } = useParams();
  const { getItem, isReady } = useContext(ListContext);

  const item = useMemo(() => getItem(parseInt(id)), [id, isReady]);

  return (
    <p>
      {id} {item?.name}
    </p>
  );
}