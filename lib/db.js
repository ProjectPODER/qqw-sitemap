async function getPersonIDs(db) {
    let collection = db.get('persons');
    let ids = await getAllIDs(collection, {}, { fields: { '_id': 0, 'id': 1, 'compiledRelease.date': 1 } });
    return ids;
}

async function getCompanyIDs(db) {
    let collection = db.get('organizations');
    let ids = await getAllIDs(collection, { 'compiledRelease.classification': 'company' }, { fields: {'_id': 0, 'id': 1, 'compiledRelease.date': 1 } });
    return ids;
}

async function getInstitutionIDs(db) {
    let collection = db.get('organizations');
    let ids = await getAllIDs(collection, { 'compiledRelease.classification': { '$ne': 'company'} }, { fields: {'_id': 0, 'id': 1, 'compiledRelease.date': 1 } });
    return ids;
}

async function getRegionIDs(db) {
    let collection = db.get('areas');
    let ids = await getAllIDs(collection, {}, { fields: { '_id': 0, 'id': 1 } });
    return ids;
}

async function getProductIDs(db) {
    let collection = db.get('products');
    let ids = await getAllIDs(collection, {}, { fields: { '_id': 0, 'id': 1 } });
    return ids;
}

async function getAllIDs(collection, query, fields) {
    let list = await collection.find(query, fields);
    return list;
}

module.exports = { getPersonIDs, getCompanyIDs, getInstitutionIDs, getRegionIDs, getProductIDs };
