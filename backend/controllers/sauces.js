const sauces = require('../models/sauces');
const Sauce = require('../models/sauces');
const fs = require('fs');

exports.createSauce = (req, res, next) => {
    req.body.sauce = JSON.parse(req.body.sauce);
    const url = req.protocol + '://' + req.get('host');  /* can we go though this line */
    const sauce = new Sauce({
      userId: req.body.sauce.userId,
      name: req.body.sauce.name,
      manufacturer: req.body.sauce.manufacturer,
      description: req.body.sauce.description,
      mainPepper: req.body.sauce.mainPepper,
      imageUrl: url + '/images/' + req.file.filename,
      heat: req.body.sauce.heat,
      likes: 0,
      dislikes: 0,
      usersLiked: [],
      usersDisliked: [] 
    });
    sauce.save().then(
        () => {
          res.status(201).json({
            message: 'Post saved successfully!'
          });
        }
      ).catch(
        (error) => {    
          res.status(400).json({
            error: error
          });
        }
      );
    };

exports.getAllSauces = (req, res, next) => {
    Sauce.find().then(
            (sauces) => {
                res.status(200).json(sauces);
            }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            })
        }
    )
}

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({
        _id: req.params.id
    }).then(
        (thing) => {
            res.status(200).json(thing)
        }
    ).catch(
        (error) => {
            res.status(404).json({
            error: error    
            });
        }
    );
};

exports.modifySauce = (req, res, next) => {
    let sauce = new Sauce({_id: req.params._id});
    if (req.file) {
        const url = req.protocol + '://' + req.get('host');
        req.body.sauce = JSON.parse(req.body.sauce);
        sauce = {
            _id: req.params.id,
            userId: req.body.sauce.userId,
            name: req.body.sauce.name,
            manufacturer: req.body.sauce.manufacturer,
            description: req.body.sauce.description,
            mainPepper: req.body.sauce.mainPepper,
            imageUrl: url + '/images/' + req.file.filename,
            heat: req.body.sauce.heat,
        };
        console.log(sauce);
    } else {
        sauce = {
            _id: req.params.id,
            userId: req.body.userId,
            name: req.body.name,
            manufacturer: req.body.manufacturer,
            description: req.body.description,
            mainPepper: req.body.mainPepper,
            imageUrl: req.body.imageUrl,
            heat: req.body.heat,
        };
    };
    Sauce.updateOne({_id: req.params.id}, sauce).then(
        () => {
            res.status(201).json({
                message: 'Sauce was successfully modified'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id}).then(
        (sauce) => {
            const filename = sauce.imageUrl.split('/images')[1];
            fs.unlink('images/' + filename, () => {
                Sauce.deleteOne({_id: req.params.id}).then(
                    () => {
                        res.status(200).json({
                            message:'Sauce successfully deleted'
                        });
                }
                ).catch(
                    () => {
                        res.status(400).json({
                            error:error
                        });
                    }
                );
            });
        }
    );
};

exports.updateLikeStatus = (req, res, next) => {
    let sauce = Sauce.findOne({_id: req.params.id}).then(
        (sauce) => {
    console.log(sauce)
    if (req.body.like === 1) {
        sauce.usersLiked.push(req.body.userId)
        };
    if (req.body.like === -1) {
        sauce.usersDisliked.push(req.body.userId)
    };
    if (req.body.like === 0) {
        if (sauce.usersLiked.includes(req.body.userId)) {
            sauce.usersLiked.splice(sauce.usersLiked.indexOf(req.body.userId))
        } else {
            sauce.usersDisliked.splice(sauce.usersDisliked.indexOf(req.body.userId))
        };
    };
    sauce = {
        _id: req.params.id,
        likes: sauce.usersLiked.length,
        dislikes: sauce.usersDisliked.length,
        usersLiked: sauce.usersLiked,
        usersDisliked: sauce.usersDisliked
    };
    console.log(sauce);

    Sauce.updateOne({_id: req.params.id}, sauce).then(
        () => {
            res.status(201).json({
                message: 'Sauce was successfully liked'
            });
        }
    ).catch(
            (error) => { 
                res.status(400).json({
                  error: error
                });
              }
        );
            }
    )
}