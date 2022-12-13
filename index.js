// Your code here
/* 1. info is an array of [string, string, string,number]
   2. returns an object with:
        {
            firstName
            familyName
            title
            payPerHour
            timeInEvents
            timeOutEvents
        }
*/
function createEmployeeRecord(info){
    return {
        firstName: info[0],
        familyName: info[1],
        title: info[2],
        payPerHour: info[3],
        timeInEvents: [],
        timeOutEvents: []
    }

}

/**
 * 
 * @param {[]} records 
 * which is an array of arrays representing an employee
 */
function createEmployeeRecords(records){
    let output = []
    records.forEach((record)=>{
        /* convert each record to an employee object */
        const data = createEmployeeRecord(record)
        /* add each employee object to the output */
        output.push(data)
    })
    return output
}

function getDateAndHours(dateString){
    const dateArray = dateString.split(' ')
    return {
        date: dateArray[0],
        hour: Number(dateArray[1])
    }
}

function createTimeInEvent(record, timeIn){

    const date = getDateAndHours(timeIn)
    const recordTime = {
        type: 'TimeIn',
        hour: date.hour,
        date: date.date
    }
    record.timeInEvents.push(recordTime)
    return record
}

function createTimeOutEvent(record, timeOut){

    const date = getDateAndHours(timeOut)
    const recordTime = {
        type: 'TimeOut',
        hour: date.hour,
        date: date.date
    }
    record.timeOutEvents.push(recordTime)
    return record
}

function hoursWorkedOnDate(record, currentDate){
    const date = getDateAndHours(currentDate)
    const dateIn = record.timeInEvents.filter(event => event.date === date.date)[0]
    const dateOut = record.timeOutEvents.filter(event => event.date === date.date)[0]

    return (dateOut.hour - dateIn.hour)/100
}

function wagesEarnedOnDate(record, currentDate){
    const hoursWorked = hoursWorkedOnDate(record, currentDate)
    return record.payPerHour * hoursWorked
}

function allWagesFor(record){
    const workingDates = record.timeOutEvents.map(record => {
        return record.date
    })
    const wagesPerDate = []
    workingDates.forEach(date => {
        const wage = wagesEarnedOnDate(record, date)
        wagesPerDate.push(wage)
    })
    const total = wagesPerDate.reduce((a, b) =>{
        return a + b 
    })
    return total
}

function findEmployeeByFirstName(srcArray, firstName){
    return srcArray.find(record => {
        return record.firstName === firstName
    })
}

function calculatePayroll(records){
    const allWagesArray = []
    records.forEach(record => {
        const wages = allWagesFor(record)
        allWagesArray.push(wages)
    })
    const total = allWagesArray.reduce((a, b)=> a+b)
    return total
}