import logo from '../nysl_logo.svg';
import React from 'react';
import { useNavigate } from "react-router-dom";
import { nysl_league, logo_alttext, logo_width } from "../components/home.js"
import { SignInButton, useUserState, SignOuButton } from '../utilities/firebase.js'
import validator from 'validator'
import { useParams } from "react-router-dom";

export const season_title = "Fall Schedule";
const page_gameinfo_header = "Game Info";
const page_gamedetails_header = "Game Details ";
const dayweek_warning = "* All games take place on Saturday";
const label_button_gameboardchat = "Game Board Chat";
const table_games_header = [
   {
      "id": "01",
      "first_col": "Date",
      "second_col": "Teams",
      "third_col": "Location",
      "fourth_col": "Times"
   }
]
export const additional_info_game = [
   {
      "id": "01",
      "label": "Facility Type:",
      "info": "Outdoor",
   },
   {
      "id": "02",
      "label": "Additional Information:",
      "info": "If deemed necessary by NYSL, games may be shortened or cancelled due to extreme weather conditions.",

   },
   {
      "id": "03",
      "label": "Please direct all questions to:",
      "info": "Michael Randall, League Coordinator",

   },
   {
      "id": "04",
      "label": "Phone:",
      "info": "(630) 690-8132",
   },
   {
      "id": "05",
      "label": "Email:",
      "info": "michael.randall@chisoccer.org"
   }
]

export const game_locations =
{
   "01": [
      {
         "name_location": "AJ Katzenmaier Elementary",
         "address": "24 W. Walton St., Chicago, IL 60610",
         "google_maps_placeid": "ChIJw7r2B07TD4gRhiyVWV0uqGg"
      }],
   "02": [
      {
         "name_location": "Greenbay Elementary",
         "address": "1734 N. Orleans St., Chicago, IL 60614",
         "google_maps_placeid": "ChIJowbzc0DTD4gRDj_y-LsmF54"
      }
   ],

   "03": [
      {
         "name_location": "Howard A Yeager Elementary",
         "address": "2245 N. Southport Ave., Chicago, IL 60614",
         "google_maps_placeid": "ChIJLY2bf-PSD4gR1lXXfZCLrWI"
      }],

   "04": [
      {
         "name_location": "Marjorie P Hart Elementary",
         "address": "2625 N. Orchard St., Chicago, IL 60614",
         "google_maps_placeid": "ChIJUeUwJg_TD4gRFPfOpUSecT4"

      }],

   "05": [
      {
         "name_location": "North Elementary",
         "address": "1409 N. Ogden Ave., Chicago, IL 60610",
         "google_maps_placeid": "ChIJXahMZzrTD4gRxVBJPBbHQJk"
      }],
   "06": [
      {
         "name_location": "South Elementary",
         "address": "2101 N. Fremont St., Chicago, IL 60614",
         "google_maps_placeid": "ChIJxx20bxnTD4gR9W0z1vfnC5c"
      }]
}


export const game_info = [
   {
      "id": "001",
      "Date": "2018-09-01",
      "Teams": "U1 and U4",
      "Location": "01",
      "Times": "9:30 a.m."
   },
   {
      "id": "002",
      "Date": "2018-09-01",
      "Teams": "U3 and U2",
      "Location": "02",
      "Times": "1:00 p.m."
   },
   {
      "id": "003",
      "Date": "2018-09-08",
      "Teams": "U5 and U6",
      "Location": "03",
      "Times": "9:30 a.m."
   },
   {
      "id": "004",
      "Date": "2018-09-08",
      "Teams": "U6 and U1",
      "Location": "04",
      "Times": "1:00 p.m."
   },
   {
      "id": "005",
      "Date": "2018-09-15",
      "Teams": "U2 and U4",
      "Location": "05",
      "Times": "9:30 a.m."
   },
   {
      "id": "006",
      "Date": "2018-09-15",
      "Teams": "U3 and U5",
      "Location": "01",
      "Times": "1:00 p.m."
   },
   {
      "id": "007",
      "Date": "2018-09-22",
      "Teams": "U1 and U3",
      "Location": "06",
      "Times": "9:30 a.m."
   },
   {
      "id": "008",
      "Date": "2018-09-22",
      "Teams": "U2 and U6",
      "Location": "03",
      "Times": "1:00 p.m."
   },
   {
      "id": "009",
      "Date": "2018-09-29",
      "Teams": "U4 and U5",
      "Location": "02",
      "Times": "9:30 a.m."
   },
   {
      "id": "010",
      "Date": "2018-10-06",
      "Teams": "U2 and U5",
      "Location": "04",
      "Times": "9:30 a.m."
   },
   {
      "id": "011",
      "Date": "2018-10-06",
      "Teams": "U1 and U6",
      "Location": "06",
      "Times": "1:00 p.m."
   },
   {
      "id": "012",
      "Date": "2018-10-13",
      "Teams": "U3 and U4",
      "Location": "03",
      "Times": "9:30 a.m."
   },
   {
      "id": "013",
      "Date": "2018-10-13",
      "Teams": "U5 and U1",
      "Location": "02",
      "Times": "1:00 p.m."
   },
   {
      "id": "014",
      "Date": "2018-10-20",
      "Teams": "U6 and U3",
      "Location": "05",
      "Times": "9:30 a.m."
   },
   {
      "id": "015",
      "Date": "2018-10-20",
      "Teams": "U2 and U4",
      "Location": "04",
      "Times": "1:00 p.m."
   },
   {
      "id": "016",
      "Date": "2018-10-27",
      "Teams": "U3 and U1",
      "Location": "01",
      "Times": "9:30 a.m."
   },
   {
      "id": "017",
      "Date": "2018-10-27",
      "Teams": "U5 and U6",
      "Location": "03",
      "Times": "1:00 p.m."
   }

]

export function Warninguserstosignin() {
   const warning_temp = "to see Game Chatboard and post messages";
   return <p>
      <SignInButton /> {warning_temp}
   </p>
}

export function Gameinfo() {
   const [user] = useUserState();
   let navigate = useNavigate();
   var route_gamedetails = "/gamedetails/"
   function Handleclick(route, gameid) {
      let path = route.route_gamedetails + gameid.gameid_temp;
      navigate(path)
   }
   return <div>
      <div className="btn-toolbar justify-content-between">
         <div>
            <h5> <img src={logo} alt={logo_alttext} width={logo_width} /> {nysl_league.title}</h5>
         </div>
         <div>
            {user ? <SignOuButton /> : <SignInButton />}
         </div>
      </div>
      <h5>{page_gameinfo_header}</h5>
      <h5>{dayweek_warning}</h5>
      <table className="table">
         <thead>
            {table_games_header.map(header => {
               return (
                  <tr key={header.id}><th>{header.first_col}</th><th>{header.second_col}</th><th>{header.third_col}</th><th>{header.fourth_col}</th>
                  </tr>
               )
            })}
         </thead>
         <tbody>
            {game_info.map(game => {
               var location_temp = game.Location;
               var game_location_temp = game_locations[location_temp][0].name_location;
               var gameid_temp = game.id;
               return (
                  <tr key={game.id} onClick={() => Handleclick({ route_gamedetails }, { gameid_temp })}><td >{game.Date}</td><td>{game.Teams}</td><td>{game_location_temp}</td><td>{game.Times}</td>
                  </tr>
               )
            })}
         </tbody>
      </table>
      <table className="table mb-5">
         <tbody >
            {additional_info_game.map(info => {
               var is_email = validator.isEmail(info.info);
               var info_temp = "N.A";
               if (is_email) {
                  info_temp = <a href={`mailto: ${info.info}`}>{info.info}</a>
               }
               else {
                  info_temp = info.info
               };
               return (
                  <tr key={info.id}>
                     <td>{info.label}</td>
                     <td>{info_temp}</td></tr>
               )
            })}
         </tbody>
      </table>

   </div>
}
export const label_game_details = [
   {
      label_date: "Date",
      label_team: "Team",
      label_location: "Location",
      label_address: "Address",
      label_time: "Time"
   }]

   export function Gamedetails() {
   const [user] = useUserState();
   const { id } = useParams();
   const API_KEY = "AIzaSyD_PVZlhiITxWwbw_tavy_BoJh5PVpyqFY";
   let gametodisplay = game_info.find(game => game.id === id);
   var game_location_temp = game_locations[gametodisplay.Location][0].name_location;
   var game_location_address_temp = game_locations[gametodisplay.Location][0].address;

   var google_api_url = "https://www.google.com/maps/embed/v1/place?q=place_id:";
   var game_location_id_temp = game_locations[gametodisplay.Location][0].google_maps_placeid;
   var game_location_url_temp = google_api_url.concat(game_location_id_temp, "&key=", API_KEY);

   let navigate = useNavigate();
   var route_gamedetails = "/chatboard/"
   function Handleclick(route, id) {
      let path = route.route_gamedetails + id.id;
      navigate(path)
   }


   const Gameboardbutton = () => (
      <button className="btn btn-secondary btn-sm"
         onClick={() => Handleclick({ route_gamedetails }, { id })}>
         {label_button_gameboardchat}
      </button>
   );
   return <div>
      <div className="btn-toolbar justify-content-between">
         <div>
            <h5> <img src={logo} alt={logo_alttext} width={logo_width} /> {nysl_league.title}</h5>
         </div>
         <div>
            {user ? <SignOuButton /> : <SignInButton />}
         </div>
      </div>
      <h5>{page_gamedetails_header}</h5>
      <table className="table">
         <tbody>
            <tr><td>{label_game_details[0].label_date}</td><td>{gametodisplay.Date}</td></tr>
            <tr><td>{label_game_details[0].label_time}</td><td>{gametodisplay.Times}</td></tr>
            <tr><td>{label_game_details[0].label_location}</td><td>{game_location_temp}</td></tr>
            <tr><td>{label_game_details[0].label_address}</td><td>{game_location_address_temp}</td></tr>
            <tr><td>{label_game_details[0].label_team}</td><td>{gametodisplay.Teams}</td></tr>
         </tbody>
      </table>
      <div>
         {user ? <Gameboardbutton /> : <Warninguserstosignin />}
      </div>
      <div className="embed-responsive embed-responsive-1by1">
         <iframe title='Game Location Google Maps' className="embed-responsive-item" allowFullScreen src={game_location_url_temp}></iframe>
      </div>
   </div>

}