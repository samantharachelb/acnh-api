import {Router} from 'express';
let critterController = require('@src/controllers/critters');

let router = Router();

router.route('/')
    .get(critterController.findAllCritters);

router.route('/:type')
    .get(critterController.findAllByType);

router.route('/:name')
    .get(critterController.findByName);

export default router;