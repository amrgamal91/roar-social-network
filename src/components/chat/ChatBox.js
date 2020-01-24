import React, { Component } from "react";

import MessageWindow from "../../chat-client/MessageWindow";
import TextBar from "../../chat-client/TextBar";
import { registerOnMessageCallback, send } from "../../chat-client/websocket";

import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";

const styles = theme => ({
  ...theme.styleToSpread
});

class ChatBox extends Component {
  // The messages and username are used as the application state
  state = {
    messages: [],
    username: null
  };

  constructor(props) {
    super(props);
    registerOnMessageCallback(this.onMessageReceived.bind(this));
  }

  onMessageReceived(msg) {
    msg = JSON.parse(msg);
    this.setState({
      messages: this.state.messages.concat(msg)
    });
  }

  setUserName(name) {
    console.log("here in set user name  : "+name);

    this.setState({
      username: name
    });
  }

  sendMessage(userName, text) {
      console.log("here in send message : "+this.state.username);
    //   if(!userName && this.state.username===null){

    //   }
    const message = {
      username: userName ? userName:this.state.username,
      text: text
    };
    send(JSON.stringify(message));
  }

  render() {
    const { authenticated, handle } = this.props;
    const setUserName = this.setUserName.bind(this);
    const sendMessage = this.sendMessage.bind(this);
    
    if (authenticated || this.state.username!=null) {
      return (
        <div className="container">
          <div className="container-title">Chat</div>
          <MessageWindow messages={this.state.messages} username={handle?handle:this.state.username} />
          <TextBar definedUser={true} userName={handle} onSend={sendMessage} />
        </div>
      );
    } else if(!authenticated || this.state.username === null){
      return (
        <div className="container">
          <div className="container-title">Chat - Enter username : </div>
          <TextBar definedUser={false} onSend={setUserName} />
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  authenticated: state.user.authenticated,
  handle: state.user.credentials.handle
});

export default connect(mapStateToProps)(withStyles(styles)(ChatBox));
