import React from 'react';
import SendMessageForm from './SendMessageForm';
import Context from '../context';

const MainWindow = ({ currentChannelId }) => (
  <div className="col">
    <div className="container-fluid d-flex flex-column h-100">
      <div className="row flex-shrink-0">
        <div className="col py-2">
          <h5 className="mb-0">Header</h5>
        </div>
      </div>
      <div className="row flex-fill d-flex justify-content-start overflow-auto">
        <div className="col py-2">
          <p>messages</p>
          <Context.Consumer>
            {value => <p>{value}</p>}
          </Context.Consumer>
        </div>
        <Context.Consumer>
          {value => <SendMessageForm user={value} currentChannelId={currentChannelId} />}
        </Context.Consumer>
      </div>
    </div>
  </div>
);

export default MainWindow;
