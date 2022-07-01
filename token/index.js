const jwt = require("jsonwebtoken");

module.exports=(req)=>{
    try{

        const {dbCodigo} =require("../db/dbCodigos");
        const {dbCliente} = require("../db/db");
        const {dbToken, updatebd} = require("../db/dbToken");

        const validadeCode = dbCodigo.find(code=>{
            //optional cliente_secret
            if(code.codeAuthorization === req.query.codeAuthorization){

                return code;
            }
        })
        
        if(validadeCode){
            // Cada código de autorização só pode ser usado uma vez.
            //excluir codido do banco
            const user = dbCliente.find(user_=>{
               
                if(user_.client_id == validadeCode.client_id && user_.id_user === validadeCode.id_user){
 
                    return user_;
                }

            })
                
           
            if(user){

                const token = jwt.sign({exp:Math.floor(
                    Date.now() / 1000) + (60 * 60),
                    data:user
                },'secret');

                const tokenReturn = {
                    token:token,
                    token_type:"Bearer",
                    expires_in:3600000
                };

                dbToken.push(tokenReturn);
                updatebd(dbToken);

                return tokenReturn;
            }
        

        }
        throw({message:"Invalid code of authorization", status:403, content:""});
    }catch(erro){
        console.log(erro)
        if(erro.sttaus && erro.status === 403){
            
            return erro;
        }
        
        return {message:"Bad request", status:500, content:"Internal erro"};
    }
}