const authMiddleware = require('playbuzz-auth');
const exampleController = require('../controllers/example.controller');
const cookieMiddleware = require('../middlewares/cookie.middleware');

module.exports = function (app) {
    /*
     * This is an example of how to implement API
     * Run it and send some request (see below)
     * You can debug it to better understand the code
     * Good luck!
     * */

    /**
     * @swagger
     * definitions:
     *   User:
     *     properties:
     *       userId:
     *         type: string
     *       name:
     *         type: string
     */

    /**
     * @swagger
     * /users/{userId}:
     *   get:
     *     tags:
     *      - Rest API
     *     description: Emulates Playbuzz user authentication
     *     parameters:
     *      - name: userId
     *        in: path
     *        description: user id to get (GUID case insensitive)
     *        required: true
     *        type: string
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: User information
     *         schema:
     *           $ref: '#/definitions/User'
     *       400:
     *         description: invalid input
     *       404:
     *         description: User not found
     *       500:
     *         description: Error has occurred
     */
    app.get('/users/:userId',
        exampleController.getUser
    );

    /**
     * @swagger
     * /users/:
     *   post:
     *     tags:
     *      - Rest API
     *     description: Emulates Playbuzz user authentication
     *     parameters:
     *     - in: body
     *       name: user
     *       description: user to save.
     *       required: true
     *       schema:
     *         $ref: '#/definitions/User'
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: User information
     *         schema:
     *           $ref: '#/definitions/User'
     *       500:
     *         description: Error has occurred
     */
    app.post('/users/',
        exampleController.saveUser
    );

    /**
     * @swagger
     * /users/{userId}:
     *   delete:
     *     tags:
     *      - Rest API
     *     description: Delete a specific user
     *     parameters:
     *       - name: userId
     *         in: path
     *         description: User Id to delete (GUID case insensitive)
     *         required: true
     *         type: string
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Empty object
     *       400:
     *         description: Missing input domain id or not valid GUID
     *       500:
     *         description: Error has occurred
     */
    app.delete('/users/:userId',
        exampleController.deleteUser
    );

    /**
     * @swagger
     * /users:
     *   get:
     *     tags:
     *      - Rest API
     *     description: Find all users
     *     parameters:
     *       - name: name
     *         in: query
     *         description: partial name to look for
     *         required: true
     *         type: string
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Array containing the users
     *         schema:
     *           type: array
     *           items:
     *             $ref: '#/definitions/User'
     *       400:
     *         description: missing input host
     *       500:
     *         description: Error has occurred
     */
    app.get('/users/',
        exampleController.findAllUsers
    );

    /**
     * @swagger
     * /authenticate:
     *   get:
     *     tags:
     *      - Authenticate
     *     description: Emulates Playbuzz user authentication
     *     parameters:
     *       - in: header
     *         name: cookie
     *         description: look for the playbuzz cookie in the header
     *         type: string
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: if authenticated
     *         schema:
     *           type: string
     *         examples:
     *           authenticated:
     *             "You are authenticated as User"
     *       400:
     *         description: missing input cookie
     */
    app.get('/authenticate',
        cookieMiddleware,
        authMiddleware().cookieAuthenticate,
        (req, res) => { res.serverOk("You are authenticated as User");}
    );

    /**
     * @swagger
     * /authenticateSuperUser:
     *   get:
     *     tags:
     *       - Authenticate
     *     description: Emulates Playbuzz super user authentication
     *     parameters:
     *       - in: header
     *         name: cookie
     *         description: look for the playbuzz cookie in the header
     *         type: string
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: if authenticated
     *         schema:
     *           type: string
     *         examples:
     *           authenticated:
     *             "You are authenticated as a Super User"
     *       400:
     *         description: missing input cookie
     */
    app.get('/authenticateSuperUser',
        cookieMiddleware,
        authMiddleware().allow(['superUser']),
        (req, res) => { res.serverOk("You are authenticated as a Super User");}
    );
};