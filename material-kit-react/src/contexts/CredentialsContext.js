import { createContext, useState } from 'react';

export const CredentialsContext = createContext();

// ThemeContext.Provider;
//    va diffuser la data du context dans les composants enfant de celui-ci

// ThemeContext.Consumer;
//    va récuperer la data envoyé par le premier Provider ascendant trouvé

export default function CredentialsProvider({ children }) {
  const [credentials, setCredentials] = useState(
    JSON.parse(localStorage.getItem('credentials') || 'null')
  );

  const save = (clientID, clientSecret) => {
    localStorage.setItem(
      'credentials',
      JSON.stringify({
        clientID,
        clientSecret,
      })
    );
    setCredentials({
      clientID,
      clientSecret,
    });
  };

  const token = credentials && btoa(`${credentials.clientID}:${credentials.clientSecret}`);
  // base64_encode(username:password)

  return (
    <CredentialsContext.Provider
      value={{ decodedCredentials: credentials, token, save }}
    >
      {children}
    </CredentialsContext.Provider>
  );
}
