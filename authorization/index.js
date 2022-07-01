module.exports = (req, res)=>{
    
    try{
        const {dbCliente} = require("../db/db");
        const {dbCodigo,updatebd} = require("../db/dbCodigos");
        
        const user = dbCliente.find(user=>{

            if(user.client_id === req.body.client_id && user.uri_redirect === req.body.uri_redirect){

                if(user.id_user ===  req.body.id_user && user.password_user === req.body.password_user){

                    return user;
                }
            }
        });

        if(user){
            const codeAuthorization = Date.now()+req.body.client_id;

            dbCodigo.push({client_id:req.body.client_id,id_user: req.body.id_user,codeAuthorization:codeAuthorization});
            updatebd(dbCodigo);
            
            return res.redirect("http://localhost:3030/token?codeAuthorization="+Date.now()+req.body.client_id) ;
        }
        
        throw({message:"Invalid User", status:403, contente:""});
    }catch(erro){
        
        if(erro.status && erro.status===403){

            return res.send(erro);
        }

        return res.send({message:"Bad request", status:403, contente:"Internal error"});
    }
    
}