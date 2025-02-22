import "./App.css";
import ContactForm from "./components/ContactForm/ContactForm";
import SearchBox from "./components/SearchBox/SearchBox ";
import ContactList from "./components/ContactList/ContactList";
import { useSelector } from "react-redux";

import { FaAddressBook } from "react-icons/fa";
function App() {
  const contacts = useSelector((state) => state.contacts.items);
  //const dispatch = useDispatch();
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
