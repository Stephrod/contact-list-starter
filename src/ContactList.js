import React from 'react';
import Contact from './Contact';

const ContactList = (props) => {
  return (
    <ul className="contact-list">
      {props.contacts.map(contact => {
        return (
          <Contact
            key={contact._id}
            id={contact._id}
            name={contact.name}
            avatar={contact.avatar}
            occupation={contact.occupation}
            onDelete={props.onDelete}
          />
        )
      })}
    </ul>
  );
}

export default ContactList;
