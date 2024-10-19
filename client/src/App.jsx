import Hero from "./components/Hero"
import Highlights from "./components/Highlights"
import Navbar from "./components/Navbar"
import Model from "./components/Model"
import Features from "./components/Features"
import HowItWorks from "./components/HowItWorks"
import Footer from "./components/Footer"
import { useEffect, useState } from "react"

const App = () => {
  const [ isBackendAvailable, setIsBackendAvailable ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState('');

  useEffect(()=>{
    const checkBackend = async () => {
      try {
        const response = await fetch('http://localhost:8080', {
          mode: 'no-cors'
        });
        if(!response.ok) {
          setIsBackendAvailable(true);
        }
        else {
          setErrorMessage("Backend service is unavaiable");
        }
      } catch (error) {
      }
    }

    checkBackend();
  }, []);

  if(!isBackendAvailable) {
    return <div>{errorMessage || "Checking backend availability"}</div>
  }

  return (
    <main className="bg-black overflow-y-auto overflow-x-hidden">
      <Navbar/>
      <Hero/>
      <Model />
      <Features />
      <HowItWorks />
      <Footer />
    </main>
  )
}

export default App
