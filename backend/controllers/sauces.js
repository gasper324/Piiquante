const Sauce = require('../models/sauces');

exports.createSauce = (req, res, next) => {
    console.log(req.body); /* where is sauce const created */
    req.body.sauce = JSON.parse(req.body.sauce);
    console.log(req.body);
    console.log(req.body.name);
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
    console.log(sauce);
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