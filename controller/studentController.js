const Student = require("../model/student");

exports.getAllStudents = async (req, res, next) => {
  try {
    const students = await Student.find();
    if (!students) throw new Error("There is no student present");

    res.status(200).json({
      status: "success",
      data: students,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getStudent = async (req, res, next) => {
  try {
    const id = req.params.id * 1;
    const student = await Student.findById(id);

    if (!student) throw new Error("Please enter the valid Id");
    res.status(200).json({
      status: "success",
      data: student,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.updateStudent = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const student = await Student.findOneAndUpdate({ id: id }, req.body, {
      new: true,
    });
    if (!student) throw new Error("Please enter the valid Id");
    res.status(200).json({
      status: "success",
      message: "updated successfully",
      data: { student },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.deleteStudent = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const student = await Student.deleteOne({ _id: id });
    if (!student) throw new Error("Please enter the valid Id");
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
