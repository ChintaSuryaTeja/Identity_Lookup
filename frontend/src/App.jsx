import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import PhotoUpload from './components/photoUpload.jsx';

function App() {
  return (
    <div className="p-8">
      <PhotoUpload />
    </div>
  );
}

export default App;
