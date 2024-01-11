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
              <Route path="/" element={<Navigate to="ancient-egyptian-dictionary/about" replace />} />
              <Route path='ancient-egyptian-dictionary/about' element={<About/>}/>
              <Route path='ancient-egyptian-dictionary/signin' element={<LoginPage/>}/>
              <Route path='ancient-egyptian-dictionary/signup' element={<RegisterPage/>}/>
              <Route path='ancient-egyptian-dictionary/profile' element={<Profile/>}/>
              <Route path='ancient-egyptian-dictionary/questions/*' element={<QuestionsPage/>}/>
              <Route path='ancient-egyptian-dictionary/dictionary' element={<Dictionary/>}/>
              <Route path='ancient-egyptian-dictionary/phonograms' element={<Phonogram/>}/>
              <Route path='ancient-egyptian-dictionary/pharaohs' element={<Pharaoh/>}/>
              <Route path='ancient-egyptian-dictionary/pharaohs/abydoscanon' element={<AbydosCanon/>}/>
              <Route path='ancient-egyptian-dictionary/pharaohs/saqqaracanon' element={<SaqqaraCanon/>}/>
              <Route path='ancient-egyptian-dictionary/gods' element={<God/>}/>
              <Route path='ancient-egyptian-dictionary/glyphreader' element={<GlyphReader/>}/>
              <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
