import { useContext } from "react";
import { CredentialsContext } from "../../contexts/CredentialsContext";
import { ListContext } from "../../contexts/ListContext";
import Button from "../modules/Button";

export default function CreateTransactionButton() {
  const { token } = useContext(CredentialsContext);
  const { list, totalPrice } = useContext(ListContext);

  const generateTransaction = () => {
    fetch("http://localhost:3001/transactions", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: "BASIC " + token,
      },
      body: JSON.stringify({
        currency: "EUR",
        totalPrice,
        shippingAddress: {
          address: "1 rue Bouvier",
          zipCode: "75011",
          city: "Paris",
          country: "France",
        },
        billingAddress: {
          address: "1 rue Bouvier",
          zipCode: "75011",
          city: "Paris",
          country: "France",
        },
        consumer: {
          lastname: "Foo",
          firstname: "Bart",
        },
        cart: list,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <Button title="create transaction" onClick={() => generateTransaction()} />
  );
}