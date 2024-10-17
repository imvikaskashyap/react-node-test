
**Problem1** \
Fix "Add New Notice" Page \
<mark>/app/notices/add</mark> \
When click the 'Save' button, 'description' doesn't be saved. \
<b>Fix it.</b>

**Problem2** \
Complete CRUD operation in Student management page. \
<mark>/src/modules/students/students-controller.js</mark>


<!-- ================================================================================= -->

Solutions 1 -  I make changes here 
<!-- Before --> this was in the notice-form page
- <TextField
        {...register('content')}
        error={Boolean(errors.description)}
        helperText={errors.description?.message}
        type='text'
        label='Description'
        size='small'
        multiline
        minRows={3}
        maxRows={10}
        fullWidth
        sx={{ marginTop: '30px' }}
      />

      <!-- After the bug fixing --> we are using content that was not available in the NoticeFormProps => notice-type.ts 
- <TextField
        {...register('description')}
        error={Boolean(errors.description)}
        helperText={errors.description?.message}
        type='text'
        label='Description'
        size='small'
        multiline
        minRows={3}
        maxRows={10}
        fullWidth
        sx={{ marginTop: '30px' }}
      />

<!-- ================================================================================= -->
      <!-- Solution 2   -->
      <!-- I have write all necessary code in the student-controller. I took the reference from student-service.js, student-repository.js, and student-router.js components  -->
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
