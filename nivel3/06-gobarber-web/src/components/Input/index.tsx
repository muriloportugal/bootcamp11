import React, { InputHTMLAttributes, useEffect, useRef } from 'react';
import { IconBaseProps } from 'react-icons';
import { useField } from '@unform/core';

import { Container } from './styles';

// Cria essa interface herdando todos os atributos que um input normal receberia
// e esta vai ser usada no nosso componente Container para podermos enviar as
// propriedades que nosso input precisa.
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  // Especifico que vou receber um ícone como propriedade do meu componente, e esse
  // ícone também tem propriedades (IconBaseProps)
  icon: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
  const inputRef = useRef(null);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      {Icon && <Icon size={20} />}
      {
        // Recebo todas as propriedades que foram passadas para o meu elemento
        // pelo parâmetro props, e repasso ele para o input, já que definimos qe a
        // interface de props são todos os atributos de um input do HTML (InputProps). Isso se
        // chama spreading. (foi criado uma regra no eslint para desabilitar o erro)
      }
      <input ref={inputRef} {...rest} />
    </Container>
  );
};

export default Input;
