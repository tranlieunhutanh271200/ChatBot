import express from "express";
import chatbotController from "../controllers/chatbotController";

let router = express.Router();

let initWebRouter = (app) => {
    router.get('/', chatbotController.getHomePage);

    router.post('/setup-profile', chatbotController.setupProfile);
    router.get('/webhook', chatbotController.getWebhook);
    router.post('/webhook', chatbotController.postWebhook);
    return app.use("/", router);
};

module.exports = initWebRouter;