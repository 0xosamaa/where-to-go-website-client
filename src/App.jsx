import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button, Typography } from '@mui/material'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <Typography variant="h1">Typography h1</Typography>
      <Typography variant="h2">Typography h2</Typography>
      <Typography variant="h3">Typography h3</Typography>
      <Typography variant="h4">Typography h4</Typography>
      <Typography variant="h5">Typography h5</Typography>
      <Typography variant="h6">Typography h6</Typography>
      <Typography variant="body">Normal Typography</Typography>
      
      <div className="card">
      <Button color="primary" variant="contained" onClick={() => setCount((count) => count + 1)}>
          Primary {count}          
        </Button>
        <Button color="secondary" variant="contained" onClick={() => setCount((count) => count + 1)}>
          Secondary is {count}
        </Button>
        <Button color="primary" variant="outlined" onClick={() => setCount((count) => count + 1)}>
          Primary {count}          
        </Button>
        <Button color="secondary" variant="outlined" onClick={() => setCount((count) => count + 1)}>
          Secondary is {count}
        </Button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
