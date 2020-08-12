import {Request, Response} from 'express';
import {Fossils} from '@src/models/fossils';
import {createSearchCondition} from '@src/utils/createSearchCondition'

import log from '@src/utils/log';

let returnFields = ['name', 'fossil_group', 'description', 'hha_base_points', 'size', 'museum', 'catalog', 'variants'];
let searchableFields = ['name']

exports.findAllFossils = function(req: Request, res: Response) {
    Fossils.find({} , {'_id': 0})
        .collation({locale: 'en'})
        .select(returnFields)
        .sort({'name': 'asc'})
        .exec(function(error: Error, result: Document) {
            if(error) {
                return res.status(500).json(error);
            } else {
                return res.status(200).json(result);
            }
        });
}

exports.findAllFossilGroups = function(req: Request, res: Response) {
    Fossils.find({}, {'_id': 0})
        .collation({locale: 'en'})
        .distinct('fossil_group')
        .exec(function(error: Error, result: Document) {
            if(error) {
                return res.status(500).json(error);
            } else {
                return res.status(200).json(result);
            }
        });
}

exports.findFossilsByName = function(req: Request, res: Response) {
    let searchParam: any = req.params.name;
    let searchCondition = createSearchCondition(searchParam)
    Fossils.findOne(searchCondition, {'_id': 0})
        .select(returnFields)
        .exec(function(error: Error, result: Document) {
            if (error) {
                return res.status(500).json(error);
            } else if (result === null) {
                return res.status(404).json({message: `Could not find any fossils with the id "${searchParam}"`});
            } else {
                log.debug(req.query.id)
                return res.status(200).json(result);
            }
        })

}
