import React, { Component } from 'react';
import ContactList from './ContactList';
import SearchBar from './SearchBar';
import NewContactForm from './NewContactForm';
import axios from 'axios'

class App extends Component {
  constructor() {
    super();

    this.state = {
      contacts: [],
      searchText:''
    };
  }

  componentDidMount() {
    axios.get('localhost:3001/api/contacts')
    .then(res => {
      this.SetState({
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
        return contact.name.toLowerCase().search(term) >= 0;
      });
  }

  handleAddContact(attributes) {
    axios.post('http://localhost:3001/api/contacts', attributes)
      .then(resp => {
        this.setState(prev => {
          return {
            ...prev,
            constacts: [...prev.contacts, resp.data]
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
        <ContactList contacts={this.getFilteredContacts()} />
      </div>
    );
  }
}

export default App;
