import { body,check } from "express-validator";

let validatePostComment = 
  [ 
    body('nguoi_dung_id',"Please provide user id").notEmpty(),
    body('noi_dung',"Empty comment").notEmpty(),
  ]; 

let validatePostImages = 
  [
    body('nguoi_dung_id',"Please provide user id").notEmpty(),
    body('ten_hinh','Please provide image name').notEmpty(),
    body('mo_ta','Please provide description').notEmpty(),
    check('file')
    .custom((_, { req }) => {
      if (!req.file) {
        throw new Error('Please provide image');
      }
      return true;
    }),
  ];

let validatePutUser = 
[
  body('nguoi_dung_id',"Please provide user id").notEmpty(),
  body('email','Please provide email').notEmpty(),
  body('email','Wrong email format').isEmail(),
  body('mat_khau','Please provide pass word').notEmpty(),
  body('ho_ten','Please provide full name').notEmpty(),
  body('tuoi','Please provide age').notEmpty(),
  body('tuoi','Age must be a number').isNumeric(),
  check('file')
  .custom((_, { req }) => {
    if (!req.file) {
      throw new Error('Please provide image');
    }
    return true;
  }),
];

export{validatePostComment,validatePostImages,validatePutUser}