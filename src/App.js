import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Login from './Components/Login';
// import Sidenav from './Components/Sidenav';
import Dashboard from './Pages/Dashboard';
import Category from './Pages/Category';
import Subcategory from './Pages/Subcategory';
import Inventory from './Pages/Inventory';
import Stockin from './Pages/Stockin';
import Stockout from './Pages/Stockout';
import Purchase from './Pages/Purchase';
import Reports from './Pages/Reports';
import UserList from './Pages/UserList';
import Demo from './Pages/Demo';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/navbar' element={<Navbar/>} />
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/category'  element={<Category/>} />
        <Route path='/subcategory'  element={<Subcategory/>} />
        <Route path='/inventory'  element={<Inventory/>} />
        <Route path='/stockinward'  element={<Stockin/>} />
        <Route path='/stockoutward'  element={<Stockout/>} />
        <Route path='/purchasereturn'  element={<Purchase/>} />
        <Route path='/reports'  element={<Reports/>} />
        <Route path='/userlist'  element={<UserList/>} />
        <Route path='/demo' element={<Demo/>} />
      </Routes>
    </div>
  );
}

export default App;
