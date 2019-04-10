import React from 'react';

export default class ChannelsList extends React.Component {
  renderChannels = channels => (
    channels.map(({ id, name }) => (
      <button key={id} type="button" className="btn btn-secondary btn-block">
        {`#${name}`}
      </button>
    ))
  );

  render() {
    const { channels } = this.props;
    return (
      <div className="px-3 bg-secondary text-white">
        <div className="team_menu">
          <p className="text-center">Team Menu</p>
        </div>
        <div className="col_channels center">
          <h3>Channels</h3>
          {this.renderChannels(channels)}
        </div>
      </div>
    );
  }
}
