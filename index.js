// Your code here
function createEmployeeRecord(array) {
    let newEmployee = {}
    
    let fields = ["firstName", "familyName", "title", "payPerHour"]
    fields.forEach((field, i) => {newEmployee[field] = array[i]})
    
    let timeFields = ["timeInEvents", "timeOutEvents"]
    timeFields.forEach((field) => {newEmployee[field] = []})
    
    return newEmployee
}

function createEmployeeRecords(aOfA) {
    let empArray = []
    aOfA.forEach(emp => empArray.push(createEmployeeRecord(emp)))
    return empArray
}

function createTimeInEvent(emp, date) {
    let datehour = date.split(" ")
    let timeObj = {type: "TimeIn", hour: parseInt(datehour[1]), date: datehour[0]}
    emp.timeInEvents.push(timeObj)
    return emp
}

function createTimeOutEvent(emp, date) {
    let datehour = date.split(" ")
    let timeObj = {type: "TimeOut", hour: parseInt(datehour[1]), date: datehour[0]}
    emp.timeOutEvents.push(timeObj)
    return emp
}

function hoursWorkedOnDate(emp, date) {
    let timeIn = emp.timeInEvents.find(event => {return event["date"] === date})
    let timeOut = emp.timeOutEvents.find(event => {return event["date"] === date})
    return (timeOut.hour - timeIn.hour)/100
}

function wagesEarnedOnDate(emp, date) {return hoursWorkedOnDate(emp, date) * emp.payPerHour}

function allWagesFor(emp) {
    let allWages = []
    emp.timeInEvents.forEach(event => allWages.push(wagesEarnedOnDate(emp, event.date)))
    let total = allWages.reduce((a, wage) => a + wage, 0)
    return total
}

function findEmployeeByFirstName(srcArray, empFirstName) {
    let emp = srcArray.find(emp => emp['firstName'] === empFirstName)
    return emp
}

function calculatePayroll(empArray) {
    let allWages = empArray.map(emp => allWagesFor(emp))
    let total = allWages.reduce((a, wage) => a + wage, 0)
    return total
}