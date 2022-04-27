import './App.css';
import {Home} from './pages/Home';
import {Navbar} from './components/Navbar';
import {BrowserRouter, Route,  Routes} from 'react-router-dom';
import {Dictionary} from "./pages/Dictionary";
import {Phonogram} from "./pages/Phonogram";

function App() {
  return (
      <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route path='/home' element={<Home/>}/>
            <Route path='/dictionary' element={<Dictionary/>}/>
              <Route path='/phonograms' element={<Phonogram/>}/>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
