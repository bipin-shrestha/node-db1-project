const accounts = require('./accounts-model.js');


exports.checkAccountPayload = (req, res, next) => {
  console.log("Check Payload MiddleWare");
  // DO YOUR MAGIC
  try{
    if(req.body){
      if(req.body.name !== undefined || req.body.budget  !== undefined ){
        if(typeof req.body.name == 'string'){
          if(req.body.name.trim().length < 3 || req.body.name.trim().length > 100 ){
            next ({ message: "Name of account must be between 3 and 100", status: 500 })
          } else {
            if(typeof req.body.budget !== 'number'){
              next({ message: "budget of account must be a number", status: 500 })
            } else {
              if(req.body.budget < 0 || req.body.budget > 1000000 ){
                next({ message: "budget of account is too large or too small", status : 500 })
              } else {
                next();
              }
            }
          }
        } else {
          next({ message: "Name of the Account must be String", status: 500 })
        }
      } else {
        next({ message: "Name and Budget are Required", status: 500 })
      }
  
    } else {
      next({ message: "Request Body is Invalid", status: 400 })
    }
  }
  catch(err){
    res.status(500);
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  // DO YOUR MAGIC 
  try {
    const accountsArray = await accounts.getAll();
    const nameToCheck = req.body.name.trim();
    if( accountsArray.filter(item => item.name === nameToCheck).length == 0 ){
      next();
    }else {
      next({ message : "that name is already taken", status: 400});
    }
  }
  catch(err){
    res.status(500);
  }
}

exports.checkAccountId = async (req, res, next) => {
  // DO YOUR MAGIC
  const {id} = req.params;
  try {
    const account = await accounts.getById(id);
    if(account.length > 0){
      req.account = account;
      next();
    } else {
      next({ message: "account not found", status: 404 })
    }
  }
  catch(error){
    res.status(500)
  }
}
