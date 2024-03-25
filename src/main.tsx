import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'

import { BrowserRouter as Router } from 'react-router-dom'
import AuthProvider from './context/AuthContext.tsx'
import { UserProvider } from './context/UserContext.tsx'
import ToastsProvider from './context/ToastsContext.tsx'
import { LikeCardProvider } from './context/LikeCardContext.tsx'
import { DeleteCardProvider } from './context/DeleteCardContext.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <UserProvider>
      <LikeCardProvider>
        <DeleteCardProvider>
          <ToastsProvider>
            <Router>
              <React.StrictMode>
                <App />
              </React.StrictMode>
            </Router>
          </ToastsProvider>
        </DeleteCardProvider>
      </LikeCardProvider>
    </UserProvider>
  </AuthProvider>
)
