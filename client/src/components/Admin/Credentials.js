import CredentialsForm from "./CredentialsForm";
import { CredentialsContext } from "../../contexts/CredentialsContext";
import { useContext } from "react";

export default function Credentials() {
  const { token, save, decodedCredentials } = useContext(CredentialsContext);
  return (
    <>
      <CredentialsForm
        defaultValues={decodedCredentials}
        onSubmit={(values) => save(values.clientID, values.clientSecret)}
      />
      <p>{token}</p>
    </>
  );
}