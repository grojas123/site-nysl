import logo from '../nysl_logo.svg';
import { SignInButton, useUserState, SignOuButton } from '../utilities/firebase.js'
const page_home_header = "Home";
export const logo_alttext = "Logo NYSL";
export const logo_width = "100";

export const nysl_league = {
  title: "North Youth Soccer League"
};

export const sport_events = [
  {
    "id": "01",
    "s_event_date": "August 4",
    "s_event_title": "NYSL Fundraiser"
  },

  {
    "id": "02",
    "s_event_date": "August 16",
    "s_event_title": "Season Kick-off: Meet the Teams"
  },
  {
    "id": "03",
    "s_event_date": "September 1",
    "s_event_title": "First Game of the Season (Check Game Schedule for details)"
  }
]

export function Home() {

  const [user] = useUserState();
  return <div>
    <div className="btn-toolbar justify-content-between">
      <div>
        <h5> <img src={logo} alt={logo_alttext} width={logo_width} /> {nysl_league.title}</h5>
      </div>
      <div>
        {user ? <SignOuButton /> : <SignInButton />}
      </div>
    </div>
    <h5>{page_home_header}</h5>
    <ul>
      {sport_events.map(sport_event => {
        return (
          <li key={sport_event.id} className="list-group-item">{sport_event.s_event_date} - {sport_event.s_event_title}</li>
        )
      })}
    </ul>
  </div>



}
