import { useEffect } from "react";
// import { generateContacts } from "../../redux/contactsSlice";
import { resetFilter } from "../../redux/filtersSlice";
import Contact from "../Contact/Contact";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts } from "../../redux/contactsOps";
import toast from "react-hot-toast";

const ContactList = () => {
  const contacts = useSelector((state) => state.contacts.items);
  const filter = useSelector((state) => state.filters.name);
  const dispatch = useDispatch();
  const filterData = contacts.filter((item) =>
    item.name.toLowerCase().includes(filter.toLowerCase().trim())
  );
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <ul>
      {filterData.map((item) => (
        <Contact key={item.id} {...item} />
      ))}

      {filterData.length === 0 && contacts.length !== 0 && (
        <>
          <p>Not found</p>
          {/* //{toast.error("Not found. Try again...")}; */}
          <button
            onClick={() => dispatch(resetFilter())}
            type="button"
            className="btnReset"
          >
            Reset
          </button>
        </>
      )}

      {/* {contacts.length === 0 && (
        <button
          onClick={() => dispatch(generateContacts())}
          type="button"
          className="btnReset"
        >
          Generate Contacts
        </button>
      )} */}
    </ul>
  );
};
export default ContactList;
