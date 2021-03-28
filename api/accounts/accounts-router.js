const express = require('express')
const accountModel = require('./accounts-model.js')

const router = require('express').Router()

router.get('/', async (req, res, next) => {
  // DO YOUR MAGIC
  accountModel.get()
  .then(account =>{
    res.status(200).json(account);
  })
  .catch(error => {
    res.status(500).json({ message: 'Error retrieving the Accounts.'});
  });  
})

router.get('/:id', (req, res, next) => {
  // DO YOUR MAGIC
  accountModel.getById(res.params.id)
  .then(account => {
    res.status(200).json(project)
  })
  .catch(error => {
    res.status(500).json({ message: 'Error retrieving the Account Id.'})
  })
})

router.post('/', (req, res, next) => {
  // DO YOUR MAGIC
  
})

router.put('/:id', (req, res, next) => {
  // DO YOUR MAGIC
});

router.delete('/:id', (req, res, next) => {
  // DO YOUR MAGIC
})

router.use((err, req, res, next) => { // eslint-disable-line
  // CALL next(err) IF THE PROMISE REJECTS INSIDE YOUR ENDPOINTS
  res.status(500).json({
    message: 'something went wrong inside the accounts router',
    errMessage: err.message,
  })
})

module.exports = router;
