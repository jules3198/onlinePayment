import { useState, useEffect } from 'react';

export default function callLogin() {
  const [items, setItems] = useState([]);

  const listMerchants = [];
  useEffect(() => {
    fetch('http://localhost:3001/merchants')
      .then((res) => res.json())
      .then(
        (result) => {
          setItems(result.items);
          listMerchants.push(items);
        }
      );
  }, []);

  console.log(listMerchants);
  return listMerchants;
}
