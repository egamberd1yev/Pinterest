import React from 'react'
import ReactDOM from 'react-dom/client'
import { provider } from './components/ui/provider'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <provider>
      <App />
    </provider>
  </BrowserRouter>
)