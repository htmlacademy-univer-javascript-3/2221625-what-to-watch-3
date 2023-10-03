import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';


let name:string = "The Grand Budapest Hotel"
let date:string = "2014"
let genre:string = "Drama"


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App name={name} date={date} genre={genre}/>
  </React.StrictMode>
);
