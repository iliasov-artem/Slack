import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import connect from '../../connect';

@connect()

class ModalError extends React.Component {
  handleClose = () => {
    const { hideError } = this.props;
    hideError();
  }

  render() {
    const { state: { visible, error } } = this.props;
    console.log(error);
    return (
      <Modal show={visible} onHide={this.handleClose}>
        <Modal.Header closeButton>
          Error!
        </Modal.Header>
        <Modal.Body>
          {error}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={this.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ModalError;
