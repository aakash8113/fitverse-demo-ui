import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Shop from './pages/Shop';
import FitverseAI from './pages/FitverseAI';
import ThriftStore from './pages/ThriftStore';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial, sans-serif;
  }

  body {
    background-color: #ffffff;
  }
`;

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Header />
      <Navigation />
      <Routes>
        <Route path="/" element={<Shop />} />
        <Route path="/shop/*" element={<Shop />} />
        <Route path="/ai" element={<FitverseAI />} />
        <Route path="/thrift" element={<ThriftStore />} />
      </Routes>
    </Router>
  );
}

export default App;
