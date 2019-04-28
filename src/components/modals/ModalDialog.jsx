import React from 'react';
import { Modal } from 'react-bootstrap';
import connect from '../../connect';
import ModalDeleteChannel from './ModalDeleteChannel';
import ModalRenameChannel from './ModalRenameChannel';
import ModalAddChannel from './ModalAddChannel';

const mapStateToProps = (state) => {
  const { visible, type } = state.modalDialog;
  return { visible, type };
};
@connect(mapStateToProps)

class ModalDialog extends React.Component {

  handleClose = () => {
    const { hideDialog } = this.props;
    hideDialog();
  }

  getModalBody = (type) => {
    switch (type) {
      case 'deleteChannel':
        return <ModalDeleteChannel />;
      case 'renameChannel':
        return <ModalRenameChannel />;
      case 'addChannel':
        return <ModalAddChannel />;
      default:
        break;
    }
    return null;
  }

  render() {
    const { visible, type } = this.props;
    return (
      <Modal show={visible} onHide={this.handleClose}>
        {this.getModalBody(type)}
      </Modal>
    );
  }
}

export default ModalDialog;
