const jwt = require("jsonwebtoken");

module.exports=(req)=>{
    try{

        const token = req.headers.authorization.split(' ')[1];
        const decode = jwt.verify(token, 'secret');
        console.log(decode)
        if(Date.now()/1000>decode.exp){
            throw({message:"expired token", status:403,  content:""})
        }
    
        return {token:token, client:decode.data.client_id, user:decode.data.id_user};
    }catch(erro){
        console.log(erro)
        if(erro && erro.status===403){
            
            return erro;
        }

        return {message:"Bad request", status:500, content:"Internal error"};
    }
}