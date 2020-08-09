function createSearchCondition(queryString: string) {
    if(queryString.match(/\w*_\w*/g)) {
        queryString = queryString.replace('/_/g', ' ');
    }
    return {'name': queryString};
}

export {createSearchCondition};
