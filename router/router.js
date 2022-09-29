const express = require("express");
const router = express.Router();
const cntrl = require("../controller/controller");

//routes
router.post("/saveStudent", cntrl.saveStudent);
router.get("/fetchStudent", cntrl.fetchAll);
router.get("/fetchStudent/:id", cntrl.oneStudent);
router.put("/updateStudent/:id", cntrl.updateStudent);
router.delete("/deleteStudent/:id", cntrl.deleteStudent);

module.exports = router;
