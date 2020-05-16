import multer from 'multer';
import path from 'path';
import crypt from 'crypto';
// Arquivo de configurações do multer, para mostrar onde ele vai gravar
// os arquivos que forem enviados ao nosso servidor e o nome dos mesmos
const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  directory: tmpFolder,

  storage: multer.diskStorage({
    // grava os arquivos na pasta tmp na raiz
    destination: tmpFolder,
    // Adiciona na frente do nome um hash para garantir que não tenha 2 arquivos
    // com o mesmo nome.
    filename(request, file, callback) {
      const fileHash = crypt.randomBytes(10).toString('HEX');
      const fileName = `${fileHash}-${file.originalname}`;
      return callback(null, fileName);
    },
  }),
};
