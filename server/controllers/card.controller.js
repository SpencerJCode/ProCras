const Card = require('../models/card.model');

module.exports.findAllCards = (req, res) => {
    Card.find()
        .then((allCards) => {
            res.json(allCards)
        })
        .catch((err) => {
            res.json(err)
        });
}
 
module.exports.findOneSingleCard = (req, res) => {
    Card.findOne({ _id: req.params.id })
        .then(oneSingleCard => {
            res.json(oneSingleCard)
        })
        .catch((err) => {
            res.json(err)
        });}
 
module.exports.createNewCard = (req, res) => {
    Card.create(req.body)
        .then(newlyCreatedCard => {
            res.json(newlyCreatedCard)
        })
        .catch((err) => {
            res.json(err)
        });}
 
module.exports.updateExistingCard = (req, res) => {
    Card.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    )
        .then(updatedCard => {
            console.log(updatedCard)            
            res.json(updatedCard)
            
        })
        .catch((err) => {
            res.json(err)
        });}
 
module.exports.deleteAnExistingCard = (req, res) => {
    Card.deleteOne({ _id: req.params.id })
        .then(result => {
            res.json(result)
        })
        .catch((err) => {
            res.json(err)
        });}
