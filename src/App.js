import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import Header from './components/Header';
import ProductsList from './components/ProductsList';
import ProductDescription from './components/ProductDescription';

function App() {
  return (
    <>
      <Header /> 
      <Router>
        <Routes>
          <Route path="/items" Component={ProductsList}/>
          <Route path="/items/:id" Component={ProductDescription}/>
        </Routes>
      </Router>
    </>
  )
}

export default App;
