import {
    createContext,
    useCallback,
    useEffect,
    useMemo,
    useState,
  } from "react";
  
  const defaultList = [
    { name: "foo", id: 1, unitPrice: 1, quantity: 1 },
    { name: "bar", id: 2, unitPrice: 1, quantity: 1 },
  ];
  
  export const ListContext = createContext();
  
  export default function ListProvider({ children }) {
    const [list, setList] = useState([]);
    const [ready, setReady] = useState(false);
  
    useEffect(() => setList(defaultList) || setReady(true), []);
  
    const deleteItem = useCallback(
      (item) => setList(list.filter((it) => it !== item)),
      [list]
    );
    const editItem = useCallback(
      (item) => setList(list.map((it) => (it.id === item.id ? item : it))),
      [list]
    );
    const addItem = useCallback((item) => setList([...list, item]), [list]);
  
    const totalPrice = useMemo(
      () => list.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0),
      [list]
    );
  
    const getItem = useCallback((id) => list.find((it) => it.id === id), [list]);
  
    return (
      <ListContext.Provider
        value={{
          list,
          totalPrice,
          deleteItem,
          editItem,
          addItem,
          getItem,
          isReady: ready,
        }}
      >
        {children}
      </ListContext.Provider>
    );
  }