import React from 'react';
import { reduxForm, Field } from 'redux-form';
import connect from '../connect';

@reduxForm({ form: 'newMessage' })
@connect()

class SendMessageForm extends React.Component {
  sendMessage = ({ message }) => {
    const {
      sendMessage,
      showError,
      reset,
      currentChannelId,
      user,
    } = this.props;
    try {
      sendMessage(message, currentChannelId, user);
    } catch (e) {
      showError(e);
      throw new Error(`${e.name}: ${e.message}`);
    }
    reset();
  }

  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <div className="container-fluid">
        <form className="form" onSubmit={handleSubmit(this.sendMessage)}>
          <div className="input-group mb-3">
            <Field className="col" name="message" placeholder="message" component="input" required type="text" />
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" disabled={submitting} type="submit">Send</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default SendMessageForm;
