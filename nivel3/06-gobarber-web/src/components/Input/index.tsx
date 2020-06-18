import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';

import { Container, Error } from './styles';

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
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  // Cria a função como useCallback para que ela seja criada uma única vez na memória
  // mesmo que o componente renderize
  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    // !! = transforma o retorno da variável em boleano, ou seja
    // se tiver valor vai retornar verdadeiro, se não tiver valor retorna falso
    setIsFilled(!!inputRef.current?.value);
  }, []);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  return (
    <Container isErrored={!!error} isFilled={isFilled} isFocused={isFocused}>
      {Icon && <Icon size={20} />}
      {
        // Recebo todas as propriedades que foram passadas para o meu elemento
        // pelo parâmetro props, e repasso ele para o input, já que definimos qe a
        // interface de props são todos os atributos de um input do HTML (InputProps). Isso se
        // chama spreading. (foi criado uma regra no eslint para desabilitar o erro)
      }
      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />

      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default Input;
