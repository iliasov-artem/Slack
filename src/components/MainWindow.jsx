import React from 'react';
import SendMessageForm from './SendMessageForm';
import Context from '../context';

class MainWindow extends React.Component {
  render() {
    return (
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
            <SendMessageForm onSubmit={this.sendMessage} onChange={this.changeText} />
          </div>
        </div>
      </div>
    );
  }
}

export default MainWindow;
