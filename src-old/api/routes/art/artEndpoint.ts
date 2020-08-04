import * as express from 'express';
let artEndpoint = express.Router({strict: true});

artEndpoint.get('/', (req: express.Request, res: express.Response) => {
   return res.status(200).json({message: 'Art Endpoint Working'})
});

export{artEndpoint}