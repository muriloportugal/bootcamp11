import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import routes from './routes';
import uploadConfig from './config/upload';
import AppError from './errors/AppError';
import './database';

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use(
  // No lugar do _: NextFunction, usavamos next: NextFunction, mas o esLint
  // reclamava que declaramos o next e não utilizamos, mas somos obrigado a
  // declarar esses 3 parâmetros para middlewares de tratativas de erros no
  // express. Então substituímos o next por _ e no arquivo .eslintrc.json
  // criamos a rules typescript-eslint/no-unused-vars
  (err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
      // Se err for uma instância de AppError quer dizer que é um erro que eu
      // tratei, que eu conheço.
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }
    // Se for um erro que eu não tratei, que eu não conheço
    console.error(err);

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

app.listen(3333, () => {
  console.log('Server started on port 3333.');
});
