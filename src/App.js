import ContactList from './ContactList';
import React, { Component } from 'react';
import SearchBar from './SearchBar';
import NewContactForm from './NewContactForm';
import axios from 'axios'

class App extends Component {
  constructor() {
    super();

    this.state = {
      searchText:'',
      contacts: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:3001/api/contacts')
      .then(resp => {
        this.setState({
          // ...this.state,
          searchText: this.state.searchText,
          contacts: resp.data
        })
      })
      .catch(err => console.log(`Error! ${err}`));
  }

  handleChange(event) {
    this.setState({
      contacts: this.state.contacts,
      searchText: event.target.value
    })
  }

  getFilteredContacts() {
    const term = this.state.searchText.trim().toLowerCase();
    const contacts = this.state.contacts;
      if (!term) {
        return contacts;
      }
      return contacts.filter(contact => {
        return contact.name.toLowerCase().search(term) >= 0 ||
        contact.occupation.toLowerCase().search(term) >= 0;
      });
  }

  handleAddContact(attributes) {
    axios.post('http://localhost:3001/api/contacts', attributes)
    .then(resp => {
      this.setState(prev => {
        return {
          ...prev,
          contacts: [...prev.contacts, resp.data]
        };
      });
    })
    .catch(err => console.log(err));
  }

  handleDeleteContact(id) {
    console.log('delete', id);
    axios.delete(`http://localhost:3001/api/contacts/${id}`)
    .then(resp => {
      console.log('deleted');

      const contacts = this.state.contacts.filter(contact => {
        return contact._id !== id;
    });
    this.setState(prev => {
      return {
        ...prev,
        contacts: contacts
      };
    });
  })
    .catch(err => console.log(err));
}

  render() {
    return (
      <div className="App">
        <NewContactForm onAdd={this.handleAddContact.bind(this)}/>
        <SearchBar value={this.state.searchText} onChange={this.handleChange.bind(this)}/>
        <ContactList onDelete={this.handleDeleteContact.bind(this)} contacts={this.getFilteredContacts()} />
      </div>
    );
  }
}

export default App;
