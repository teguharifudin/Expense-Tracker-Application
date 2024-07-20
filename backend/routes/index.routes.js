const router = require("express").Router();
const User = require("../models/User.model");
const Category = require("../models/Category.model");

router.get('/', async (req, res) => {
  const emailCheck = 'teguh.arifudin@gmail.com';
  const existingEmail = await User.findOne({ email: emailCheck });
  if(!existingEmail){
      const admin = await User.findOneAndUpdate( 
          { email: emailCheck }, 
          { $setOnInsert: 
              { name: 'Teguh', password: '$2b$10$t5zUwPleWKtAlrk96z/tAerkBjw7JB./QP622Jsqj1HsDrECK/wT.', role: 'admin' }
          },
          { upsert: true, new: true, rawResult: true }
      );

      const existingEmailYes = await User.findOne({ email: emailCheck });
      await Category.findOneAndUpdate( 
          { name: 'Groceries' }, 
          { $setOnInsert: 
              { user: existingEmailYes._id, type: 'expense' }
          },
          { upsert: true, new: true, rawResult: true }
      );
      await Category.findOneAndUpdate( 
          { name: 'Utilities' }, 
          { $setOnInsert: 
              { user: existingEmailYes._id, type: 'expense' }
          },
          { upsert: true, new: true, rawResult: true }
      );
      await Category.findOneAndUpdate( 
          { name: 'Rent' }, 
          { $setOnInsert: 
              { user: existingEmailYes._id, type: 'expense' }
          },
          { upsert: true, new: true, rawResult: true }
      );
  }
  // else{
  //     console.log('exits');
  // }
  res.json("Happy hacking!");
});

module.exports = router;