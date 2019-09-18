export const cloneDep = function (target) {
    return JSON.parse(JSON.stringify(target))
}
export const formateTime = function (date, status = 'full', dayMark = '-', timeMark = ':') {
    const dayArr =  [date.getFullYear(), date.getMonth() + 1, date.getDate()].map(i => `${i}`.padStart(2, '0'))
    const timeArr = [date.getHours(), date.getMinutes(), date.getSeconds()].map(i => `${i}`.padStart(2, '0'))
    if (status === 'full'){
        return `${dayArr.join(dayMark)} ${timeArr.join(timeMark)}`
    }
    if(status === 'day'){
        return `${dayArr.join(dayMark)}`
    }
    if (status === 'time') {
        return `${timeArr.join(timeMark)}`
    }
}