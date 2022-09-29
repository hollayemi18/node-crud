const student = require("../model/model");
const safety = require("bcrypt");
const cntrl = {
  //SAVING STUDENT RECORD USING POSTMAN
  saveStudent: async (req, res) => {
    try {
      const { id, name, email, phone, password } = req.body;
      const testing = await student.findOne({ email });
      //VALIDATING PASSWORD
      if (password.length < 6) {
        return res.send("password must be greater than six(6)");
      }
      //HASHING PASSWORD
      const hashing = await safety.hash(password, 10);
      //CREATING A NEW STUDENT MODEL
      const newStudent = new student({
        id,
        name,
        email,
        phone,
        password: hashing,
      });
      //AUTHENTICATING NAME AND IF EMAIL ALREADY EXISTED
      if (testing || !newStudent.name) {
        res.send("name is required or email already existed");
      } else {
        await newStudent.save();
        res.send("Student Saved");
      }
    } catch (err) {
      return res.send(err.message);
    }
  },

  //GETTING ALL STUDENT RECORD FROM DB USING POSTMAN
  fetchAll: async (req, res) => {
    student.find((err, val) => {
      if (err) {
        res.send("no data found");
      } else {
        if (val.length == 0) {
          res.send("no data found");
        } else {
          res.send(val);
        }
      }
    });
  },

  //GETTING INDIVIDUAL STUDENT RECORD FROM DB USING POSTMAN
  oneStudent: async (req, res) => {
    const studentId = req.params.id;
    student.findOne({ id: studentId }, (err, val) => {
      if (err) {
        res.send("EROOOOOOR");
      } else {
        if (val == null) {
          res.send("data not found");
        } else {
          res.send(val);
        }
      }
    });
  },

  //UPDATING STUDENT FROM DB USING POSTMAN
  updateStudent: async (req, res) => {
    const updateId = req.params.id;
    const upname = req.body.name;
    const upemail = req.body.email;
    const upphone = req.body.phone;
    const uppassword = req.body.password;
    student.findOneAndUpdate(
      { id: updateId },
      {
        $set: {
          name: upname,
          email: upemail,
          phone: upphone,
          password: uppassword,
        },
      },
      { new: true },
      (err, val) => {
        if (err) {
          res.send(err.message);
        } else {
          res.send("data updated");
          res.send(val);
        }
      }
    );
  },

  //DELETING RECORD FROM DB

  deleteStudent: async (req, res) => {
    const deleteId = req.params.id;
    student.findOneAndDelete({ id: deleteId }, (err, val) => {
      if (err) {
        res.send(err.message);
      } else {
        res.send("data deleted");
      }
    });
  },
};

module.exports = cntrl;
