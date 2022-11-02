import React, {useContext, useState, useEffect} from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import Home from '../../Pages/Home'
import Profil from '../../Pages/Profil'
import SignUp from '../../Pages/SignUpPage'
import SignIn from '../../Pages/SignInPage'
import Calendar from '../../Pages/Calendar'
import PlantDetail from '../../Pages/PlantDetail'
import Garden from '../../Pages/Garden'
import CGU from '../../Pages/CGU'
import Politics from '../../Pages/Politics'
import Legals from '../../Pages/Legals'
import NotFound from '../../Pages/NotFound'
import Unauthorized from '../../Pages/Unauthorized'
import Navbar from '../Navbar'
import Footer from '../Footer'
import {authContext} from '../../Components/Contexts'
import ProtectedRoute from '../../Components/ProtectedRoute'
import GoTopButton from '../../Components/GoToTopButton'
import AdminPage from '../../Pages/AdminPage'

function App(props) {
  // eslint-disable-next-line no-unused-vars
  const { auth, setAuth } = useContext(authContext);
  //const [user, setUser] = useState(null)
  const [userRole, setUserRole]= useState('');
  const role = localStorage.getItem('role');
  useEffect(() => {
    auth.user ? setUserRole(auth.user.role) : setUserRole('')
  }, [auth, userRole])

  return (

    <div className="App">
      
        <Navbar />
        <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/mon-profil' element={<Profil />}/>
            <Route path='/connexion' element={<SignIn />}/>
            <Route path='/creer-mon-compte' element={<SignUp />}/>
            <Route path='/calendrier' element={<Calendar />}/>
            <Route path='/calendrier/:id' element={<PlantDetail />}/>
            <Route path='/cgu' element={<CGU />}/>
            <Route path='/politique-confidentialite' element={<Politics />}/>
            <Route path='/mentions-legales' element={<Legals />}/>

            <Route exact path='/mon-potager' element={
                <ProtectedRoute role='user'>
                  <Garden />
                </ProtectedRoute>}
            /> 

            <Route path='/back-office' element={
              <ProtectedRoute role='admin'>
                <AdminPage />
              </ProtectedRoute>}
            />

            <Route path='*' element={<NotFound />}/>
            <Route path='/403' element={<Unauthorized/>}/>
            {/* <Route path='/calendrier/*' element={<NotFound />}/> */}
        </Routes>
        <GoTopButton />
      <Footer />
    </div>
  );
}

export default App;
