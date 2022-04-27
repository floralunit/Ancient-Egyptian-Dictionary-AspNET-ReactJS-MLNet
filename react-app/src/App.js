import './App.css';
import {Navbar} from './components/Navbar';
import {BrowserRouter, Route,  Routes} from 'react-router-dom';
import {Dictionary} from "./pages/Dictionary";
import {Phonogram} from "./pages/Phonogram";
import {Pharaoh} from "./pages/Pharaoh";
import {God} from "./pages/God";
import {About} from "./pages/About";
import {GlyphReader} from "./pages/GlyphReader";

function App() {
  return (
      <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route path='/dictionary' element={<Dictionary/>}/>
             <Route path='/phonograms' element={<Phonogram/>}/>
              <Route path='/pharaohs' element={<Pharaoh/>}/>
              <Route path='/gods' element={<God/>}/>
              <Route path='/about' element={<About/>}/>
              <Route path='/glyphreader' element={<GlyphReader/>}/>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
