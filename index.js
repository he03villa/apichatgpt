const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const { Configuration, OpenAIApi } = require("openai");
var port = process.env.HTTP_PORT || 3800;
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
app.post('/api/prueba', async (req, res) => {
  console.log(req.body);
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "Quiero que actues como un amigo y que todo lo respondas en español: Tu:"+ req.body.msg+"\nAmigo:",
    temperature: 0.2,
    max_tokens: 30,
    top_p: 1.0,
    frequency_penalty: 0.5,
    presence_penalty: 0.0,
    stop:[" Humano:", " Mascota:"],
  });
  //console.log(response.data.choices[0].text);
  
  res.send(response.data.choices[0].text);
});

app.listen(port, () => {
  console.log('Servidor iniciado en el puerto: '+port);
});