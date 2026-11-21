let form=document.getElementById("myform");
let student_id=1;
let editRow=null;
let students = JSON.parse(localStorage.getItem("students")) || [];
let courseList = ["Full stack", "Data Analysis", "AIML","Computer Networking","Data Science"];
function saveStudents() {
    localStorage.setItem("students", JSON.stringify(students));
}

function updateDashboard() {
    document.getElementById("std_count").innerHTML =
        students.length;
document.getElementById("New_student_count").innerHTML = students.length;
    document.getElementById("course_count").innerHTML =
        courseList.length;

    document.getElementById("Active_student_count").innerHTML =
        students.length;

    document.getElementById("Aiml_count").innerHTML =
        students.filter(s =>
            s.course &&
            s.course.toLowerCase() === "aiml"
        ).length;
        document.getElementById("full_stack").innerHTML=students.filter(s=>
            s.course && s.course.toLowerCase()==="full stack").length;
            document.getElementById("da_count").innerHTML=students.filter(s=>
            s.course && s.course.toLowerCase()==="data analysis").length;
             document.getElementById("data_science_count").innerHTML=students.filter(s=>
            s.course && s.course.toLowerCase()==="data science").length;
            document.getElementById("cn_count").innerHTML=students.filter(s=>
            s.course && s.course.toLowerCase()==="computer networking").length;
}

function loadStudents() {
    let tbody = document.getElementById("table_body");
    tbody.innerHTML = "";

    students.forEach(function(student) {
        let r = document.createElement("tr");

        r.insertCell().innerHTML = student.id;
        r.insertCell().innerHTML = student.name;
        r.insertCell().innerHTML = student.email;
        r.insertCell().innerHTML = student.age;
        r.insertCell().innerHTML = student.gender;
        r.insertCell().innerHTML = student.course;

        let action = r.insertCell();

        let deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "Delete";
        deleteBtn.type = "button";
        deleteBtn.className = "btn btn-danger btn-sm m-1";

        
deleteBtn.addEventListener("click", function() {
    students = students.filter(function(s) {
        return s.id !== student.id;
    });

    saveStudents();

    // Form data clear
    form.reset();
    editRow = null;

    document.getElementById("addbtn").innerHTML = "+Add Student";
    document.getElementById("Error").innerHTML = "";

    loadStudents();
});

        action.appendChild(deleteBtn);

        let editBtn = document.createElement("button");
        editBtn.innerHTML = "Edit";
        editBtn.type = "button";
        editBtn.className = "btn btn-secondary btn-sm m-1";

        editBtn.addEventListener("click", function() {
            document.getElementById("name").value = student.name;
            document.getElementById("email").value = student.email;
            document.getElementById("age").value = student.age;
            document.getElementById("gender").value = student.gender;
            document.getElementById("courses").value = student.course;

            editRow = r;
            document.getElementById("addbtn").innerHTML = "Update";
        });

        action.appendChild(editBtn);
        tbody.appendChild(r);
    });
    updateDashboard();
}

loadStudents();

student_id = students.length > 0
    ? Math.max(...students.map(function(s) {
        return s.id;
    })) + 1
    : 1;
form.addEventListener("submit",function (e) {
    e.preventDefault();
    let Error=document.getElementById("Error");
     Error.innerHTML = "";
  let name=document.getElementById("name").value;
   let email=document.getElementById("email").value;
     let age=document.getElementById("age").value;
   let gender=document.getElementById("gender").value;
   let course=document.getElementById("courses").value;
  
   //let table=document.getElementById("std_table");
let tbody=document.getElementById("table_body");
   if(name===""||email===""||age===""||gender===""||course===""){
    Error.innerHTML="Please Select All the details";
   return;
   }
   if (!email.includes("@") || !email.includes(".")) {
    Error.innerHTML = "Please enter a valid email";
    return;
}
   if(Number(age) < 1 || Number(age) > 100 || !Number.isInteger(Number(age))){
    Error.innerHTML = "Age must be a whole number between 1 and 100";
    return;
}
else{
  
if (editRow !== null) {
    let id = Number(editRow.cells[0].innerHTML);

    students = students.map(function(student) {
        if (student.id === id) {
            return {
                id: id,
                name: name,
                email: email,
                age: age,
                gender: gender,
                course: course
            };
        }
        return student;
    });

    saveStudents();
    loadStudents();

    editRow = null;
    form.reset();
    document.getElementById("addbtn").innerHTML = "+Add Student";
}
else{
 
students.push({
    id: student_id,
    name: name,
    email: email,
    age: age,
    gender: gender,
    course: course
});

saveStudents();
student_id++;

loadStudents();
form.reset();

document.getElementById("addbtn").innerHTML = "+Add Student";
}

}


});
//search

let search = document.getElementById("search_box");
let courseFilter = document.getElementById("course_filter");

function applyFilters() {
    let value = search.value.toLowerCase();
    let selectedCourse = courseFilter.value.toLowerCase();

    let rows = document.querySelectorAll("#table_body tr");

    rows.forEach(function(row) {
        let name = row.cells[1].innerHTML.toLowerCase();
        let course = row.cells[5].innerHTML.toLowerCase();

        let matchesSearch = name.includes(value);
        let matchesCourse =
            selectedCourse === "" || course === selectedCourse;

        row.style.display =
            matchesSearch && matchesCourse ? "" : "none";
    });
}

search.addEventListener("input", applyFilters);
courseFilter.addEventListener("change", applyFilters);

let adminName = document.getElementById("admin_name");
let adminEmail = document.getElementById("admin_email");
let saveProfile = document.getElementById("save_profile");

// Load saved profile
adminName.value = localStorage.getItem("adminName") || "";
adminEmail.value = localStorage.getItem("adminEmail") || "";

// Save profile
saveProfile.addEventListener("click", function() {

    if (adminName.value.trim() === "" ||
        adminEmail.value.trim() === "") {
        alert("Please enter name and email");
        return;
    }

    localStorage.setItem("adminName", adminName.value);
    localStorage.setItem("adminEmail", adminEmail.value);

    alert("Profile saved successfully!");
});
let adminPhoto = document.getElementById("admin_photo");

// Preview selected photo
adminPhoto.addEventListener("change", function() {

    let file = adminPhoto.files[0];

    if (file) {
        let reader = new FileReader();

        reader.onload = function(e) {
            localStorage.setItem("adminPhoto", e.target.result);
            alert("Profile photo saved!");
        };

        reader.readAsDataURL(file);
    }
});
let profilePreview = document.getElementById("profile_preview");

let savedPhoto = localStorage.getItem("adminPhoto");

if (savedPhoto) {
    profilePreview.src = savedPhoto;
}
let themeSelect = document.getElementById("theme_select");

// Load saved theme
let savedTheme = localStorage.getItem("theme") || "light";

document.body.classList.toggle("dark-mode", savedTheme === "dark");
themeSelect.value = savedTheme;

// Change theme
themeSelect.addEventListener("change", function() {

    let selectedTheme = themeSelect.value;

    if (selectedTheme === "dark") {
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
    }

    localStorage.setItem("theme", selectedTheme);
});


