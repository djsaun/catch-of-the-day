import Rebase from 're-base';

// Create base - connection to firebase database
const base = Rebase.createClass({
  apiKey: "AIzaSyCZTw9dg4nuiEvlkrDiQmzd-NIQ2viKDso",
  authDomain: "catch-of-the-day-be92d.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-be92d.firebaseio.com"
});

export default base; 