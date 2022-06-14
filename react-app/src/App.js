import './styles/App.css';
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
import {LoginPage} from "./pages/LoginPage";
import {RegisterPage} from "./pages/RegisterPage";
import {Profile} from "./pages/Profile";
import QuestionsPage from "./pages/QuestionsPage";

function App() {
  return (
      <BrowserRouter>
          <Navbar/>
          <Routes>
              <Route path="/" element={<Navigate to="/about" replace />} />
              <Route path='/about' element={<About/>}/>
              <Route path='/signin' element={<LoginPage/>}/>
              <Route path='/signup' element={<RegisterPage/>}/>
              <Route path='/profile' element={<Profile/>}/>
              <Route path='/questions/*' element={<QuestionsPage/>}/>
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
