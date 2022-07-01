const dbCliente= [{
    client_id:"353545643654645",
    uri_redirect:"http://localhost:4000/",
    id_user:"346555634545",
    password_user:"123456"
}];

const updatebd = (newDb)=>{
    dbCliente = newDb;

    return;
}
module.exports={dbCliente, updatebd};