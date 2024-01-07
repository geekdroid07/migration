import { RouteOptions } from 'fastify/types/route';
// import AuthController from '../controllers/AuthController';
import { BadRequestResponse, SuccessResponse } from '../errors/ApiResponse';
import { execSync } from 'child_process';
import path from 'path';

const routes: RouteOptions[] = [
  {
    method: "POST",
    url: "/migration",
    handler:  async (req, reply) => {
      try {
        const {origin, destiny}: any = req.body;       
        const pathFolder = path.join(__dirname, 'backup.sql')
        execSync(`pg_dump -h ${origin.host} --port ${origin.port} -U ${origin.user} -d ${origin.database} --no-password --verbose --file ${pathFolder} --format=c --blobs`);
        execSync(`pg_restore -h ${destiny.host} --port ${destiny.port} -U ${destiny.user} -d ${destiny.database} --no-password -1 ${pathFolder}`);
        
        new SuccessResponse('Query Successful', {ok: true}).send(reply)
      } catch (error) {
        debugger
        new BadRequestResponse('an error has occurred').send(reply);
      }
    },
  }
];

export default routes;
