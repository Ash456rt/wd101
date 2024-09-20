let userForm = document.getElementById("user-form");

// Function to retrieve entries from local storage
const retrieveEntries = () => {
  let entries = localStorage.getItem("user-entries");
  return entries ? JSON.parse(entries) : [];
};

// Function to display entries in the table
const displayEntries = () => {
  const entries = retrieveEntries();
  let tableEntries = '';

  if (entries.length > 0) {
    tableEntries += entries.map((entry) => {
      const passwordCell = `<td>${entry.password}</td>`; // Consider hiding this
      return `
        <tr>
          <td>${entry.name}</td>
          <td>${entry.email}</td>
          ${passwordCell}
          <td>${entry.dob}</td>
          <td>${entry.acceptTerms ? 'Yes' : 'No'}</td>
        </tr>
      `;
    }).join("\n");
  }

  document.querySelector("#user-entries tbody").innerHTML = tableEntries;
};

// Function to save user form data
const saveUserForm = (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const acceptTerms = document.getElementById("terms").checked;

  const dobDate = new Date(dob);
  const today = new Date();
  const age = today.getFullYear() - dobDate.getFullYear();

  // Validate age
  if (age < 18 || age > 55) {
    alert("You must be between 18 and 55 years old to register.");
    return;
  }

  // Create an entry object
  const entry = {
    name,
    email,
    password,
    dob,
    acceptTerms,
  };

  let userEntries = retrieveEntries();
  userEntries.push(entry);
  localStorage.setItem("user-entries", JSON.stringify(userEntries));
  displayEntries();
  userForm.reset();
};

// Add event listener for form submission
userForm.addEventListener("submit", saveUserForm);

// Display entries on initial load
displayEntries();
