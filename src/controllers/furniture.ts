import {NextFunction, Request, Response} from 'express';
import {Furniture, Housewares, Misc, Wallmounted} from '@src/models/furniture'
import {createSearchCondition} from '@src/utils/createSearchCondition'

let returnFields = ['name', 'body_title', 'pattern_title', 'diy', 'body_customize', 'pattern_customize', 'size',
    'surface', 'miles_price', 'hha_base_points', 'hha_category', 'interact', 'tag', 'outdoor',
    'speaker_type', 'lighting_type', 'catalog', 'set', 'series', 'customization_kit_cost', 'variants']
let searchableFields = ['furniture', 'housewares', 'misc', 'wall_mounted'];

exports.findAllFurniture = function(req: Request, res: Response) {
    Furniture.find({}, {'_id': 0})
        .collation({locale: 'en'})
        .select(returnFields)
        .sort({'source_sheet': 'asc', 'name': 'asc'})
        .exec(function(error: Error, result: Document) {
            if (error) {
                return res.status(500).json(error);
            } else {
                return res.status(200).json(result);
            }
        });
}

exports.findAllFurnitureByType = function(req: Request, res: Response, next: NextFunction) {
    let searchParam = req.params.type;
    if(searchableFields.includes(searchParam)) {
        if (searchParam === 'housewares') {
            Housewares.find({}, {'_id': 0})
                .collation({locale: 'en'})
                .select(returnFields)
                .sort({'name': 'asc'})
                .exec(function(error: Error, result: Document) {
                    if (error) { return res.status(500).json(error) }
                    else { return res.status(200).json(result)}
                });
        } else if (searchParam === 'misc') {
            Misc.find({}, {'_id': 0})
                .collation({locale: 'en'})
                .select(returnFields)
                .sort({'name': 'asc'})
                .exec(function(error: Error, result: Document) {
                    if (error) { return res.status(500).json(error) }
                    else { return res.status(200).json(result)}
                });
        } else if (searchParam === 'wall_mounted') {
            Wallmounted.find({}, {'_id': 0})
                .collation({locale: 'en'})
                .select(returnFields)
                .sort({'name': 'asc'})
                .exec(function(error: Error, result: Document) {
                    if (error) { return res.status(500).json(error) }
                    else { return res.status(200).json(result)}
                });
        } else {
            return res.status(500).json({message: 'An unknown error has occured'});
        }
    } else {
        next();
    }
}

exports.findFurnitureByName = function(req: Request, res: Response) {
    let searchParam: any = req.params.name;
    var searchConditions = createSearchCondition(searchParam);

    Furniture.findOne(searchConditions, {'_id': 0})
        //.select(returnFields)
        .exec(function(error: Error, result: Document) {
            if (error) {
                return res.status(500).json(error);
            } else if (result === null) {
                return res.status(404).json({message: `Could not find any furniture with the id "${searchParam}"`});
            } else {
                return res.status(200).json(result);
            }
        });
}
