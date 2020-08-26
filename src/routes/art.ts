import {Router, Request, Response, NextFunction} from 'express';
let model = require('@src/models/art');
const config = require('@src/config');

let router = Router();

let resources = ['paintings', 'statues'];

let responseFieldsMin: string[] = [
    'id', 'name', 'real_artwork_title', 'artist', 'description', 'size', 'catalog', 'variants'
]
let responseFields: string[];

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.status(400).json({
        message: "Missing response data type from request. Expected ['min', 'full']"
    });
});

router.get('/:dataType', (req: Request, res: Response) => {
    let dataType = req.params.dataType;
    if (!config.responseDataTypes.includes(dataType)) {
        return res.status(404).json({
            message: `Invalid response data type. Expected [${config.responseDataTypes}], Got ${dataType}`
        });
    } else {
        if (dataType === 'min') {
            responseFields = responseFieldsMin
        } else {
            responseFields = [];
        }
        model.art.find({}, {'_id': 0})
            .select(responseFields)
            .sort({'name': 'asc'})
            .exec((error: Error, result: Document) => {
                if (error) {
                    return res.status(500).json(error);
                } else {
                    return res.status(200).json(result)
                }
            })
    }
})

router.get('/:resource/:responseType', (req: Request, res: Response) => {
    let dataType = req.params.responseType;
    let resource = req.params.resource;

    if (dataType === 'min') {
        responseFields = responseFieldsMin
    } else if (dataType === 'full') {
        responseFields = [];
    }

    if (!config.responseDataTypes.includes(dataType)) {
        return res.status(404).json({
            message: `Invalid response data type. Expected ${config.responseDataTypes}, Got ${dataType}`
        });
    }

    if (!resources.includes(resource)) {
        if(resource.match(/\w+_\w+/)){
            resource = resource.replace(/_/, ' ');
        }
        model.art.findOne({'name': resource}, {'_id': 0})
            .select(responseFields)
            .exec(function(error: Error, result: Document) {
                if (error) {
                    return res.status(500).json(error);
                } else if (result === null) {
                    return res.status(404).json({
                        message: `Could not find any resource or critter named '${resource}'. ` +
                            "Consult the API docs for more information"
                    });
                } else {
                    return res.status(200).json(result);
                }
            })
    }

    if (resource === 'paintings') {
        model.art.find({'tag': 'Picture'}, {'_id': 0})
            .select(responseFields)
            .sort({'name': 'asc'})
            .exec((error: Error, result: Document) => {
                if (error) {
                    return res.status(500).json(error);
                } else {
                    return res.status(200).json(result)
                }
            })
    } else if (resource === 'statues') {
        model.art.find({'tag': 'Sculpture'}, {'_id': 0})
            .select(responseFields)
            .sort({'name': 'asc'})
            .exec((error: Error, result: Document) => {
                if (error) {
                    return res.status(500).json(error);
                } else {
                    return res.status(200).json(result)
                }
            })
    }
})

export default router;
