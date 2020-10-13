const teachers = [{
    id: 1,
    name: 'Phil Smith'
},{
    id: 2,
    name: 'Lisa Simms'
},{
    id: 3,
    name: 'Rob Blacksmith'
}];


const classes = [{
    id: 1,
    teacherId: 1,
    name: 'Physics'
},{
    id: 2,
    teacherId: 2,
    name: 'Chemistry'
},{
    id: 3,
    teacherId: 3,
    name: 'Algebra I'
},{
    id: 4,
    teacherId: 3,
    name: 'Algebra II'
},{
    id: 5,
    teacherId: 1,
    name: 'Astronomy'
},{
    id: 6,
    teacherId: 2,
    name: 'Political Science'
}];


module.exports = {
    classes,
    teachers
}
