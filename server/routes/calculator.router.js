const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const stringMath = require('string-math');

/**
 * GET route template
 */
router.get('/',  (req, res) => {
    //console.log('req.user', req.user);
    console.log('in GET equations');
    const query = `SELECT * FROM "equations" ORDER BY "id" DESC;`;
    pool.query(query)
    .then(results => {
        res.send(results.rows);
    })
    .catch((err) => {
        console.log('err:', err);
        res.sendStatus(500);
    })});

/**
 * POST route template
 */
router.post('/', (req, res) => {
    console.log('in calculator post with', req.body.payload);
    const equation = req.body.payload
    console.log(equation);
    const equationResult = stringMath(req.body.payload) 
    console.log('equationResult', equationResult);
    const fullEquation = equation+'='+equationResult;
    console.log('fullEquation', fullEquation);
    const queryText = `INSERT INTO "equations"
    ("fullEquation")
    VALUES ($1)
    RETURNING "id";`
    pool
    .query(queryText, [fullEquation])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('err:', err);
      res.sendStatus(500);
    })

});

module.exports = router;
