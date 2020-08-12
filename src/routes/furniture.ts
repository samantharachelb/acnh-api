import {Router} from 'express';
let furnitureController = require('@src/controllers/furniture');

let router = Router();

router.route('/').get(furnitureController.findAllFurniture);
router.route('/:type').get(furnitureController.findAllFurnitureByType);
router.route('/:name').get(furnitureController.findFurnitureByName);
export default router;
