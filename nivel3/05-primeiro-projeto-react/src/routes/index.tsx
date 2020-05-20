import React from 'react';
import { Switch, Route } from 'react-router-dom';
// Switch garante que somente uma rota seja exibida, sem eles todas as rotas
// são exibidas
import Dashboard from '../pages/Dashboard';
import Repository from '../pages/Repository';

const Routes: React.FC = () => (
  // Necessário utilizar o exact na primeira rota /, pois caso contrário o react
  // faz uma verificação de inclusão "O caminho que estou acessando no browser
  // inclui aquele endereço? Se sim, mostra o componente." Como o primeiro caminho
  // é a / ela sempre vai estar presente nas outras rotas, por isso precisamos
  // dizer para acessar a rota raiz somente se o caminho for exatamente (exact) igual
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/repository" component={Repository} />
  </Switch>
);

export default Routes;
