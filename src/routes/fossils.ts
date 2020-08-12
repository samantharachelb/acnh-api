import {Router} from 'express';
let fossilController = require('@src/controllers/fossils');

let router = Router();

router.route('/').get(fossilController.findAllFossils);
router.route('/groups').get(fossilController.findAllFossilGroups)
router.route('/:name').get(fossilController.findFossilsByName);
export default router;
