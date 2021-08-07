import "../App.css";
import Button from "../components/lib/Button";
import Header from "../components/Header";
import Credentials from "../components/Admin/Credentials";
import { useState, useEffect } from "react";
import Modal from "../components/lib/Modal";
import ButtonGroup from "../components/ButtonGroup";
import Page from "../components/Page"
import ShowItem from "./Cart/ShowItem";
import ThemeProvider from "../contexts/ThemeContext";
import { BrowserRouter, Route } from "react-router-dom";
import CredentialsProvider from "../contexts/CredentialsContext";
import ListProvider from "../contexts/ListContext";
let mount = false;

function App() {
  const [theme, setTheme] = useState("dark");
  const [modal, setModal] = useState(false);

  useEffect(() => {
    console.log("did mount");
    return () => {
      console.log("will unmount");
    };
  }, []);

  useEffect(() => {
    console.log("did update " + theme);

    return () => {
      console.log("will update " + theme);
    };
  }, [theme]);

  return (
    <div className="App">
      <header className="App-header">
        <ThemeProvider>
          <ButtonGroup />
          <CredentialsProvider>
            <BrowserRouter>
              <Route path="/admin" exact>
                <Header />
                <Credentials />
              </Route>
              <ListProvider>
                <Route path="/" exact>
                  <Page />
                </Route>
                <Route path="/items/:id" exact>
                  <Header />
                  <ShowItem />
                </Route>
              </ListProvider>
            </BrowserRouter>
          </CredentialsProvider>

          <Button onClick={() => setModal(true)} title="open modal" />
          {modal && (
            <Modal
              title={"Mon titre"}
              open={true}
              onClose={() => window.confirm("Closing modal") && setModal(false)}
            >
              <p>Ma description</p>
              <a href="https://google.fr">Google</a>
              <Button title="test" />
            </Modal>
          )}
        </ThemeProvider>
      </header>
    </div>
  );
}

export default App;
