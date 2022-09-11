const sauces = require('../models/sauces');
const Sauce = require('../models/sauces');

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
