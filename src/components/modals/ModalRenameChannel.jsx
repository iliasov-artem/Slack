import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import connect from '../../connect';

const mapStateToProps = (state) => {
  const { channelId, channelName } = state.modalDialog;
  return { channelIdToRename: channelId, channelName };
};
@reduxForm({ form: 'renameChannel' })
@connect(mapStateToProps)

class ModalRenameChannel extends React.Component {
  handleRename = async ({ newChannelName }) => {
    const {
      renameChannelRequest,
      showError,
      hideDialog,
      channelIdToRename,
      reset,
    } = this.props;
    try {
      await renameChannelRequest(channelIdToRename, newChannelName);
    } catch (e) {
      showError(e);
      throw new SubmissionError(`${e.name}: ${e.message}`);
    }
    hideDialog();
    reset();
  }

  handleClose = () => {
    const { hideDialog } = this.props;
    hideDialog();
  }

  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <Form onSubmit={handleSubmit(this.handleRename)}>
        <Modal.Header closeButton>
          <Modal.Title>Please enter new name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Field className="col" name="newChannelName" placeholder="enter the channel name" component="input" required type="text" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" type="submit" disabled={submitting}>
            Ok
          </Button>
          <Button variant="secondary" onClick={this.handleClose} disabled={submitting}>
            Cancel
          </Button>
        </Modal.Footer>
      </Form>
    );
  }
}

export default ModalRenameChannel;
