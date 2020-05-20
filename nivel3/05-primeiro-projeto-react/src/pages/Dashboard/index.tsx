import React, { useState, FormEvent } from 'react';
import { FiChevronRight } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

import { Title, Form, Repositories } from './styles';

const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = useState(''); // Vai guardar o repo que o usuário digitar no form
  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();
    // API do GitHub tem limite de 100 req / hora.
    const response = await api.get(`repos/${newRepo}`);
    console.log(response.data);
  }

  return (
    <>
      <img src={logoImg} alt="Github Explorer" />
      <Title>Explore repositórios no Github</Title>
      <Form onSubmit={handleAddRepository}>
        <input
          value={newRepo}
          onChange={e => setNewRepo(e.target.value)}
          placeholder="Digite o nome do repositório"
        />
        <button type="submit">Pesquisar</button>
      </Form>
      <Repositories>
        <a href="teste">
          <img
            src="https://avatars3.githubusercontent.com/u/40072024?s=460&u=68a1f857c230ef27d4b83571e5878a66ed36dd16&v=4"
            alt="Murilo"
          />
          <div>
            <strong>muriloportugal/DelugeAddTorrent</strong>
            <p>Firefox plugin for deluge</p>
          </div>
          <FiChevronRight size={20} />
        </a>
      </Repositories>
    </>
  );
};

export default Dashboard;
