import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import connect from '../../connect';

const mapStateToProps = (state) => {
  const { channelId, channelName } = state.modalDialog;
  return { channelIdToDelete: channelId, channelName };
};
@connect(mapStateToProps)


class ModalDeleteChannel extends React.Component {
  handleDelete = async (event) => {
    event.preventDefault();
    const {
      deleteChannelRequest,
      showError,
      hideDialog,
      channelIdToDelete,
    } = this.props;
    try {
      await deleteChannelRequest(channelIdToDelete);
    } catch (e) {
      showError(e);
      throw new Error(`${e.name}: ${e.message}`);
    }
    hideDialog();
  }

  handleClose = () => {
    const { hideDialog } = this.props;
    hideDialog();
  }

  render() {
    const { channelName } = this.props;
    return (
      <Form onSubmit={this.handleDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {`Are you sure you want to delete ${channelName}?`}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" type="submit">
            Confirm
          </Button>
          <Button variant="secondary" onClick={this.handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Form>
    );
  }
}

export default ModalDeleteChannel;
