const express = require("express");
const router = new express.Router();
const post_user=require("../controollers/producer_post")



router.post("/sigins" , post_user.form)


module.exports=router