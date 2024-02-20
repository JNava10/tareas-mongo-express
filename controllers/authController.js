const {Common} = require("../helpers/common");
const UserQuery = require("../database/query/UserQuery");
const {generarJWT} = require("../helpers/generate_jwt");
const models = require("../models");

class AuthController {
    static login = async (req, res) => {
        try {
            let savedUser = await UserQuery.emailExists(req.body.email);

            if (!savedUser)  {
                return res.status(401).json(
                    Common.getStandardResponse(401)
                );
            }

            let isValid = await UserQuery.checkLoginCredentials(req.body.email, req.body.password, savedUser);

            if (!isValid) {
                return res.status(401).json(
                    Common.getStandardResponse(401)
                );
            }

            let token = generarJWT(savedUser.id)

            return res.status(200).json(
                Common.getStandardResponse(200, token)
            );

        } catch (e) {
            let response = Common.getStandardResponse(400, {message: e.message});

            return res.status(400).json(response);
        }
    }
}

module.exports = {
    AuthController
};