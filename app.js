var students = [];
document.addEventListener('DOMContentLoaded', function() {
    if(localStorage.a_students) {
        students = JSON.parse(localStorage.a_students);
        displayStudents(students, 10);
    }
    else {
        jQuery.ajax({
            type: 'GET',
            url: 'http://127.0.0.1:8080/data.json',
            success: function(data) {
                students = data;
                localStorage.a_students = JSON.stringify(students);
                displayStudents(students, 10);
            },
            error: function (err) { 
                console.log(err);
             }
        });
    }
});


function getNumber(selectedOption) {
    var num = parseInt(selectedOption.value);
    
    displayStudents(students, num);
}

function clearTable() {
    $("#table").find("tr:gt(0)").remove();
}

function displayStudents(students, num) {
    clearTable();
    var leng = students.length;
    var rowNum = leng;
    if (num == 10 && leng >= 10) {
        rowNum = 10;
    }
    if (num == 20 && leng >= 20) {
        rowNum = 20;
    }
    if (num == 50 && leng >= 50) {
        rowNum = 50;
    }
    if (num == 100 && leng >= 100) {
        rowNum = 100;
    }
    for (var i = 0; i < rowNum; i++) {
        var student = `
                        <tr id="tr_${i}">
                            <td>${students[i].firstname}</td>
                            <td>${students[i].lastname}</td>
                            <td>${students[i].email}</td>
                            <td>${students[i].location}</td>
                            <td>${students[i].phone}</td>
                            <td>${students[i].batch}</td>
                            <td>
                                ${students[i].address.communication}<br />
                                ${students[i].address.permanent}
                            </td>
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

function addWarningMsg(id) {
    var warning = id + '_warning';
    if(!document.getElementById(warning) && !document.getElementById(id).value) {
        document.getElementById(id).insertAdjacentHTML('afterend', `<span style="color:red" id="${warning}">Please enter!</span>`);
    }
    if(document.getElementById(id).value && document.getElementById(warning)) {
        document.getElementById(warning).remove();
    }
}

document.getElementById('btn').addEventListener('click', function() {
    if (document.getElementById('fname').value && document.getElementById('lname').value 
        && document.getElementById('email').value && document.getElementById('loc').value 
        && document.getElementById('phone').value && document.getElementById('batch').value
        && document.getElementById('comm_addr').value && document.getElementById('perm_addr').value) {
            var loc = document.getElementById('loc').value;
            if (loc.includes(",")) {
                loc = loc.split(",");
            }
            var address = {
                'communication': document.getElementById('comm_addr').value,
                'permanent': document.getElementById('perm_addr').value
            };
            var previous_employer = {
                'prev_emp_1': document.getElementById('prev_emp_1').value? document.getElementById('prev_emp_1').value:'N/A',
                'prev_emp_2': document.getElementById('prev_emp_2').value? document.getElementById('prev_emp_2').value:'N/A'
            };
            var student = {
            'firstname': document.getElementById('fname').value,
            'lastname': document.getElementById('lname').value,
            'email': document.getElementById('email').value,
            'location': loc,
            'phone': document.getElementById('phone').value,
            'batch': document.getElementById('batch').value,
            'address': address,
            'previous_employer': previous_employer
        };
        students.push(student);
        displayStudents(students, parseInt(jQuery('#list option:selected').text()));
        localStorage.a_students = JSON.stringify(students);
    }
    else {
        addWarningMsg('fname');
        addWarningMsg('lname');
        addWarningMsg('email');
        addWarningMsg('loc');
        addWarningMsg('phone');
        addWarningMsg('batch');
        addWarningMsg('comm_addr');
        addWarningMsg('perm_addr');
    }
});

jQuery(document).on('click', 'input[id^="btn_details_"]', function() {
    var id = jQuery(this).attr('id').slice(12);
        tr_id = jQuery(this).attr('id').replace('btn_details_', 'tr_'),
        tr_id_details = tr_id + "_details";
    if(jQuery('#' + tr_id_details).length != 0 ) {
        jQuery('#' + tr_id_details).remove();
        console.log(tr_id_details + " removed");
    }
    else {
        var student = students[id];
        jQuery('#' + tr_id).after(`
            <tr id="${tr_id}_details">
                <td colspan="8">
                    Previous Employer(s): ${student.previous_employer.prev_emp_1}, ${student.previous_employer.prev_emp_2}
                </td>
            </tr>
        `);
        console.log(tr_id_details + " added");
    }
});
jQuery(document).on('click', 'input[id^="btn_edit_"]', function() {
    var id = jQuery(this).attr('id').slice(9);
        tr_id = jQuery(this).attr('id').replace('btn_edit_', 'tr_'),
        tr_id_edit = tr_id + "_edit";
    if(jQuery('#' + tr_id_edit).length != 0 ) {
        jQuery('#' + tr_id_edit).remove();
        console.log(tr_id_edit + " removed");
    }
    else {
        var student = students[id];
        jQuery('#' + tr_id).after(`
            <tr id="${tr_id_edit}">
                <td colspan="8">
                    <input type="text" placeholder="Firstname" id="fname_${id}" />
                    <input type="text" placeholder="Lastname" id="lname_${id}" />
                    <input type="text" placeholder="Email" id="email_${id}" />
                    <input type="text" placeholder="Location" id="loc_${id}" />
                    <input type="text" placeholder="Phone" id="phone_${id}" />
                    <input type="text" placeholder="Batch" id="batch_${id}" />
                    <input type="text" placeholder="Communication Address" id="comm_addr_${id}" />
                    <input type="text" placeholder="Permanent Address" id="perm_addr_${id}" />
                    <input type="text" placeholder="Previous employer(optional)" id="prev_emp_1_${id}" />
                    <input type="text" placeholder="Previous employer(optional)" id="prev_emp_2_${id}" />
                    <div>
                        <input type="button" value="Save" id="btn_save_${id}" />
                    </div>
                </td>
            </tr>
        `);
        console.log(tr_id_edit + " added");
    }
});

jQuery(document).on('click', 'input[id^="btn_delete_"]', function() {
    var tr_id = jQuery(this).attr('id').replace('btn_delete_', 'tr_');
    students.splice(jQuery(this).attr('id').slice(11), 1);
    displayStudents(students, parseInt(jQuery('#list option:selected').text()));
    localStorage.a_students = JSON.stringify(students);
    console.log(tr_id + " removed");
});

jQuery(document).on('click', 'input[id^="btn_save_"]', function() {
    var id = jQuery(this).attr('id').slice(9);
    tr_id = jQuery(this).attr('id').replace('btn_save_', 'tr_');
    var student = students[id];
    if (jQuery("#fname_" + id)[0].value) {
        student.firstname = jQuery("#fname_" + id)[0].value;
    }
    if (jQuery("#lname_" + id)[0].value) {
        student.lastname = jQuery("#lname_" + id)[0].value;
    }
    if (jQuery("#email_" + id)[0].value) {
        student.email = jQuery("#email_" + id)[0].value;
    }
    if (jQuery("#loc_" + id)[0].value) {
        var loc = jQuery("#loc_" + id)[0].value;
        if (loc.includes(",")) {
            loc = loc.split(",");
        }
        student.location = loc;
    }
    if (jQuery("#phone_" + id)[0].value) {
        student.phone = jQuery("#phone_" + id)[0].value;
    }
    if (jQuery("#batch_" + id)[0].value) {
        student.batch = jQuery("#batch_" + id)[0].value;
    }
    if (jQuery("#comm_addr_" + id)[0].value) {
        student.address.communication = jQuery("#comm_addr_" + id)[0].value;
    }
    if (jQuery("#perm_addr_" + id)[0].value) {
        student.address.permanent = jQuery("#perm_addr_" + id)[0].value;
    }
    if (jQuery("#prev_emp_1_" + id)[0].value) {
        student.previous_employer.prev_emp_1 = jQuery("#prev_emp_1_" + id)[0].value;
    }
    if (jQuery("#prev_emp_2_" + id)[0].value) {
        student.previous_employer.prev_emp_2 = jQuery("#prev_emp_2_" + id)[0].value;
    }
    displayStudents(students, parseInt(jQuery('#list option:selected').text()));
    localStorage.a_students = JSON.stringify(students);
});

function displayResults(students) {
    clearTable();
    for (var i = 0; i < students.length; i++) {
        var student = `
                        <tr id="tr_${i}">
                            <td>${students[i].firstname}</td>
                            <td>${students[i].lastname}</td>
                            <td>${students[i].email}</td>
                            <td>${students[i].location}</td>
                            <td>${students[i].phone}</td>
                            <td>${students[i].batch}</td>
                            <td>
                                ${students[i].address.communication}<br />
                                ${students[i].address.permanent}
                            </td>
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

document.getElementById('search_btn').addEventListener('click', function () {
    var key = document.getElementById('search').value;
    var list = [];
    for (var i = 0; i < students.length; i++) {
        if (students[i].firstname.toLowerCase().includes(key.toLowerCase()) || 
            students[i].lastname.toLowerCase().includes(key.toLowerCase()) ||
            JSON.stringify(students[i].location).toLowerCase().includes(key.toLowerCase()) || 
            students[i].batch.toLowerCase().includes(key.toLowerCase()) || 
            students[i].phone.toString().includes(key)) {
            list.push(students[i]);
        }
    };
    displayResults(list);
});

function appendMoreStudents(students, id, num) {
    var leng = students.length - id - 1;
    var rowNum = leng;
    if (num == 10 && leng >= 10) {
        rowNum = 10;
    }
    if (num == 20 && leng >= 20) {
        rowNum = 20;
    }
    if (num == 50 && leng >= 50) {
        rowNum = 50;
    }
    if (num == 100 && leng >= 100) {
        rowNum = 100;
    }
    for (var i = id + 1; i < rowNum + id + 1; i++) {
        var student = `
                        <tr id="tr_${i}">
                            <td>${students[i].firstname}</td>
                            <td>${students[i].lastname}</td>
                            <td>${students[i].email}</td>
                            <td>${students[i].location}</td>
                            <td>${students[i].phone}</td>
                            <td>${students[i].batch}</td>
                            <td>
                                ${students[i].address.communication}<br />
                                ${students[i].address.permanent}
                            </td>
                            <td>
                                <input type="button" value="Show more details" id="btn_details_${i}" />
                                <input type="button" value="Edit" id="btn_edit_${i}" />
                                <input type="button" value="Delete" id="btn_delete_${i}" />
                            </td>
                        </tr>
                    `;
        document.getElementsByTagName('tr')[document.getElementsByTagName('tr').length - 1].insertAdjacentHTML('afterend', student);
    }
    console.log("Appended");
}

var scrollFn = function() {
    if($(window).scrollTop() + $(window).height() == $(document).height()) {
        var id = parseInt(jQuery("tr:last").attr('id').slice(3));
        if (id + 1 == students.length) {
            window.removeEventListener('scroll', scrollFn);
            jQuery("table").after("No more records");
        }
        else {
            var num = parseInt(jQuery('#list option:selected').text());
            appendMoreStudents(students, id, num);
        }
    }
 };

 window.addEventListener('scroll', scrollFn);