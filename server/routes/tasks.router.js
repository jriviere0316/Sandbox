const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated,} = require("../modules/authentication-middleware");
const { Router } = require("express");
require("dotenv").config();


router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('req.user', req.user);
    console.log('in GET tasks');
    const query = `SELECT * FROM "tasks" ORDER BY "id" DESC;`;
    pool.query(query)
    .then(results => {
        res.send(results.rows);
    })
    .catch((err) => {
        console.log('err:', err);
        res.sendStatus(500);
    })
});


router.post('/', rejectUnauthenticated, (req, res, next) => {
    console.log('in add task');
    const taskName = 'DEFAULT'
    const isComplete = false
    const queryText = `INSERT INTO "tasks"
    ("taskName",
    "isComplete")
    VALUES ($1,$2)
    RETURNING "id";`
    pool
    .query(queryText, [taskName, isComplete ])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('err:', err);
      res.sendStatus(500);
    })
});

router.put('/:id', (req, res) => {
    console.log('in edit task router with:', req.body);
    const query = `
    UPDATE "tasks"
    SET 
    "isComplete" =$1
    WHERE "id" = $2
    ;`;
    pool.query(query, [req.body.isCompleteUpdate, req.body.taskId])
    .then(() => 
    res.sendStatus(200))
    .catch(error => {
      console.log('ERROR:', error);
    })
});

router.delete('/:id', (req, res) => {
    console.log( 'in delete router:', req.params.id)
    const query = `DELETE FROM "tasks" WHERE "id"=$1;`
    pool.query(query, [req.params.id])
    .then(() => 
        res.sendStatus(200))
    .catch(error => {
        console.log('ERROR:', error);
    })
});

module.exports = router;
