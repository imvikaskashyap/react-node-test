const asyncHandler = require("express-async-handler");
const { getAllStudents, addNewStudent, getStudentDetail, setStudentStatus, updateStudent } = require("./students-service");

const handleGetAllStudents = asyncHandler(async (req, res) => {
    try {
        const students = await getAllStudents(req.query)
        res.send(200).json(students)
    } catch (error) {
        res.status(500).json("Error fetching all students")
    }

});

const handleAddStudent = asyncHandler(async (req, res) => {
    try {
        const addedStudent = await addNewStudent(req.body)
        res.status(201).json(addedStudent)
    } catch (error) {
        res.status(500).json("Error adding students")
    }

});

const handleUpdateStudent = asyncHandler(async (req, res) => {
    try {
        const result = await updateStudent({...req.body,id: req.params.id})
        res.send(200).json(result)
        
    } catch (error) {
        res.status(500).json("Error updating the students")
    }

});

const handleGetStudentDetail = asyncHandler(async (req, res) => {
    try {
        const studentDetail = await getStudentDetail(req.params.id)
        res.send(200).json(studentDetail)
    } catch (error) {
        res.status(500).json("Error fetching the student details")
    }

});

const handleStudentStatus = asyncHandler(async (req, res) => {
    try {
        const { reviewerId, status} = req.body
        const result = await setStudentStatus(
            {userId:req.params.id, reviewerId, status}
        )

        res.status(200).json(result)
        
    } catch (error) {
        res.status(500).json("Error updating the student status")
    }

});

module.exports = {
    handleGetAllStudents,
    handleGetStudentDetail,
    handleAddStudent,
    handleStudentStatus,
    handleUpdateStudent,
};
