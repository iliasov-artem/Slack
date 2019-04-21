import React from 'react';
import AddChannelForm from '../modals/AddChannelForm';

export default class ChannelsList extends React.Component {
  renderChannels = channels => (
    channels.map(({ id, name }) => (
      <button key={id} type="button" className="btn btn-secondary btn-block">
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
