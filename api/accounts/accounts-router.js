const express = require('express')
const accountModel = require('./accounts-model.js')
const ExpressError = require('./expressError.js');
const router = require('express').Router();
const {checkAccountId, checkAccountNameUnique, checkAccountPayload} = require('./accounts-middleware.js')

router.get('/', async (req, res, next) => {
  // DO YOUR MAGIC
  try{
    res.json(await accountModel.getAll());
  }
  catch(err) {
    next(new ExpressError(err, 500));
  }  
})

router.get('/:id', checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  res.status(200).json(req.account);
})

router.post('/', checkAccountNameUnique, checkAccountPayload, async (req, res, next) => {
  // DO YOUR MAGIC
  req.body.name = req.body.name.trim();
  try {
    const account = await accountModel.create(req.body);
    res.status(201).json(account);
  } 
  catch (err) {
    next(new ExpressError(err, 500))
  }  
})

router.put('/:id', checkAccountId, checkAccountNameUnique, checkAccountPayload, async (req, res, next) => {
  // DO YOUR MAGIC
  req.body.name = req.body.name.trim();
  try {
    const account= await accountModel.updateById(req.params.id, req.body);
    res.status(201).json(account);
  }
  catch (err){
    next(new ExpressError(err, 500))
  }
});

router.delete('/:id', checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  try{
    await accountModel.deleteById(req.params.id);
    res.status(204).send("");
  } 
  catch(error) {
    next(new ExpressError(err, 500));
  }  
})

router.use((err, req, res, next) => { // eslint-disable-line
  // CALL next(err) IF THE PROMISE REJECTS INSIDE YOUR ENDPOINTS
  res.status(500).json({
    message: 'something went wrong inside the accounts router',
    errMessage: err.message,
  })
})

module.exports = router;
