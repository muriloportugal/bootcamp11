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
    <Route path="/repositories/:repository+" component={Repository} />
  </Switch>
  // Necessário adicionar o + no final do :repository+ pois neste caso estamos
  // recebendo um parâmetro nessa rota que utiliza uma barra invertida também "/"
  // então o react-router-dom acha que é uma rota, para dizer pra ele considerar
  // tudo oq vier depois de /repositories/... como parâmetro colocamos o +.
);

export default Routes;
