import { useDispatch, useSelector } from "react-redux";

import s from "./Contact.module.css";
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosContact } from "react-icons/io";
import { FaSquarePhone } from "react-icons/fa6";
import { deleteContact, editContact, like } from "../../redux/contactsSlice";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { IoMdHeart } from "react-icons/io";

const Contact = ({ name, number, id }) => {
  const dispatch = useDispatch();
  const item = useSelector((state) =>
    state.contacts.items.find((item) => item.id === id)
  );
  return (
    <li className={s.item}>
      <div>
        <div className={s.contact}>
          <div>
            <IoIosContact className={s.icon} />
          </div>
          <p>{name}</p>
        </div>
        <div className={s.contact}>
          <div>
            <FaSquarePhone className={s.icon} />
          </div>
          <p>{number}</p>
        </div>
      </div>
      <div className={s.contactBtn}>
        <button type="button" onClick={() => dispatch(deleteContact(id))}>
          <MdDelete />
          <span>Delete</span>
        </button>
        <button
          type="button"
          onClick={() =>
            dispatch(
              editContact({
                id,
                name: prompt(`Enter new name:${name}`) ?? name,
                number: prompt("Enter new number:") ?? number,
              })
            )
          }
        >
          <FaRegEdit />
          <span>Edit</span>
        </button>
        <button
          type="button"
          onClick={() => dispatch(like({ id }))}
          className={item.liked ? s.like : s.nolike}
        >
          <IoMdHeart />
          <span>Like</span>
        </button>
      </div>
    </li>
  );
};

export default Contact;
