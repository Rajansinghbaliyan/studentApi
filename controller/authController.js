const jwt = require("jsonwebtoken");
const Student = require("../model/student");

exports.signup = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
      address,
      latitude,
      longitude,
      status,
    } = req.body;

    const location = {
      type: "Point",
      coordinates: [latitude, longitude],
    };

    const newStudent = await Student.create({
      name,
      email,
      password,
      address,
      location,
    });

    console.log(newStudent);

    const token = jwt.sign({ _id: newStudent._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(200).json({
      status_code: "200",
      message: "student is created successfully",
      data: {
        newStudent,
        token,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      throw new Error("Please enter the email and password");

    const student = await Student.findOne({ email }).select("+password");
    if (!student) throw new Error("Your Email or Password is wrong");

    const isPasswordCorrect = await student.checkPassword(password, student.password);
    if (!isPasswordCorrect) throw new Error("Your Email or Password is wrong");

    const token = jwt.sign({ _id: student._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(200).json({
      status: "success",
      token,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.protect = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization || !authorization.startsWith("Bearer"))
      throw new Error("Please add authorization to the request");

    const token = authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log(payload);

    const currentStudent = await Student.findById(payload._id);

    if (!currentStudent) throw new Error("Student doesn't exists");

    req.student = currentStudent;
    next();
  } catch (err) {
    res.status(401).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    try {
      if (!roles.includes(req.student.role))
        throw new Error("You are not authorized");

      console.log("authorized");
      next();
    } catch (err) {
      res.status(401).json({
        status: "fail",
        message: err.message,
      });
    }
  };
};
