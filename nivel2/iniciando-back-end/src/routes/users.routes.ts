import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

// http://localhost:3333/users

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;
    const createUser = new CreateUserService();
    const user = await createUser.execute({ name, email, password });
    delete user.password; // deleta o password antes de enviar para o usuário por questões de segurança
    return response.json(user);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default usersRouter;
