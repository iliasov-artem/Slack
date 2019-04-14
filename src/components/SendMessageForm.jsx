import React from 'react';

class SendMessageForm extends React.Component {
  state = { text: '' };

  sendMessage = (e) => {
    e.preventDefault();
    console.log(1);
  }

  changeText = ({ target: { value } }) => {
    console.log(value);
    this.setState({ text: value });
  }

  render() {
    const { text } = this.state;
    return (
      <div className="container-fluid">
        <form className="form-inline" onSubmit={this.sendMessage}>
          <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2" />
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" type="button">Button</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default SendMessageForm;
