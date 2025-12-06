import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [jokes, setJokes] = useState([])
console.log("Jokes are", jokes);
// console.log("jokes 1", jokes[1].title);



  useEffect(() => {
    axios.get("/api/jokes")
    .then((response) => {
      setJokes(response.data)
      console.log("data from api" , response.data);
      
    })
    .catch((error) =>{
      console.log(error)
    })
  }, [])

  return (
    <>
    <h1>hi we are learning fullStack web application</h1>
    <p>JOKES: {jokes.length} </p>

    {
      jokes.map((joke) => (
        <div key={joke.id}>
          <h3>{joke.title}</h3>
          <p>{joke.content}</p>
        </div>
      ))
    }
    </>
  )
}

export default App




