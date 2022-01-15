import logo from './logo.svg';
import './App.css';
import Particles from 'react-particles-js';

function App() {
  return (
    <Particles
      params={{
        particles: {
          line_linked: {
            shadow: {
              enable: true,
              color: '#3CA9D1',
              blur: 5,
            },
          },
        },
      }}
      style={{
        width: '100%',
        height: '100%',
      }}
    />
  );
}

export default App;
