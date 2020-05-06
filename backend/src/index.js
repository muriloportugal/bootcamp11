//Importa o express
const express = require('express');
const { uuid, isUuid } = require('uuidv4');
const cors = require('cors');

//Cria uma instância do express
const app = express();
app.use(cors());

//Faz com que o express entenda requisições com o corpo no formato JSON
app.use(express.json());

const projects = [];

function validateProjectId( request, response, next){
  const { id } = request.params;
  if(!isUuid(id)) return response.status(400).json( { 
    error: "Invalid project ID"
  });
  return next();
}

function logRequests(request, response, next){
  const { method, url } = request;
  const logLabel = `[${method.toUpperCase()}] ${url}`;

  console.time(logLabel);
  next();
  console.timeEnd(logLabel);
};
//Aplica o middleware em todas as rotas que estão abaixo deste app.use
app.use(logRequests);
//Aplica o middleware somente nas rotas com o formato /projects/:id
app.use('/projects/:id',validateProjectId);
//Escuta as requisições GET em http://localhost:3333
app.get( '/projects',( request, response )=>{
  const { title } = request.query;
  
  //Se o title for preenchido ele procura no projects por um projeto com o mesmo
  //title informado, caso contrário retorna o projects inteiro
  const results = title 
  ? projects.filter( project => project.title.includes(title))
  : projects;
  
  //Retorna uma mensagem em formato JSON
  return response.json( results );
});

app.post( '/projects', (request, response) =>{
  const { title, owner } = request.body;
  const project = { id: uuid(), title, owner };
  projects.push(project);
  //Exibe o projeto recem criado.
  return response.json( project );
});

app.put( '/projects/:id', (request, response)=>{
  const {id} = request.params;
  const { title, owner } = request.body;
  
  //Pega a posição do projeto com o mesmo id passado no parâmetro
  const projectIndex = projects.findIndex( project => project.id === id);
  
  if( projectIndex < 0 ){
    return response.status(400).json( { error: "Project not found."});
  }

  const project = { id, title, owner };

  projects[projectIndex] = project;

  return response.json( project );
});

app.delete( '/projects/:id', (request, response)=>{
  const {id} = request.params;
  const { title, owner } = request.body;
  
  //Pega a posição do projeto com o mesmo id passado no parâmetro
  const projectIndex = projects.findIndex( project => project.id === id);
  
  if( projectIndex < 0 ){
    return response.status(400).json( { error: "Project not found."});
  }

  projects.splice(projectIndex,1);
  //Sempre retornar status 204 para respostas vazias
  return response.status(204).send( );
});

//Coloca o express para escutar a prota 3333
app.listen(3333, ()=>{
  console.log('Back-end started!');
});