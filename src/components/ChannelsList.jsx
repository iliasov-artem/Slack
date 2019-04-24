import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddChannelForm from './AddChannelForm';
import connect from '../connect';

@connect()

class ChannelsList extends React.Component {
  handleSetActiveChannel = id => () => {
    const { setActiveChannel } = this.props;
    setActiveChannel(id);
  }

  handleDeleteChannel = id => async () => {
    const { deleteChannelRequest } = this.props;
    await deleteChannelRequest(id);
  }

  handleRenameChannel = id => async () => {
    const { renameChannelRequest } = this.props;
    await renameChannelRequest(id);
  }

  renderChannels = channels => (
    channels.map(({ id, name, removable }) => (
      <div key={id} className="row justify-content-between">
        <div className="col-4">
          <button type="button" className="btn btn-secondary" onClick={this.handleSetActiveChannel(id)}>
            {`#${name}`}
          </button>
        </div>
        <div className="col-5 my-auto">
          <button type="button" disabled={!removable} className="btn btn-secondary p-1" onClick={this.handleDeleteChannel(id)}><FontAwesomeIcon icon="trash" /></button>
          <button type="button" disabled={!removable} className="btn btn-secondary p-1" onClick={this.handleDeleteChannel(id)}><FontAwesomeIcon icon="edit" /></button>
        </div>
      </div>
    ))
  );

  render() {
    const { channels, user } = this.props;
    return (
      <div className="px-3 bg-secondary text-white">
        <div className="team_menu mb-5">
          <button className="btn btn-secondary btn-block m-0" type="button">
            Team menu
          </button>
          <p className="m-0 text-center">{user}</p>
        </div>
        <div className="col_channels center">
          <h3>Channels</h3>
          {this.renderChannels(channels)}
          <AddChannelForm />
        </div>
      </div>
    );
  }
}

export default ChannelsList;
