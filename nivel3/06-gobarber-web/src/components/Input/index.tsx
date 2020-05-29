import React, { InputHTMLAttributes } from 'react';

import { Container } from './styles';

// Cria essa interface herdando todos os atributos que um input normal receberia
// e esta vai ser usada no nosso componente Container para podermos enviar as
// propriedades que nosso input precisa.
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

const Input: React.FC<InputProps> = props => (
  <Container>
    {
      // Recebo todas as propriedades que foram passadas para o meu elemento
      // pelo parâmetro props, e repasso ele para o input, já que definimos qe a
      // interface de props são todos os atributos de um input do HTML (InputProps). Isso se
      // chama spreading. (foi criado uma regra no eslint para desabilitar o erro)
    }
    <input {...props} />
  </Container>
);

export default Input;
