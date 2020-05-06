import React, { useState, useEffect } from 'react';
import api from './services/api';
import './App.css';

import Header from './components/Header';


function App() {
  const [ projects, setProjects ] = useState([]);

  useEffect(()=> { 
    api.get('projects').then( response => {
      setProjects(response.data);
    })
  }, [ ]);

  //Adiciona um novo projeto
  async function handleAddProject(){
    
    const response = await api.post('projects', {
      title: `Novo projeto ${Date.now()}`,
      owner: "João da Silva"
    });

    const project = response.data;
    //[...projects ] os 3 pontos é uma função nova do JS chamada spread operator
    //Ele percorre o array projects e joga todo o seu conteúdo neste novo array
    setProjects([...projects, project]);
  };

  return (
    <>
      <Header title='Projects' />

      <ul>
        {projects.map(project => (<li key={project.id}> {project.title} </li>))}
      </ul>
      <button type='button' onClick={handleAddProject}>Adicionar Projeto</button>
    </>
  );
}

export default App;