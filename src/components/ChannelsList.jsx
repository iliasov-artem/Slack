import React from 'react';
import AddChannelForm from '../modals/AddChannelForm';
import connect from '../connect';

@connect()

class ChannelsList extends React.Component {
  handleSetActiveChannel = id => () => {
    const { setActiveChannel } = this.props;
    setActiveChannel(id);
  }

  renderChannels = channels => (
    channels.map(({ id, name }) => (
      <button key={id} type="button" className="btn btn-secondary btn-block" onClick={this.handleSetActiveChannel(id)}>
        {`#${name}`}
      </button>
    ))
  );

  render() {
    const { channels, user } = this.props;
    return (
      <div className="px-3 bg-secondary text-white">
        <div className="team_menu">
          <button className="btn btn-secondary btn-block m-0" type="button">
            Team menu
          </button>
          <p className="m-0">{user}</p>
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
