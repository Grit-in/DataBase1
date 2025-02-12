
const express = require("express")
const mongoose = require("mongoose")
const schema = require("./schema")
var router = express.Router()
router.get("/", async function (req, res) {
	const sc = await schema.find()
	res.json(sc)
})

router.get("/:id", async function (req, res) {

	const sc = await schema.find(req.params.id)
	res.json(sc)
})
router.post('/:id/komentar', async (req, res) => {
	try {
		var telefon = await schema.findById(req.params.id)

		console.log(telefon.komentari)
		telefon.komentari.push({
			name: req.body.name,
			tekst: req.body.tekst,
			ocena: req.body.ocena
		})

		telefon.ocene.push(parseInt(req.body.ocena))
		telefon.save()
		res.sendStatus(200)


	} catch (e) {
		console.log(e);

	}

})

router.post('/:id/likerem', async (req, res) => {
	try {
		let found = await schema.findOne({ "komentari._id": req.params.id });
		found.komentari.find(komentar => komentar._id == req.params.id).likes--;
		found.save();
	} catch (error) {
		res.sendStatus(404);
	}
})


router.post('/:id/dislikerem', async (req, res) => {
	try {
		let found = await schema.findOne({ "komentari._id": req.params.id });
		found.komentari.find(komentar => komentar._id == req.params.id).dislikes--;
		found.save();
	} catch (error) {
		res.sendStatus(404);
	}
})


router.post('/:id/likeadd', async (req, res) => {
	try {
		let found = await schema.findOne({ "komentari._id": req.params.id });
		found.komentari.find(komentar => komentar._id == req.params.id).likes++;
		found.save();
	} catch (error) {
		res.sendStatus(404);
	}
})


router.post('/:id/dislikeadd', async (req, res) => {
	try {
		let found = await schema.findOne({ "komentari._id": req.params.id });
		found.komentari.find(komentar => komentar._id == req.params.id).dislikes++;
		found.save();
	} catch (error) {
		res.sendStatus(404);
	}
})
router.patch('/:id', async function (req, res) {
	const sc = await schema.find(req.params.id)
	sc.model = req.body.model
	const updatedsc = await sc.save()
	res.json(updatedsc)

})
router.post('/:id/reply', async (req, res) => {
	
    try {
        let found = await schema.findOne({"komentari._id": req.params.id});
        found.komentari.find(komentar => komentar._id == req.params.id).replies.push({name:req.body.tekst, tekst:req.body.tekst, _id: new mongoose.Types.ObjectId()});
        found.save();
    } catch (error) {
        res.sendStatus(404);
    }
})


module.exports = router