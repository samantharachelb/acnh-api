import jsonQuery from 'json-query';
import log from '@src/utils/log';

// function byType(searchValue: string, searchData: object) {
//     let jsonData: object[];
//     jsonData = [];
//
//     // get each value for the key "name-USen"
//     let prelimSearch = jsonQuery(`[*name]`, {data: searchData}).value;
//     // create regex search pattern to iterate over the returned values from the last step
//     let regex = new RegExp('^.*(?<!\w)(' + searchValue + ').*$', "gm");
//     for (var key in prelimSearch) {
//         // store the matching key:value pairs in a temporary JSON object
//         if (prelimSearch[key].match(regex)) {
//             log.debug(prelimSearch[key]);
//             // replace " " with "_" in each matching key value and create new search value
//             searchValue = prelimSearch[key];
//             // new query with the new search value
//             let query = jsonQuery(`[*name=${searchValue}]`, {data: searchData}).value;
//             jsonData.push(query);
//         }
//     }
//     return jsonData
// }

function byType(searchValue: string, searchData: object) {
    return jsonQuery(`[*tag=${searchValue}]`, {data: searchData}).value;
}

function byId(searchId: number, searchData: object) {
    return jsonQuery(`[*id=${searchId}]`, { data: searchData}).value;
}
export {byType, byId};