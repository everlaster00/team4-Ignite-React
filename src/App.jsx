import './App.css';
import { Navigation, Footer, HomePage, AboutPage } from './components/ui';
import TeamNotication from './temp_components/TeamNotification';
import { Routes , Route } from 'react-router-dom';

function App() {

  return (
    <>
      <TeamNotication />
      <header>
        <Navigation />
      </header>
      <main className='m-3'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/about' element={<AboutPage />} />
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  )
}

export default App
