
import './App.css';


import {Route,Routes,BrowserRouter as Router} from 'react-router-dom';

import Company from './components/company/Company';
import Users from './components/users/Users';
import UserDetails from './components/users/UserDetails';
import CompanyDetails from './components/company/CompanyDetails';



function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path="/" Component={Company}/>
          <Route path="/companies" Component={Company}/>
          <Route path="/users" Component={Users} />
          <Route path="/company/:companyId" Component={CompanyDetails}/>
          <Route path="/user/:userId" Component={UserDetails}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
