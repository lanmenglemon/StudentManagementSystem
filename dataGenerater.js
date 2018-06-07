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

for(var i = 0; i < 5; i++) {
    var prev_emp_1 = employers[Math.floor(Math.random() * 6)];
    var prev_emp_2 = employers[Math.floor(Math.random() * 6)];

    var student = {
        "firstname": "firstName " + i,
        "lastname": "lastName " + i,
        "email": i + "@google.com",
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

console.log(str);
