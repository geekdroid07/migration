import { RouteOptions } from 'fastify/types/route';
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
        const pathFolder = path.join(__dirname, 'database.backup');
        process.env['PGPASSWORD'] = origin.password;
        execSync(`pg_dump -h ${origin.host} --port ${origin.port} -U ${origin.user} -d ${origin.database} --file ${pathFolder} --format=c --blobs`);
        process.env['PGPASSWORD'] = destiny.password;
        execSync(`pg_restore -h ${destiny.host} --port ${destiny.port} -U ${destiny.user} -d ${destiny.database} --schema=${destiny.schema} ${pathFolder}`);
        
        new SuccessResponse('Query Successful', {ok: true}).send(reply);
      } catch (error) {
        debugger
        new BadRequestResponse('an error has occurred' + error).send(reply);
      }
    },
  }
];

export default routes;
