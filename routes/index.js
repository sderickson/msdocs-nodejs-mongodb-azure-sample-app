var express = require('express');
var Retell = require('retell-sdk');

const client = new Retell({
  apiKey: process.env.RETELL_API_KEY,
});

var router = express.Router();

router.get('/', function (req, res) {
  res.sendFile(__dirname + '/html/index.html');
});

router.post('/web-call', async function(req, res) {
  if (req.body.call_code !== process.env.CALL_CODE) {
    res.status(403).send('Forbidden');
    return;
  }
  const webCallResponse = await client.call.createWebCall({ agent_id: 'agent_b06f4b224e31edca9918835ec3' });
  res.redirect('/web-call?call_id=' + webCallResponse.call_id);
});

router.get('/web-call', async function(req, res) {
  res.sendFile(__dirname + '/html/web-call.html');
});

router.get('/web-call/details', async function (req, res) {
  const callId = req.query.call_id;
  const callResponse = await client.call.retrieve(callId);
  res.json(callResponse);
});

module.exports = router;
