const express = require("express")
const router = express.Router()

var USERS = []

router.get("/", (req, res) => {
    res.status(200).send(USERS);
})

router.post("/", (req, res) => {
    let body = req.body
    USERS.push(body.user)
    res.status(201).send({status:201})
})

router.get('/socket',(req, res) => {
    res.render('socket')
})

module.exports = router;