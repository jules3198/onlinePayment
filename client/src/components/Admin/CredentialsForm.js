import React, { useState } from "react";
import Button from "../lib/Button";

export default function CredentialsForm({ onSubmit, defaultValues }) {
  const [values, setValues] = useState(
    defaultValues || {
      clientID: "",
      clientSecret: "",
    }
  );

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = () => {
    onSubmit(values);
  };

  return (
    <div>
      <input value={values.clientID} name="clientID" onChange={handleChange} />
      <input
        value={values.clientSecret}
        type="password"
        name="clientSecret"
        onChange={handleChange}
      />
      <Button title="Submit" onClick={handleSubmit} />
    </div>
  );
}