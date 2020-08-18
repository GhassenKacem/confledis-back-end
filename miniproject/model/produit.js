const mongoose = require("mongoose");

var ProduitSchema = new mongoose.Schema({
    nom : {
        type: String,
        required: true
    },
    prix: {
        type: String,
        required: true
    },
    quantite: {
        type: String,
        required: true
    }
});
var Produits = mongoose.model("Produits", ProduitSchema);
module.exports = Produits;