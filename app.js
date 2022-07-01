const express = require("express");
var bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
/* 
1-Autorização
    O aplicativo cliente entra em contato com o servidor e solicita acesso
    O aplicativo cliente fornece um client_id (identificador de string exclusivo)
    O cliente fornece um uri de redirecionamento para enviar ao usuário após a entrega do código
    O cliente pode fornecer dados do usuário para fins de autenticação
    O servidor valida as informações e envia de volta um código de autorização
*/
app.post("/authorization", (req, res)=>{
  require("./authorization")(req, res);
})


/*
2-Token
  O cliente usa o código de autorização recebido para solicitar um token
  O cliente envia client_id, client_secret (se aplicável)
  O servidor valida a solicitação e envia um token.
*/
app.get("/token", (req, res)=>{
  const token = require("./token")(req);

  res.setHeader('Authorization',`${token.token_type} ${token.token}`);
  res.send(token);
})

/*
3-Autenticação
  Cliente usa token para obter acesso aos recursos protegidos do servidor
*/
app.post("/authentication", (req, res)=>{
  res.send(require("./authentication")(req))
})


app.listen(3030, ()=>{
  console.log("server running")
});