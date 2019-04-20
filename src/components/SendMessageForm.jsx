import React from 'react';
import { reduxForm, Field } from 'redux-form';
import connect from '../connect';

@connect()

class SendMessageForm extends React.Component {
  sendMessage = async ({ message }) => {
    const {
      sendMessage,
      reset,
      currentChannelId,
      user,
    } = this.props;
    await sendMessage(message, currentChannelId, user);
    reset();
  }

  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <div className="container-fluid">
        <form className="form-inline" onSubmit={handleSubmit(this.sendMessage)}>
          <div className="input-group mb-3">
            <Field name="message" required placeholder="message" component="input" type="text" />
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" disabled={submitting} type="submit">Button</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'newMessage',
})(SendMessageForm);
