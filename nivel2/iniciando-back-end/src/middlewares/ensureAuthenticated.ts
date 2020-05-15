import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  respose: Response,
  next: NextFunction,
): void {
  // Validação do token JWT

  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw Error('JWT token is missing');
  }

  const [, token] = authHeader.split(' ');
  try {
    const decoded = verify(token, authConfig.jwt.secret);
    // decoded as TokenPayload força a variável decoded a ser do tipo que criamos
    // TokenPayload, pois por padrão ela não tem um tipo definido já que o token
    // pode ser formado por qualquer coisa.
    const { sub } = decoded as TokenPayload;

    // adiciona uma propriedade user na request e com o valor do id do usuário
    // Para adicionar foi necessário sobreescrever a tipagem da Request no arquivo
    // src/@types/express.d.ts
    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new Error('Invalid JWT token');
  }
}
