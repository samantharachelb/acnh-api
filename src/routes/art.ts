import {Router} from 'express';
let artController = require('@src/controllers/art');

let router = Router();

router.route('/')
    .get(artController.findAll);

router.route('/:type')
    .get(artController.findAllByType);

router.route('/:id')
    .get(artController.findById);

export default router;