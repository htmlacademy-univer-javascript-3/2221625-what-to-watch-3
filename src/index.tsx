import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);



const ImgComp=[{"img/fantastic-beasts-the-crimes-of-grindelwald.jpg":"Fantastic Beasts: The Crimes of Grindelwald"},{"img/bohemian-rhapsody.jpg","Bohemian Rhapsody"}]
  


root.render(
  <React.StrictMode>
    <>
      <App></App>
    </>
  </React.StrictMode>
);
