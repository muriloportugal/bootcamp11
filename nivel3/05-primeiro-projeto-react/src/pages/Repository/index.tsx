import React from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { FiChevronsLeft } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';
import { Header } from './styles';

interface RepositoryParams {
  repository: string;
}

const Repository: React.FC = () => {
  const { params } = useRouteMatch<RepositoryParams>();
  return (
    <Header>
      <img src={logoImg} alt="Github Explorer" />
      <Link to="/dashborad">
        <FiChevronsLeft size={16} />
        Voltar
      </Link>
    </Header>
  );
};

export default Repository;
