const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const { Configuration, OpenAIApi } = require("openai");
const { json } = require('body-parser');
require('dotenv').config();

const configuration = new Configuration({
  apiKey: process.env.LLAVE_CHAT
});
const openai = new OpenAIApi(configuration);
app.use(bodyparser.urlencoded({
  extended:false,limit:'50mb'
}));

//cambiar friend por nombre del puchamon
app.post('/prueba', async (req, res) => {
  console.log(req.body);
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "You: "+req.body.msg+"\nFriend:",
    temperature: 0.5,
    max_tokens: 1000,
    top_p: 1.0,
    frequency_penalty: 0.5,
    presence_penalty: 0.0,
    stop: ["You:"],
  });
  //console.log(response.data.choices[0].text);
  
  res.send(response.data.choices[0].text);
});

app.listen(process.env.HTTP_PORT, () => {
  console.log('Servidor iniciado en el puerto '+process.env.HTTP_PORT);
});