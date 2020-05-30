import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

// Quando vamos herdar uma interface e não vamos sobrescrever seus atribtos,
// usamos o type no lugar de interface
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

// Recebo todas as propriedades que foram passadas para o meu elemento
// pelo parâmetro props, e repasso ele para o button, já que definimos qe a
// interface de props são todos os atributos de um button do HTML (ButtonProps). Isso se
// chama spreading. (foi criado uma regra no eslint para desabilitar o erro)

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => (
  <Container type="button" {...rest}>
    {children}
  </Container>
);

export default Button;
