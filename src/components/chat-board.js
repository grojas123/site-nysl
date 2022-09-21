import { v4 as uuidv4 } from 'uuid';
import { useParams } from "react-router-dom";
import React from 'react';
import { nysl_league, logo_alttext, logo_width } from "../components/home.js";
import logo from '../nysl_logo.svg';
import { ref, set } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { SignInButton, useUserState, SignOuButton, database } from '../utilities/firebase.js'
import { game_info, game_locations, label_game_details, Warninguserstosignin } from '../components/gameinfo.js'
import { useDatabase, DatabaseProvider, AuthProvider, useFirebaseApp, useDatabaseListData } from 'reactfire';
import { useFormik } from 'formik';

const page_gamechatboard_header = "Game Board Chat";
const table_game_chatboard = [
  {
    "id": "01",
    "first_col": "Author",
    "second_col": "Message",
    "third_col": "Date",
    "fourth_col": "Time"
  }
]
function message_unique_id() {
  return uuidv4()
}

export function FirebaseMessagesreactfire({ children }) {
  const app = useFirebaseApp(); // a parent component contains a `FirebaseAppProvider`
  const auth = getAuth(app);
  const [user] = useUserState();
  const { id } = useParams();
  const messagesmetada = {
    user: user,
    gameid: id,
  };
  const messagesmetadaform = {
    user: user,
    gameid: id
  };
  //console.log(messagesmetadaform)
  // any child components will be able to use `useUser`, `useDatabaseObjectData`, etc
  return (
    <AuthProvider sdk={auth}>
      <DatabaseProvider sdk={database}>
        <Showmessages messagesmetada={messagesmetada} />
        <Messageform messagesmetadaform={messagesmetadaform} />
      </DatabaseProvider>
    </AuthProvider>
  );
}

function Showmessages(messagesmetada) {
  
  if (typeof (messagesmetada.messagesmetada.user) !== 'undefined') { 
              var gameid = messagesmetada.messagesmetada.gameid; 
                }
  var database = useDatabase();
  var querypath = '/messages/' + gameid;
  const messagesRef = ref(database, querypath);
  const objectlistofmesagges = useDatabaseListData(messagesRef);
  
  const { status, data: messages } = objectlistofmesagges;
    if (typeof (objectlistofmesagges.data) !== 'undefined') {
    var numberofmessageperpage = objectlistofmesagges.data.length;
    if (numberofmessageperpage === 0) {
          };
    }

  if (typeof (messages) !== 'undefined') {
    var messagessortedtimestamp = messages.sort((a, b) => { return a.timestamp - b.timestamp; })
  }
  if (status === 'success') {
  
    return (<div>
      <table className="table">
        <thead>
          {table_game_chatboard.map(header => {
            return (
              <tr key={header.id}><th>{header.first_col}</th><th>{header.second_col}</th><th>{header.third_col}</th><th>{header.fourth_col}</th>
              </tr>
            )
          })}
        </thead>

        <tbody>
          {messagessortedtimestamp.map(message => {
            var datetime_temp = "";
            var date_temp = "";
            var time_temp = "";
            if (typeof (messages) !== 'undefined')
              datetime_temp = new Date(message.timestamp);
            if (isNaN(datetime_temp)) {
              date_temp = "";
              time_temp = ""
            }
            else {
              date_temp = datetime_temp.getDate() + "/" + (datetime_temp.getMonth() + 1) + "/" + datetime_temp.getFullYear();
              time_temp = datetime_temp.getHours() + ":" + datetime_temp.getMinutes() + ":" + datetime_temp.getSeconds();
            }
            return (
              <tr key={message.id} ><td >{message.author}</td><td>{message.text}</td><td>{date_temp}</td><td>{time_temp}</td>
              </tr>
            )
          })}
        </tbody>

      </table>

    </div>
    )
  }
  if (status === 'loading') {
    return <span>Loading...</span>;
  }
  ;
}

const validate = values => {
  const errors = {};
  if (values.textarea === 0 || values.textarea.replace(/^\s+|\s+$/gm, '').length === 0) {
    errors.textarea = 'Required';
  } else if (values.textarea.length === 0) {

    errors.textarea = 'The message must be no empty';
  }
  return errors;
};

const Messageform = (messagesmetadaform) => {
  var database = useDatabase();
  
  if (typeof (messagesmetadaform.messagesmetadaform.user) !== 'undefined') {
    var email = messagesmetadaform.messagesmetadaform.user.email
    var gameid = messagesmetadaform.messagesmetadaform.gameid
  }
  
  const formik = useFormik({initialValues:{ textarea: '',},validate, onSubmit: (values, { resetForm }) => 
  {
      var message = values.textarea;
      var messageunqueid = message_unique_id();
      let timestampmessage = new Date().getTime();
      set(ref(database, '/messages/' + gameid + '/' + messageunqueid), {author: email, text: message,timestamp: timestampmessage, id: messageunqueid}).then(() => {resetForm();}).catch((error) => {});
    }
  });
  return (
    <form className="form mb-5" id="messageform" onSubmit={formik.handleSubmit}>
      <div className="form-group">
        <input
          className="form-control" rows="3"
          id="textarea"
          name="textarea"
          type="textarea"
          onChange={formik.handleChange}
          value={formik.values.textarea}
        />
      </div>

      <button type="submit">Post a message</button>
    </form>
  );
};

const MessageListGame = () => {
  const [user] = useUserState();
  return (
    <div>
      {user ? <FirebaseMessagesreactfire /> : <Warninguserstosignin />}

    </div>)

};

export function Chatboard() {
  const { id } = useParams();
  const [user] = useUserState();

  let gametodisplay = game_info.find(game => game.id === id);
  var game_location_temp = game_locations[gametodisplay.Location][0].name_location;
  var game_location_address_temp = game_locations[gametodisplay.Location][0].address;
  return <div>
    <div className="btn-toolbar justify-content-between">
      <div>
        <h5> <img src={logo} alt={logo_alttext} width={logo_width} /> {nysl_league.title}</h5>
      </div>
      <div>
        {user ? <SignOuButton /> : <SignInButton />}
      </div>
    </div>
    <p> {page_gamechatboard_header}</p>
    <table className="table">
      <tbody>
        <tr><td>{label_game_details[0].label_date}</td><td>{gametodisplay.Date}</td></tr>
        <tr><td>{label_game_details[0].label_time}</td><td>{gametodisplay.Times}</td></tr>
        <tr><td>{label_game_details[0].label_location}</td><td>{game_location_temp}</td></tr>
        <tr><td>{label_game_details[0].label_address}</td><td>{game_location_address_temp}</td></tr>
        <tr><td>{label_game_details[0].label_team}</td><td>{gametodisplay.Teams}</td></tr>
      </tbody>
    </table>
    <MessageListGame />
  </div>
}