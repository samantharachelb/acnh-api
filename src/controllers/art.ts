import {NextFunction, Request, Response} from 'express';
let Art = require('@src/models/art');

let returnFields = [
    'id', 'name', 'category', 'size', 'real_artwork_title', 'artist', 'description',
    'hha_base_points', 'interact', 'catalog', 'variants'
]

let searchableFields = ['paintings', 'statues'];

exports.findAll = function(req: Request, res: Response) {
    Art.find({}, {'_id': 0}) // do not return the _id field
        .select(returnFields)
        .sort({'id': 'asc'})
        .exec(function(error: Error, result: Document) {
            if (error) {
                return res.status(500).json(error);
            } else {
                return res.status(200).json(result);
            }
        });
}

exports.findAllByType = function(req: Request, res: Response, next: NextFunction) {
    let searchParam = req.params.type;

    if (searchableFields.includes(searchParam)){ // only perform a search if the parameter matches any value in array
        if (searchParam === 'paintings') {
            searchParam = 'Picture'; // change search parameter to the tag we're searching for
        } else {
            searchParam = 'Sculpture';
        }

        Art.find({'tag': searchParam}, {'_id': 0})
            .select(returnFields)
            .sort({'id': 'asc'})
            .exec(function(error: Error, result: Document) {
                if (error) {
                    return res.status(500).json(error);
                } else {
                    return res.status(200).json(result);
                }
            });
    } else {
        // the parameter supplied didn't match any value in the array, so now we're searching for individual art pieces
        next();
    }
};

exports.findById = function(req: Request, res: Response) {
    let searchParam: any = req.params.id;
    var searchConditions: {};
    if (Number.isInteger(searchParam * 1)) {
        searchParam = searchParam * 1;
        searchConditions = {'id': searchParam};
    } else {
        if (searchParam.match(/\w*_\w*/g)) { // check if search string has an underscore or not
            searchParam = searchParam.replace(/_/g, ' '); // replace undescore with a space
        }
        searchConditions = {'name': searchParam};
    }
    Art.findOne(searchConditions, {'_id': 0})
        .select(returnFields)
        .sort({'id': 'asc'})
        .exec(function(error: Error, result: Document) {
            if (error) {
                return res.status(500).json(error);
            } else if (result === null) {
                return res.status(404).json({message: `Could not find any art with the id "${searchParam}"`});
            } else {
                return res.status(200).json(result);
            }
        })
}
