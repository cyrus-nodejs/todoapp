
import Home from './pages/Home'
import './App.css'
import { env } from './config/env';


function App() {
 
console.log(env.MODE); // "development" | "production"
console.log(env.API_BASE_URL); // correct URL per environment
console.log(import.meta.env.MODE); // "development" or "production"
console.log(import.meta.env.PROD); // boolean
console.log(import.meta.env.DEV); 

  return (
    <>
 <Home />
    </>
  )
}

export default App
