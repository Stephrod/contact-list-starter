import React from 'react';
import { Link } from 'react-router';

const Contact = (props) => {
  return (
      <li className="contact">
      <Link to={`/profile/${props.id}`} className="contact-link">
        <div className="image-cropper">
          <img src={props.avatar} alt="avatar"/>
        </div>
      </Link>
        <div className="contact-info">
          <h2>{props.name}</h2>
          {props.occupation}
          <div onClick={() => props.onDelete(props.id)} className="delete-button">Delete</div>
        </div>
      </li>
  );
}

Contact.propTypes = {
  id: React.PropTypes.string.isRequired,
  avatar: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  occupation: React.PropTypes.string.isRequired,
}

export default Contact;
