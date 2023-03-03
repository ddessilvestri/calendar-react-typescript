import React from 'react'
import { Route } from 'react-router';
import { Routes, Navigate } from 'react-router-dom'
import { LoginPage } from '../auth';
import { CalendarPage } from '../calendar';

export const AppRouter = () => {
  
    let authStatus : string = 'authenticated'; //'not-authenticated';
  
  return (
    <Routes>
        {
            (authStatus === 'not-authenticated')   
            ? <Route path='auth/*' element={ <LoginPage/> } />
            : <Route path='*' element={ <CalendarPage/> } />           
        }
        <Route path='/*' element={ <Navigate to ="auth/login"/> } />

    </Routes>
  )
}
