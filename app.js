var students = [];

var locations = ["AL", "AK", "AS", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FM", "FL",
                    "GA", "GU", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MH",
                    "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM",
                    "NY", "NC", "ND", "MP", "OH", "OK", "OR", "PW", "PA", "PR", "RI", "SC", "SD",
                    "TN", "TX", "UT", "VT", "VI", "VA", "WA", "WV", "WI", "WY"],
    batches = ["Java", "UI", "Big Data", "Devops", "Mobile", "C#"],
    employers = ["Facebook", "LinkedIn", "Amazon", "Google", "Apple", "Microsoft"],
    positions = ["Computer Programmer", "Front end developer", "Full stack engineer", "Software Engineer"];
    addresses = ["Google, NY", "Google, CA", "Amazon, WA", "Microsoft, WA", "Facebook, NY", "LinkedIn, NY"]

for(var i = 0; i < 20; i++) {
    var prev_emp_1 = employers[Math.floor(Math.random() * 6)];
    var prev_emp_2 = employers[Math.floor(Math.random() * 6)];

    var student = {
        "firstname": "firstName " + (i + 1),
        "lastname": "lastName " + (i + 1),
        "email": (i + 1) + "@google.com",
        "location": [locations[Math.floor(Math.random() * 58)], locations[Math.floor(Math.random() * 58)]],
        "phone": Math.floor(Math.random() * 9000000000) + 1000000000,
        "batch": batches[Math.floor(Math.random() * 6)],
        "address": {
            "communication": addresses[Math.floor(Math.random() * 6)],
            "permanent": addresses[Math.floor(Math.random() * 6)]
        },
        "previous_employer": {
            prev_emp_1: positions[Math.floor(Math.random() * 4)],
            prev_emp_2: positions[Math.floor(Math.random() * 4)]
        }
    };
    students.push(student);
}
var str = JSON.stringify(students);

displayStudents(students, 10);

function getNumber(selectedOption) {
    var num = parseInt(selectedOption.value);
    displayStudents(students, num);
}
// var list = document.getElementById("list");
// var optionSelected = list.options[list.selectedIndex].value;
// console.log(optionSelected);

function displayStudents(students, num) {
    var leng = students.length;
    if (num == 10 && leng >= 10) {
        leng = 10;
    }
    if (num == 20 && leng >= 20) {
        leng = 20;
    }
    if (num == 50 && leng >= 50) {
        leng = 50;
    }
    if (num == 100 && leng >= 100) {
        leng = 100;
    }
    for (var i = 0; i < leng; i++) {
        var student = `
                        <tr>
                            <td>${students[i].firstname}</td>
                            <td>${students[i].lastname}</td>
                            <td>${students[i].email}</td>
                            <td>${students[i].location}</td>
                            <td>${students[i].phone}</td>
                            <td>${students[i].batch}</td>
                            <td>${students[i].address.communication}</td>
                            <td>
                                <input type="button" value="Show more details" id="btn_details_${i}" />
                                <input type="button" value="Edit" id="btn_edit_${i}" />
                                <input type="button" value="Delete" id="btn_delete_${i}" />
                            </td>
                        </tr>
                    `;
        document.getElementsByTagName('tr')[document.getElementsByTagName('tr').length - 1].insertAdjacentHTML('afterend', student);
    }
}
document.getElementById('btn').addEventListener('click', function() {
    if (document.getElementById('fname').value && document.getElementById('lname').value 
        && document.getElementById('email').value && document.getElementById('loc').value 
        && document.getElementById('phone').value && document.getElementById('batch').value
        && document.getElementById('addr').value) {
        var student = {
            'firstname': document.getElementById('fname').value,
            'lastname': document.getElementById('lname').value,
            'email': document.getElementById('email').value,
            'location': document.getElementById('loc').value,
            'phone': document.getElementById('phone').value,
            'batch': document.getElementById('batch').value,
            'address': document.getElementById('addr').value,
            'previous_employer': document.getElementById('prev_emp').value
        };
        students.push(student);
        localStorage.a_students = JSON.stringify(students);
    }
    else {
        if(!document.getElementById('fname_warning')) {
            document.getElementById('fname').insertAdjacentHTML('afterend', '<span style="color:red" id="fname_warning">Please enter your firstname!</span>');
        }
        if(!document.getElementById('lname_warning')) {
            document.getElementById('lname').insertAdjacentHTML('afterend', '<span style="color:red" id="lname_warning">Please enter your lastname!</span>');
        }
        if(!document.getElementById('email_warning')) {
            document.getElementById('email').insertAdjacentHTML('afterend', '<span style="color:red" id="email_warning">Please enter your email!</span>');
        }
        if(!document.getElementById('loc_warning')) {
            document.getElementById('loc').insertAdjacentHTML('afterend', '<span style="color:red" id="loc_warning">Please enter your location!</span>');
        }
        if(!document.getElementById('phone_warning')) {
            document.getElementById('phone').insertAdjacentHTML('afterend', '<span style="color:red" id="phone_warning">Please enter your phone!</span>');
        }
        if(!document.getElementById('batch_warning')) {
            document.getElementById('batch').insertAdjacentHTML('afterend', '<span style="color:red" id="batch_warning">Please enter your batch!</span>');
        }
        if(!document.getElementById('addr_warning')) {
            document.getElementById('addr').insertAdjacentHTML('afterend', '<span style="color:red" id="batch_warning">Please enter your address!</span>');
        }
    }
});
