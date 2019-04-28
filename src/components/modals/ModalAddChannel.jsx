import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { reduxForm, Field } from 'redux-form';
import connect from '../../connect';

const mapStateToProps = (state) => {
  const { channelId, channelName } = state.modalDialog;
  return { channelIdToRename: channelId, channelName };
};
@reduxForm({ form: 'newChannel' })
@connect(mapStateToProps)

class ModalAddChannel extends React.Component {
  handleAdd = ({ newChannel }) => {
    const {
      addChannelRequest,
      showError,
      hideDialog,
      reset,
    } = this.props;
    hideDialog();
    try {
      addChannelRequest(newChannel);
    } catch (e) {
      showError(e);
      throw new Error(`${e.name}: ${e.message}`);
    }
    reset();
  }

  handleClose = () => {
    const { hideDialog } = this.props;
    hideDialog();
  }

  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <Form onSubmit={handleSubmit(this.handleAdd)}>
        <Modal.Header closeButton>
          <Modal.Title>Add new channel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Field className="col" name="newChannel" placeholder="enter the channel name" component="input" required type="text" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" type="submit" disabled={submitting}>
            Add
          </Button>
          <Button variant="secondary" onClick={this.handleClose} disabled={submitting}>
            Cancel
          </Button>
        </Modal.Footer>
      </Form>
    );
  }
}

export default ModalAddChannel;
