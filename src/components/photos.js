import logo from '../nysl_logo.svg';
import { storage, SignInButton, useUserState, SignOuButton, database } from '../utilities/firebase.js';
import { nysl_league, logo_alttext, logo_width } from "../components/home.js";
import React from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { ref as refdatabase, set } from 'firebase/database';
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { useDatabase, DatabaseProvider, AuthProvider, useFirebaseApp, useDatabaseListData } from 'reactfire';
import { getAuth } from 'firebase/auth';
const page_photos_header = "Photos";
const table_photos_gallery = [
  {
    "id": "01",
    "first_col": "Author",
    "second_col": "Photo",
    "third_col": "Date",
    "fourth_col": "Time"
  }
]
export function Photos({ children }) {
  const app = useFirebaseApp(); // a parent component contains a `FirebaseAppProvider`
  const auth = getAuth(app);
  const [user] = useUserState();
  const { id } = useParams();
  const photosmetada = {
    user: user,
    gameid: id,
  };
  // any child components will be able to use `useUser`, `useDatabaseObjectData`, etc
  return (
     <AuthProvider sdk={auth}> 
       <DatabaseProvider sdk={database}> 
          <Uploadphotos />
          <Displayphotos photosmetada={photosmetada} /> 
         </DatabaseProvider> 
     </AuthProvider> 
  );
}

function photo_unique_id() {
  return uuidv4()
}
function Saveimagedata(id, url, user) {
  var email = user.email;
  var photouniqueid = photo_unique_id();
  var timestampphoto = new Date().getTime();
  var refimagedata = refdatabase(database, '/photos/' + id + '/' + photouniqueid);
  var imagedata={
    author: email,
    url: url,
    timestamp: timestampphoto,
    id: photouniqueid
  }
  set(refimagedata,imagedata)
}

const HandleFile = async (event, id, user) => {
  var file = event.target.files[0];
  const metadata = { contentType: 'image/jpeg' };
  const storageRef = ref(storage, 'images/' + id + '/' + file.name);
  const uploadTask = uploadBytesResumable(storageRef, file, metadata);
  uploadTask.on('state_changed',
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      //const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      //console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          //console.log('Upload is paused');
          break;
        case 'running':
          //console.log('Upload is running');
          break;
        default:
          console.log(`Default case`);
      }
    },
    (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;
        case 'storage/canceled':
          // User canceled the upload
          break;
        // ...
        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          break;
        default:
          console.log(`Default case`);
      }
    },
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        //console.log('File available at', downloadURL);
        Saveimagedata(id, downloadURL, user);
      });
    }
  );
}
export function Uploadphotos() {

  const { id } = useParams();
  const [user] = useUserState();
  return (
    <div>
      <div className="btn-toolbar justify-content-between">
        <div>
          <h5> <img src={logo} alt={logo_alttext} width={logo_width} /> {nysl_league.title}</h5>
        </div>
        <div>
          {user ? <SignOuButton /> : <SignInButton />}
        </div>
      </div>
      <h5>{page_photos_header}</h5>

      <div>
        <label htmlFor="gamephoto">Choose a game photo:</label>
        <input type="file" accept="image/*" onChange={event => HandleFile(event, id, user)} />
      </div>
    </div>
  )
}


  function Displayphotos(photosmetada)  {
  
    if (typeof (photosmetada.photosmetada.user) !== 'undefined') { 
                var gameid = photosmetada.photosmetada.gameid; 
                  }
    var database = useDatabase();
    var querypath = '/photos/' + gameid;
    const messagesRef = refdatabase(database, querypath);
    const objectlistofphotos = useDatabaseListData(messagesRef);
    
    const { status, data: photos } = objectlistofphotos;
      if (typeof (objectlistofphotos.data) !== 'undefined') {
      var numberofmessageperpage = objectlistofphotos.data.length;
      if (numberofmessageperpage === 0) {
            };
      }
  
    if (typeof (photos) !== 'undefined') {
      var photossortedtimestamp = photos.sort((a, b) => { return a.timestamp - b.timestamp; })
    }
    if (status === 'success') {
    
      return (<div>
        <table className="table">
          <thead>
            {table_photos_gallery.map(header => {
              return (
                <tr key={header.id}><th>{header.first_col}</th><th>{header.second_col}</th><th>{header.third_col}</th><th>{header.fourth_col}</th>
                </tr>
              )
            })}
          </thead>
  
          <tbody>
            {photossortedtimestamp.map(photo=> {
              var datetime_temp = "";
              var date_temp = "";
              var time_temp = "";
              if (typeof (photos) !== 'undefined')
                datetime_temp = new Date(photo.timestamp);
              if (isNaN(datetime_temp)) {
                date_temp = "";
                time_temp = ""
              }
              else {
                date_temp = datetime_temp.getDate() + "/" + (datetime_temp.getMonth() + 1) + "/" + datetime_temp.getFullYear();
                time_temp = datetime_temp.getHours() + ":" + datetime_temp.getMinutes() + ":" + datetime_temp.getSeconds();
              }
              return (
                <tr key={photo.id} ><td >{photo.author}</td><td><img src={photo.url} alt="game NYSL" /> </td><td>{date_temp}</td><td>{time_temp}</td>
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
 