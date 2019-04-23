import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Modal, Button } from 'react-bootstrap';
import connect from '../../connect';

@connect()

class AddChannelForm extends React.Component {
  state = { isShown: false };

  handleShow = () => {
    this.setState({ isShown: true });
  }

  handleClose = () => {
    this.setState({ isShown: false });
  }

  createChannel = async ({ channel }) => {
    const {
      createChannel,
      reset,
    } = this.props;
    await createChannel(channel, true);
    reset();
  }

  render() {
    const { isShown } = this.state;
    const { handleSubmit, submitting } = this.props;
    return (
      <>
        <Button variant="primary" onClick={this.handleShow}>
          Add Channel
        </Button>
        <Modal show={isShown} onHide={this.handleClose}>
          <Modal.Header>
            <Modal.Title>Add Channel</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="form-inline" onSubmit={handleSubmit(this.createChannel)}>
              <div className="input-group mb-3">
                <Field name="channel" required placeholder="message" component="input" type="text" />
                <div className="input-group-append">
                  <button className="btn btn-outline-secondary" disabled={submitting} type="submit">Button</button>
                </div>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default reduxForm({
  form: 'createChannel',
})(AddChannelForm);
