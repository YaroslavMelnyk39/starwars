import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
} from 'react-router-dom';
import CharacterList from './components/CharacterList';
import CharacterDetail from './components/CharacterDetail';

function App() {
  return (
    <Router>
      <div className="container mx-auto px-4 md:px-0">
        
        <header className="text-center py-6 mb-4 bg-gray-800 text-white shadow-lg">
          <h1 className="text-3xl font-bold">Star Wars Character Explorer</h1>
          <nav className="mt-4">
            <ul>
              <li><Link to="/" className="text-blue-400 hover:underline">Go Home</Link></li>
            </ul>
          </nav>
        </header>

        <main className="bg-gray-100 p-6 rounded-lg shadow">
          <Routes>
            <Route path="/" element={<CharacterList />} />
            <Route path="/character/:id" element={<CharacterDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
