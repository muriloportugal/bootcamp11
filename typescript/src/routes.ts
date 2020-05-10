
//Importa os tipos do express para usarmos no nosso código.
import { Request, Response } from 'express';
import createUser from './services/CreateUser';

export function helloWorld(request: Request, response: Response) {
  //Com os tipos declarados ele exibe os parâmetros e os tipos que a função
  // createUser espera, e acusa erro caso algum não seja informado ou se o tipo
  // deles estiver errado.
  const user = createUser({
    //Se apertar CTRL + Space, ele já mostra as propriedades que ele espera
    email: 'murilo@email.com',
    password: '123456',
    techs: [
      'Node.js',
      'ReactJS',
      'React-Native',
      {title: 'Javascript', experience:100},
      
    ],
  });

  //Com o tipo informado na frente da variável, agora o inteliSense funciona
  // se apertarmos Ctrl + Space na frente de "response." vemos que o
  // editor nos mostra um autocomplete para as propriedades do objeto response.
  return response.json({message: 'Hello World'});

};
