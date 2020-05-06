import React from 'react';
import { render } from 'react-dom';
import App from './App';
//Manda renderizar no index.html na div que criamos com id='app' o Hello World
render(<App />,document.getElementById('app'));