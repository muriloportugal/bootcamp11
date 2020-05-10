
interface TechObject {
  title: string;
  experience: number;
}
//Utilizamos o interface para definirmos o formato de um objeto.
interface CreateUserData {
  //Utiliza o ? na frente do : para falar que essa variável é opcional
  name?: string;
  email: string;
  //Password pode receber string ou somente number
  password: string | number;
  //Exemplo de array misto, que pode receber mais de um tipo.
  techs: Array<string | TechObject>;

}
//Usa-se export default pois services devem exportar somente uma funcionalidade
export default function createUser({name = '', email , password, techs }: CreateUserData){
  //createUser({name = '', email , password }: CreateUserData) estamos 
  // desestruturando o objeto CreateUser Data, seria a mesma coisa que fazer
  // (data: CreateUserData) mas neste caso estaria sem a desestruturação
  const user = {
    name,
    email,
    password,
    techs,
  }
  //Após declarar o tipo das variáveis, se vc parar o mouse em cima do user
  // vai te mostrar as suas propriedades e os tipos das mesmas.
  return user;
}