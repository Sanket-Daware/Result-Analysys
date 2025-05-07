// ------------------------ TAB NAVIGATION ------------------------
function showSection(id) {
    document.querySelectorAll(".section").forEach(sec => sec.style.display = "none");
    const active = document.getElementById(id);
    active.style.display = "flex";
    active.style.flexWrap = "nowrap";
  }
  
  // ------------------------ CLASS-SEMESTER LOGIC ------------------------
  const classSelect = document.getElementById("classSelect");
  const semSelect = document.getElementById("semSelect");
  const deptSelectMarks = document.getElementById("deptSelect");
  
  deptSelectMarks?.addEventListener("change", () => {
    const dept = deptSelectMarks.value;
    classSelect.innerHTML = '<option value="">--Select Class--</option>';
    semSelect.innerHTML = '<option value="">--Select Semester--</option>';
  
    const classes = (dept === "MCA" || dept === "MBA")
      ? ["1st Year", "2nd Year"]
      : ["1st Year", "2nd Year", "3rd Year", "4th Year"];
  
    classes.forEach(cls => {
      const opt = document.createElement("option");
      opt.value = cls;
      opt.textContent = cls;
      classSelect.appendChild(opt);
    });
  });
  
  classSelect?.addEventListener("change", () => {
    const dept = deptSelectMarks.value;
    const year = classSelect.value;
    semSelect.innerHTML = '<option value="">--Select Semester--</option>';
  
    const semesterMap = {
      "1st Year": [1, 2],
      "2nd Year": [3, 4],
      "3rd Year": [5, 6],
      "4th Year": [7, 8]
    };
  
    const sems = (dept === "MBA" || dept === "MCA")
      ? (year === "1st Year" ? [1, 2] : [3, 4])
      : semesterMap[year] || [];
  
    sems.forEach(s => {
      const opt = document.createElement("option");
      opt.value = `Sem ${s}`;
      opt.textContent = `Semester ${s}`;
      semSelect.appendChild(opt);
    });
  });
  
  // ------------------------ SUBJECT ENTRY FORM LOGIC ------------------------
  document.getElementById("marksForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    document.getElementById("subjectEntry").style.display = "block";
    const subjectDropdown = document.getElementById("subjectDropdown");
    subjectDropdown.innerHTML = "";
    ["Math", "OOP", "DBMS", "AI"].forEach(sub => {
      const opt = document.createElement("option");
      opt.value = sub;
      opt.textContent = sub;
      subjectDropdown.appendChild(opt);
    });
    document.getElementById("evalType").dispatchEvent(new Event("change"));
  });
  
  const evalType = document.getElementById("evalType");
  const marksFields = document.getElementById("marksFields");
  
  evalType?.addEventListener("change", () => {
    const type = evalType.value;
    marksFields.innerHTML = "";
  
    if (type === "Theory") {
      marksFields.innerHTML = `<input type='number' placeholder='Theory Marks (Max 60)' max='60' min='0'>`;
    } else if (type === "Practical") {
      marksFields.innerHTML = `
        <input type='number' placeholder='Internal Practical (Max 25)' max='25' min='0'>
        <input type='number' placeholder='External Practical (Max 25)' max='25' min='0'>
      `;
    } else if (type === "TA") {
      ["Seminar", "Quiz", "Assignment", "Class Test", "Group Discussion"].forEach(tool => {
        const input = document.createElement("input");
        input.type = "number";
        input.placeholder = `${tool} (Max 5)`;
        input.max = 5;
        input.min = 0;
        marksFields.appendChild(input);
      });
    }
  });
  
  // ------------------------ REGISTER STUDENT LIVE GRID ------------------------
  document.getElementById("registerForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const grid = document.getElementById("studentGrid");
    const inputs = e.target.querySelectorAll("input, select");
    const data = Array.from(inputs).map(i => i.value).filter(v => v).join(" | ");
    const entry = document.createElement("div");
    entry.textContent = data;
    grid.prepend(entry);
  });
  
  // ------------------------ VIEW RESULT SECTION LOGIC ------------------------
  const department = document.getElementById("department");
  const classDropdown = document.getElementById("class");
  const semesterDropdown = document.getElementById("semester");
  const resultDropdown = document.getElementById("result");
  const subjectTypeGroup = document.getElementById("subjectTypeGroup");
  const mseTypeGroup = document.getElementById("mseTypeGroup");
  const subjectListGroup = document.getElementById("subjectListGroup");
  
  const subjectList = document.getElementById("subjectList");
  const mseType = document.getElementById("mseType");
  
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
  
  function populateMSE(includeAll = false) {
    mseType.innerHTML = '<option value="">--Select MSE--</option>';
    if (includeAll) {
      const allOption = document.createElement("option");
      allOption.value = "All";
      allOption.textContent = "All";
      mseType.appendChild(allOption);
    }
    ["MSE-1", "MSE-2", "MSE-3"].forEach(mse => {
      const opt = document.createElement("option");
      opt.value = mse;
      opt.textContent = mse;
      mseType.appendChild(opt);
    });
  }
  
  department?.addEventListener("change", () => {
    const dept = department.value;
    classDropdown.innerHTML = '<option value="">--Select Class--</option>';
    semesterDropdown.innerHTML = '<option value="">--Select Semester--</option>';
  
    const classes = (dept === "MCA" || dept === "MBA")
      ? ["1st Year", "2nd Year"]
      : ["1st Year", "2nd Year", "3rd Year", "4th Year"];
  
    classes.forEach(cls => {
      const option = document.createElement("option");
      option.value = cls;
      option.textContent = cls;
      classDropdown.appendChild(option);
    });
  });
  
  classDropdown?.addEventListener("change", () => {
    const dept = department.value;
    const year = classDropdown.value;
    let sems = [];
  
    if (dept === "MCA" || dept === "MBA") {
      sems = year === "1st Year" ? [1, 2] : [3, 4];
    } else {
      sems = year === "1st Year" ? [1, 2]
           : year === "2nd Year" ? [3, 4]
           : year === "3rd Year" ? [5, 6]
           : [7, 8];
    }
  
    semesterDropdown.innerHTML = '<option value="">--Select Semester--</option>';
    sems.forEach(s => {
      const opt = document.createElement("option");
      opt.value = s;
      opt.textContent = `Semester ${s}`;
      semesterDropdown.appendChild(opt);
    });
  });
  
  resultDropdown?.addEventListener("change", () => {
    subjectTypeGroup.style.display = "none";
    mseTypeGroup.style.display = "none";
    subjectListGroup.style.display = "none";
  
    const val = resultDropdown.value;
  
    if (val === "Subject-wise") {
      subjectTypeGroup.style.display = "block";
    } else if (val === "Practical") {
      subjectListGroup.style.display = "block";
      populateSubjects(practicalSubjects, true);
    } else if (val === "Theory") {
      subjectListGroup.style.display = "block";
      populateSubjects(theorySubjects, true);
    } else if (val === "MSE") {
      mseTypeGroup.style.display = "block";
      subjectListGroup.style.display = "block";
      populateMSE(true);
      populateSubjects(theorySubjects, true);
    } else if (val === "TA") {
      subjectListGroup.style.display = "block";
      populateSubjects(theorySubjects);
    }
  });
  
  document.getElementById("subjectType")?.addEventListener("change", () => {
    const type = document.getElementById("subjectType").value;
    if (type === "Practical") {
      subjectListGroup.style.display = "block";
      populateSubjects(practicalSubjects, true);
    } else if (type === "Theory") {
      subjectListGroup.style.display = "block";
      populateSubjects(theorySubjects, true);
    } else {
      subjectListGroup.style.display = "none";
    }
  });
  
  document.getElementById("resultForm")?.addEventListener("submit", function (e) {
    e.preventDefault();
    const grid = document.getElementById("resultGrid");
  
    const dept = department.value;
    const session = document.getElementById("session").value;
    const cls = classDropdown.value;
    const sem = semesterDropdown.value;
    const result = resultDropdown.value;
  
    const summary = `Dept: ${dept}, Session: ${session}, Class: ${cls}, Sem: ${sem}, Type: ${result}`;
    const entry = document.createElement("div");
    entry.textContent = summary;
    grid.prepend(entry);
  });
  
  // ------------------------ MARKS SUBMIT LOGIC ------------------------
  function submitMarks() {
    const grid = document.getElementById("marksGrid");
    const subject = document.getElementById("subjectDropdown").value;
    const type = document.getElementById("evalType").value;
    const marks = Array.from(document.querySelectorAll("#marksFields input")).map(i => i.value).join(", ");
    const entry = document.createElement("div");
    entry.textContent = `${subject} (${type}): ${marks}`;
    grid.prepend(entry);
  }
  