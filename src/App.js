import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

async function getRepositories() {
  try {
    const response = await api.get('/repositories')
    setRepositories(response.data)

  } catch (error) {
    console.log(error)
  }
}

useEffect(() => {
  getRepositories()

}, [])

  async function handleAddRepository() {
    try {
      const resporitoy = {
        tittle: 'Desafio ReactJS',
        url: 'https://github.com/robertoarodrigues/conceitos-reactjs',
        techs: ['NodeJS', 'React', 'React Native']
      }

      const response = await api.post('/repositories', resporitoy)

      setRepositories([... repositories, response.data])

    } catch (error) {
      console.log(error)
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`/repositories/${id}`)
      setRepositories(repositories.filter((repository) => repository.id !== id))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
        <ul data-testid="repository-list">
          {repositories.map((repository) => (
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
            </li>
          ))}
        </ul>

        <button onClick={handleAddRepository}>Adicionar</button>
      </>
  )
}

export default App;
