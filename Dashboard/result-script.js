const department = document.getElementById("department");
const classDropdown = document.getElementById("class");
const semesterDropdown = document.getElementById("semester");
const resultDropdown = document.getElementById("result");
const subjectTypeGroup = document.getElementById("subjectTypeGroup");
const mseTypeGroup = document.getElementById("mseTypeGroup");
const subjectListGroup = document.getElementById("subjectListGroup");

const subjectList = document.getElementById("subjectList");

// Dummy data
const theorySubjects = ["Maths", "OOP", "DBMS", "AI"];
const practicalSubjects = ["Lab-1", "DBMS Lab", "AI Lab"];

function populateSubjects(subjects, includeAll = false) {
  subjectList.innerHTML = '<option value="">--Select Subject--</option>';
  
  if (includeAll) {
    const allOption = document.createElement("option");
    allOption.value = "All";
    allOption.textContent = "All";
    subjectList.appendChild(allOption);
  }

  subjects.forEach(sub => {
    const opt = document.createElement("option");
    opt.value = sub;
    opt.textContent = sub;
    subjectList.appendChild(opt);
  });
}

department.addEventListener("change", () => {
  const dept = department.value;
  classDropdown.innerHTML = '<option value="">--Select Class--</option>';

  const classes =
    dept === "MCA" || dept === "MBA"
      ? ["1st Year", "2nd Year"]
      : ["1st Year", "2nd Year", "3rd Year", "4th Year"];

  classes.forEach(cls => {
    const option = document.createElement("option");
    option.value = cls;
    option.textContent = cls;
    classDropdown.appendChild(option);
  });

  semesterDropdown.innerHTML = '<option value="">--Select Semester--</option>';
});

classDropdown.addEventListener("change", () => {
  const dept = department.value;
  const year = classDropdown.value;

  let sems = [];

  if (dept === "MCA" || dept === "MBA") {
    sems = year === "1st Year" ? [1, 2] : [3, 4];
  } else {
    if (year === "1st Year") sems = [1, 2];
    else if (year === "2nd Year") sems = [3, 4];
    else if (year === "3rd Year") sems = [5, 6];
    else if (year === "4th Year") sems = [7, 8];
  }

  semesterDropdown.innerHTML = '<option value="">--Select Semester--</option>';
  sems.forEach(s => {
    const opt = document.createElement("option");
    opt.value = s;
    opt.textContent = `Semester ${s}`;
    semesterDropdown.appendChild(opt);
  });
});

resultDropdown.addEventListener("change", () => {
  subjectTypeGroup.style.display = "none";
  mseTypeGroup.style.display = "none";
  subjectListGroup.style.display = "none";

  const val = resultDropdown.value;

  if (val === "Subject-wise") {
    subjectTypeGroup.style.display = "block";
  } else if (val === "Practical") {
    subjectListGroup.style.display = "block";
    populateSubjects(practicalSubjects, true); // Include 'All'
  } else if (val === "Theory") {
    subjectListGroup.style.display = "block";
    populateSubjects(theorySubjects, true); // Include 'All'
  } else if (val === "MSE") {
    mseTypeGroup.style.display = "block";
    subjectListGroup.style.display = "block";
    populateSubjects(theorySubjects); // No 'All' for MSE
  } else if (val === "TA") {
    subjectListGroup.style.display = "block";
    populateSubjects(theorySubjects); // No 'All' for TA
  }
});

document.getElementById("subjectType").addEventListener("change", () => {
  const type = document.getElementById("subjectType").value;
  if (type === "Practical") {
    subjectListGroup.style.display = "block";
    populateSubjects(practicalSubjects);
  } else if (type === "Theory") {
    subjectListGroup.style.display = "block";
    populateSubjects(theorySubjects);
  } else if (type === "All") {
    subjectListGroup.style.display = "none";
  } else {
    subjectListGroup.style.display = "none";
  }
});

document.getElementById("resultForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Reset all error messages
  document.querySelectorAll(".error").forEach(el => el.textContent = "");

  const isEmpty = (id, message) => {
    const el = document.getElementById(id);
    if (!el || !el.value.trim()) {
      document.getElementById(`${id}Error`).textContent = message;
      return true;
    }
    return false;
  };

  let hasError = false;
  hasError |= isEmpty("department", "Please select a department.");
  hasError |= isEmpty("session", "Please select a session.");
  hasError |= isEmpty("class", "Please select a class.");
  hasError |= isEmpty("semester", "Please select a semester.");
  hasError |= isEmpty("result", "Please select a result type.");

  if (resultDropdown.value === "Subject-wise") {
    hasError |= isEmpty("subjectType", "Please choose a subject type.");
  }

  if (resultDropdown.value === "MSE") {
    hasError |= isEmpty("mseType", "Please choose MSE type.");
  }

  if (
    ["Practical", "Theory", "MSE", "TA", "Subject-wise"].includes(resultDropdown.value)
  ) {
    const subType = document.getElementById("subjectType")?.value;
    if (
      resultDropdown.value !== "Subject-wise" ||
      (subType !== "All" && subType !== "")
    ) {
      hasError |= isEmpty("subjectList", "Please select a subject.");
    }
  }

  if (!hasError) {
    alert("Form submitted successfully!");
    // Further logic here...
  }
});
