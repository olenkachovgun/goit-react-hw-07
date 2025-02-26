import "./App.css";
import ContactForm from "./components/ContactForm/ContactForm";
import SearchBox from "./components/SearchBox/SearchBox ";
import ContactList from "./components/ContactList/ContactList";
import { useSelector } from "react-redux";

import { FaAddressBook } from "react-icons/fa";
import { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function App() {
  const contacts = useSelector((state) => state.contacts.items);
  // useEffect(() => {
  //   const abortController = new AbortController();
  //   axios
  //     .get("https://dummyjson.com/users", { signal: abortController.signal })
  //     .then((response) => console.log(response.data))
  //     .catch((error) => {
  //       if (axios.isCancel(error)) {
  //         console.log("Cancel with abort controller");
  //         // toast.error("Cancel with abort controller");
  //       } else {
  //         console.log("Error fetching data:", error);
  //       }
  //     });
  //   return () => {
  //     abortController.abort();
  //   };
  // }, []);

  return (
    <div>
      <div className="phonebook">
        <FaAddressBook className="iconTitle" />
        <h1>Phonebook</h1>
      </div>
      <ContactForm />
      {contacts.length > 0 && <SearchBox />}

      <ContactList />
    </div>
  );
}

export default App;
