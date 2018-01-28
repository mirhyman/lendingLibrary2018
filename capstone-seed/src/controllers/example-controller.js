const exampleService = require('../services/example.service');

function validateGuid(guid) {
    let guidRegex = '^[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}$';
    return guid.match(guidRegex);
}

async function getUser(req, res) {
    let userId = req.params.userId;
    if(!userId || !validateGuid(userId)) {
        res.serverError(400, 'UserId must be a valid GUID');
        return;
    }
    try {
        const user = await exampleService.getUser(userId.toLowerCase());
        if(user) {
            res.serverOk(user);
        } else {
            res.serverError(404, 'Not Found');
        }
    } catch (err) {
        res.serverError(500, err);
    }
}

async function saveUser(req, res) {
    try {
        res.serverOk(await exampleService.saveUser(req.body) /* todo probably needs cleaning */);
    } catch (err) {
        res.serverError(500, err);
    }
}

async function deleteUser(req, res) {
    let userId = req.params.userId;
    if(!userId || !validateGuid(userId)) {
        res.serverError(400, 'DomainId must be a valid GUID');
        return;
    }
    try {
        await exampleService.deleteUser(userId.toLowerCase());
        res.serverOk();
    } catch (err) {
        res.serverError(500, err);
    }
}

async function findAllUsers(req, res) {
    let name = req.query.name;
    if (!name || name.length < 3){
        res.serverError(400, 'Must specify a name with at least 3 letters');
        return;
    }
    try {
        res.serverOk(await exampleService.findUsers(name.toLowerCase()));
    } catch (err) {
        res.serverError(500, err);
    }
}

module.exports = {
    getUser,
    saveUser,
    deleteUser,
    findAllUsers
};