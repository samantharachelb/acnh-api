import {NextFunction, Request, Response} from 'express';
import {Critters, Bugs, Fish, SeaCreatures} from '@src/models/critters';

let returnFields = [
    'num', 'name', 'sell', 'special_sell', 'where_how', 'shadow', 'catch_difficulty', 'vision',
    'total_catches_to_unlock', 'spawn_rates', 'nh_mar', 'sh_mar', 'size', 'surface', 'description', 'catch_phrase',
    'hha_base_points', 'hha_category', 'icon_filename', 'icon_image', 'critterpedia_filename', 'critterpedia_image',
    'furniture_filename', 'furniture_image', 'colors', 'active_months'
]

let searchableFields = ['bugs', 'fish', 'sea_creatures'];

exports.findAllCritters = function(req: Request, res: Response) {
    Critters.find({}, {'_id': 0})
        .select(returnFields)
        .sort({'source_sheet': 'asc', 'num': 'asc'})
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

    if (searchableFields.includes(searchParam)) {
        if (searchParam === 'bugs') {
            Bugs.find({}, {'_id': 0})
                .select(returnFields)
                .sort({'num': 'asc'})
                .exec(function(error: Error, result: Document) {
                   if (error) { return res.status(500).json(error) }
                   else { return res.status(200).json(result)}
                });
        } else if (searchParam === 'fish') {
            Fish.find({}, {'_id': 0})
                .select(returnFields)
                .sort({'num': 'asc'})
                .exec(function(error: Error, result: Document) {
                    if (error) { return res.status(500).json(error) }
                    else { return res.status(200).json(result)}
                });
        } else if (searchParam === 'sea_creatures') {
            SeaCreatures.find({}, {'_id': 0})
                .select(returnFields)
                .sort({'num': 'asc'})
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

    // var searchConditions: {};
    // if(searchableFields.includes(searchParam)) {
    //     if (searchParam === 'bugs') {
    //         searchConditions = {'source_sheet': 'Insects'}
    //     } else if (searchParam === 'fish') {
    //         searchConditions = {'source_sheet': 'Fish'}
    //     } else if (searchParam === 'sea_creatures') {
    //         searchConditions = {'source_sheet': 'Sea Creatures'}
    //     } else {
    //         return res.status(500).json({message: 'An unknown error has occured'});
    //     }
    //
    //     Critters.find(searchConditions, {'_id': 0})
    //         .select(returnFields)
    //         .sort({'source_sheet': 'asc', 'num': 'asc'})
    //         .exec(function(error: Error, result: Document) {
    //             if (error) {
    //                 return res.status(500).json(error);
    //             } else {
    //                 return res.status(200).json(result);
    //             }
    //         });
    // }
}

exports.findByName = function(req: Request, res: Response) {
    let searchParam: any = req.params.name;
    var searchConditions: {};

    if (searchParam.match(/\w*_\w*/g)) { // check if search string has an underscore or not
        searchParam = searchParam.replace(/_/g, ' '); // replace undescore with a space
    }
    searchConditions = {'name': searchParam};

    Critters.findOne(searchConditions, {'_id': 0})
        .select(returnFields)
        .exec(function(error: Error, result: Document) {
            if (error) {
                return res.status(500).json(error);
            } else if (result === null) {
                return res.status(404).json({message: `Could not find any fish with the id "${searchParam}"`});
            } else {
                return res.status(200).json(result);
            }
        })
}