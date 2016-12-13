import React, { Component } from 'react';

class NewContactForm extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      avatar: '',
      occupation: ''
    };
  }
  handleInputChange (event) {
    const { value, name: attribute } = event.target;
    this.setState( prev => {
      return {
        ...prev,
        [attribute]: value
      };
    });
  }
handleSubmit(event) {
  event.preventDefault();
  const { name, avatar, occupation } = this.state;
  this.props.onAdd({ name, avatar, occupation });

}
  render() {
    return (
      <form className="name-contact-form" onSubmit={this.handleSubmit.bind(this)}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          value={this.state.name}
          onChange={this.handleInputChange.bind(this)}
        />
        <label htmlFor="name">Occupation:</label>
        <input
          type="text"
          name="occupation"
          value={this.state.occupation}
          onChange={this.handleInputChange.bind(this)}
          />
          <label htmlFor="name">Avatar:</label>
          <input
            type="text"
            name="avatar"
            value={this.state.avatar}
            onChange={this.handleInputChange.bind(this)}
          />
          <input
            type="submit"
            value="+ Add New"
            disabled={!this.state.name.trim() || !this.state.occupation.trim() || !this.state.avatar.trim()}
          />
      </form>
    );
  }
}

NewContactForm.propTypes = {
  onAdd: React.PropTypes.func.isRequired
};

export default NewContactForm;
