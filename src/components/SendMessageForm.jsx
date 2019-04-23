import React from 'react';
import { reduxForm, Field } from 'redux-form';
import connect from '../connect';

@reduxForm({ form: 'newMessage' })
@connect()

class SendMessageForm extends React.Component {
  sendMessage = async ({ message }) => {
    const {
      sendMessage,
      reset,
      currentChannelId,
      user,
    } = this.props;
    try {
      await sendMessage(message, currentChannelId, user);
    } catch (e) {
      console.log(e);
    }
    reset();
  }

  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <div className="container-fluid">
        <form className="form" onSubmit={handleSubmit(this.sendMessage)}>
          <div className="input-group mb-3">
            <Field name="message" placeholder="message" component="input" type="text" />
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" disabled={submitting} type="submit">Button</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default SendMessageForm;
