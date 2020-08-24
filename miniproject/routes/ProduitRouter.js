const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const Produits = require('../model/produit');


const produitRouter = express.Router();

produitRouter.use(bodyParser.json());


produitRouter.route('/')
.get((req, res, next) => {
    const nom = req.query.nom;
    console.log(nom);
    const r = new RegExp('^' +nom , "i");
    const condition = nom ? {nom : r }: null ;
    console.log(condition);
    Produits.find(condition)
    .then((produits)=> {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(produits);
    },
        (err) => next(err))
        .catch((err) => next(err));
    })
.post((req, res, next) => {
    Produits.create(req.body)
    .then((produit)=> {
        console.log('Produit crée',produit)
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(produit);
    },
        (err) => next(err))
        .catch((err) => next(err));
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation n est pas supporter sur /produits');
    })
    .delete((req, res, next) => {
        res.statusCode = 403;
        res.end('DELET operation n est pas supporter sur /produits');

    });

    produitRouter.route('/:prodId')
    .get((req,res,next) => {
        Produits.findById(req.params.prodId)
        .then((produit) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(produit);
        }, (err) => next(err))
        .catch((err) => next(err));
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST opération nest pas supporter sur /dishes/'+ req.params.prodId);
    })
    .put((req, res, next) => {
        Produits.findByIdAndUpdate(req.params.prodId, {
            $set: req.body
        }, { new: true })
        .then((produit) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(produit);
        }, (err) => next(err))
        .catch((err) => next(err));
    })
    .delete((req, res, next) => {
        Produits.findByIdAndRemove(req.params.prodId)
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        }, (err) => next(err))
        .catch((err) => next(err));
    });


    module.exports = produitRouter;
