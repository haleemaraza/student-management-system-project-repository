import inquirer from 'inquirer';
class Course {
    name;
    cost;
    constructor(name, cost) {
        this.name = name;
        this.cost = cost;
    }
}
class Student {
    static studentCounter = 10001;
    id;
    name;
    courses = [];
    balance = 0;
    constructor(name) {
        this.id = Student.studentCounter++;
        this.name = name;
    }
    enroll(course) {
        this.courses.push(course);
        this.balance += course.cost;
    }
    viewBalance() {
        console.log(`Balance for ${this.name}: $${this.balance}`);
    }
    payTuition(amount) {
        if (amount <= this.balance) {
            this.balance -= amount;
            console.log(`Payment of $${amount} received. Remaining balance: $${this.balance}`);
        }
        else {
            console.log(`Insufficient funds. Balance: $${this.balance}`);
        }
    }
    showStatus() {
        console.log(`Student ID: ${this.id}`);
        console.log(`Name: ${this.name}`);
        console.log(`Courses Enrolled:`);
        this.courses.forEach(course => console.log(` - ${course.name}`));
        console.log(`Balance: $${this.balance}`);
    }
}
class StudentManagementSystem {
    students = [];
    courses = [
        new Course("Computer", 4500),
        new Course("Science", 6000),
        new Course("History", 5000)
    ];
    async addStudent() {
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Enter student name:'
            }
        ]);
        const newStudent = new Student(answers.name);
        this.students.push(newStudent);
        console.log(`Student ${answers.name} added with ID ${newStudent.id}`);
    }
    async enrollStudent() {
        const studentAnswers = await inquirer.prompt([
            {
                type: 'input',
                name: 'studentId',
                message: 'Enter student ID:'
            }
        ]);
        const courseAnswers = await inquirer.prompt([
            {
                type: 'input',
                name: 'courseName',
                message: 'Enter course name:'
            }
        ]);
        const student = this.findStudent(Number(studentAnswers.studentId));
        const course = this.findCourse(courseAnswers.courseName);
        if (student && course) {
            student.enroll(course);
            console.log(`${student.name} enrolled in ${course.name}`);
        }
        else {
            console.log("Student or course not found.");
        }
    }
    async viewStudentBalance() {
        const studentAnswers = await inquirer.prompt([
            {
                type: 'input',
                name: 'studentId',
                message: 'Enter student ID:'
            }
        ]);
        const student = this.findStudent(Number(studentAnswers.studentId));
        if (student) {
            student.viewBalance();
        }
        else {
            console.log("Student not found.");
        }
    }
    async payStudentTuition() {
        const studentAnswers = await inquirer.prompt([
            {
                type: 'input',
                name: 'studentId',
                message: 'Enter student ID:'
            }
        ]);
        const amountAnswers = await inquirer.prompt([
            {
                type: 'input',
                name: 'amount',
                message: 'Enter tuition amount:'
            }
        ]);
        const student = this.findStudent(Number(studentAnswers.studentId));
        if (student) {
            const amount = parseFloat(amountAnswers.amount);
            student.payTuition(amount);
        }
        else {
            console.log("Student not found.");
        }
    }
    async showStudentStatus() {
        const studentAnswers = await inquirer.prompt([
            {
                type: 'input',
                name: 'studentId',
                message: 'Enter student ID:'
            }
        ]);
        const student = this.findStudent(Number(studentAnswers.studentId));
        if (student) {
            student.showStatus();
        }
        else {
            console.log("Student not found.");
        }
    }
    findStudent(studentId) {
        return this.students.find(student => student.id === studentId);
    }
    findCourse(courseName) {
        return this.courses.find(course => course.name === courseName);
    }
}
async function main() {
    const sms = new StudentManagementSystem();
    while (true) {
        const action = await inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'Choose an action:',
                choices: ['Add Student', 'Enroll Student', 'View Balance', 'Pay Tuition', 'Show Status', 'Exit']
            }
        ]);
        switch (action.action) {
            case 'Add Student':
                await sms.addStudent();
                break;
            case 'Enroll Student':
                await sms.enrollStudent();
                break;
            case 'View Balance':
                await sms.viewStudentBalance();
                break;
            case 'Pay Tuition':
                await sms.payStudentTuition();
                break;
            case 'Show Status':
                await sms.showStudentStatus();
                break;
            case 'Exit':
                console.log('Exiting from student management system');
                process.exit();
        }
    }
}
main();
