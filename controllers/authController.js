const {Common} = require("../helpers/common");
const UserQuery = require("../database/query/UserQuery");
const {generarJWT} = require("../helpers/generate_jwt");

class AuthController {
    static login = async (req, res) => {
        try {
            let user = await UserQuery.checkLoginCredentials(req.body.email, req.body.password);
            let token = generarJWT(user.id)
            let response = Common.getStandardResponse(200, token);

            return res.status(200).json(response);
        } catch (e) {
            let response = Common.getStandardResponse(400, {message: e.message});

            return res.status(400).json(response);
        }
    }
}

module.exports = {
    AuthController
};