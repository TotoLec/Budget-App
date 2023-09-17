const router = require("express").Router();
const User = require("../model/User");
const History = require("../model/History");
const jwt = require('jsonwebtoken');
const verify = require('./verifyToken');

// Add history item
router.post('/addHistory', verify, async (req, res) => {   
    req.body.user = req.user._id;
    const newHistory = new History(req.body);

    const user = await User.findOne({_id: req.user._id});
    if (!user) {
        res.status(404).send("User not found");
        return;
    }

    newHistory.save()
    .then(history => {
        res.send("Item added");
    })
    .catch(err => {
        console.error(err);
        res.status(500).send("Erreur interne du serveur");
    });
})

//remove history
router.delete('/removeHistory/:id', async (req, res) => {
    const id = req.params.id;

    //check if the id exist
    const history = await History.findById(id);
    if (!history) {
        res.status(404).send("Item not found");
        return;
    }

    History.findByIdAndRemove(id)
    .then(history => {
            res.send("Item removed");
        })
    .catch(err => {
            console.error(err);
            res.status(500).send("Erreur interne du serveur");
        });
})

router.get('/getHistory', verify, async (req, res) => {
    History.find().where('user').equals(req.user._id)
    .then(history => {
        res.send(history);
    })
    .catch(err => {
        console.error(err);
        res.status(500).send("Erreur interne du serveur");
    });
})


module.exports = router;