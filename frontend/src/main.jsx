import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import {DateProvider} from './context/DatePickerContext.jsx';
import { UserProvider } from './context/UserProvider.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <BrowserRouter>
  <UserProvider>
    <DateProvider>
      <App />
      </DateProvider>
      </UserProvider>
    </BrowserRouter>
  // </React.StrictMode>,
)
