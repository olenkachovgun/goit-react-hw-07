import { useEffect, useState } from "react";
// import { generateContacts } from "../../redux/contactsSlice";
import { resetFilter } from "../../redux/filtersSlice";
import Contact from "../Contact/Contact";
import { useDispatch, useSelector } from "react-redux";
import {
  addContact,
  editContact,
  fetchContacts,
} from "../../redux/contactsOps";
import toast from "react-hot-toast";
import Modal from "../Modal/Modal";
import ContactForm from "../ContactForm/ContactForm";

const ContactList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [item, setItem] = useState();
  const contacts = useSelector((state) => state.contacts.items);
  const filter = useSelector((state) => state.filters.name);
  const dispatch = useDispatch();
  const filterData = contacts.filter((item) =>
    item.name.toLowerCase().includes(filter.toLowerCase().trim())
  );
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  const handleSubmit = (values, options) => {
    dispatch(editContact({ id: item.id, ...values }));
    //setIsOpen(false);
    options.resetForm();
    closeModal();
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <ul>
      {filterData.map((item) => (
        <Contact
          key={item.id}
          {...item}
          edit={() => {
            setItem(item);
            setIsOpen(true);
          }}
        />
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
      {isOpen && (
        <Modal closeModal={closeModal}>
          <ContactForm
            text="Edit"
            initialValues={item}
            handleSubmit={handleSubmit}
            closeModal={closeModal}
          />
        </Modal>
      )}
    </ul>
  );
};
export default ContactList;
