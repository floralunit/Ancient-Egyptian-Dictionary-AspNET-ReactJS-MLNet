import './App.css';
import {Navbar} from './components/Navbar';
import {BrowserRouter, Route,  Routes, Navigate} from 'react-router-dom';
import {Dictionary} from "./pages/Dictionary";
import {Phonogram} from "./pages/Phonogram";
import {Pharaoh} from "./pages/Pharaoh";
import {AbydosCanon} from "./pages/AbydosCanon";
import {SaqqaraCanon} from "./pages/SaqqaraCanon";
import {God} from "./pages/God";
import {About} from "./pages/About";
import {GlyphReader} from "./pages/GlyphReader";

function App() {
  return (
      <BrowserRouter>
          <Navbar/>
          <Routes>
              <Route path="/" element={<Navigate to="/about" replace />} />
              <Route path='/about' element={<About/>}/>
              <Route path='/dictionary' element={<Dictionary/>}/>
              <Route path='/phonograms' element={<Phonogram/>}/>
              <Route path='/pharaohs' element={<Pharaoh/>}/>
              <Route path='/pharaohs/abydoscanon' element={<AbydosCanon/>}/>
              <Route path='/pharaohs/saqqaracanon' element={<SaqqaraCanon/>}/>
              <Route path='/gods' element={<God/>}/>
              <Route path='/glyphreader' element={<GlyphReader/>}/>
              <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
