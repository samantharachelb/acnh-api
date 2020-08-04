import jsonQuery from 'json-query';
import log from '@src/utils/log';

function byName(searchValue: string, searchData: object) {
    let jsonData: object[];
    jsonData = []; // data object to return

    // get each value for the key "name-USen"
    let prelimSearch = jsonQuery(`[**][*name][*name-USen]`, {data: searchData}).value;
    // create regex search pattern to iterate over the returned values from the last step
    let regex = new RegExp('(?<!\w)(' + searchValue + ')', "gm");
    for (var key in prelimSearch) {
        // store the matching key:value pairs in a temporary JSON object
        if (prelimSearch[key].match(regex)) {
            // replace " " with "_" in each matching key value and create new search value
            searchValue = prelimSearch[key].replace(/ /g, '_');
            // new query with the new search value
            let query = jsonQuery(`${searchValue}`, {data: searchData}).value;
            jsonData.push(query)
        }
    }
    return jsonData
}

function byId(searchId: number, searchData: object) {
    let prelimSearch = jsonQuery(`[**][*id=${searchId}]`, { data: searchData}).value;
    return prelimSearch;
}
export {byName, byId};