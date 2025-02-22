import React from "react";
import s from "./ContactForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { nanoid } from "nanoid";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contactsSlice";
import { IoPersonAddSharp } from "react-icons/io5";
const ContactForm = ({}) => {
  const patternNumber = /^(\d{3}-\d{2}-\d{2}|\d{7})$/;
  const patternName = /^[A-Za-zА-Яа-яЇїІіЄєҐґ]+$/;

  const FeedbackSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Required")
      .matches(patternName, "Only letters!"),
    number: Yup.string()
      .required("Required")
      .matches(patternNumber, "Format is not correct! XXX-XX-XX"),
  });

  const initialValues = {
    id: nanoid(),
    name: "",
    number: "",
  };
  const dispatch = useDispatch();
  const onSubmit = (values, action) => {
    const newContact = {
      id: nanoid(),
      name: values.name,
      number: values.number,
    };
    dispatch(addContact(newContact));
    action.resetForm();
  };

  return (
    <div className={s.formContainer}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={FeedbackSchema}
      >
        <Form>
          <label>
            Name
            <Field type="text" name="name" placeholder="Enter name" />
            <ErrorMessage className={s.error} name="name" component="span" />
          </label>
          <label htmlFor="number">
            Number
            <Field type="tel" name="number" placeholder="Enter phone" />
            <ErrorMessage className={s.error} name="number" component="span" />
          </label>
          <button className={s.btnAddContact} type="submit">
            <IoPersonAddSharp />
            Add contact
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default ContactForm;
