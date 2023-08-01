require("dotenv").config();


let getHomePage = (req, res) => {
    return res.send("Hello");
};

let getWebhook = (req, res) => {
  let VERIFY_TOKEN = process.env.VERIFY_TOKEN;
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  // Check if a token and mode is in the query string of the request
  if (mode && token) {
    // Check the mode and token sent is correct
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      // Respond with the challenge token from the request
      res.status(200).send(challenge);
    } else {
      // Respond with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }

};

let postWebhook = (req, res) => {
    let body = req.body;
    if (body.object === "page") {
        // Returns a '200 OK' response to all requests
        res.status(200).send("EVENT_RECEIVED");
      } else {
        // Return a '404 Not Found' if event is not from a page subscription
        res.sendStatus(404);
      }
};

module.exports = {
    getHomePage : getHomePage,
    getWebhook : getWebhook,
    postWebhook : postWebhook
}