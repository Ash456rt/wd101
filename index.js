let userForm = document.getElementById("user-form");

const retrieveEntries = () => {
  let entries = localStorage.getItem("user-entries");
  if (entries) {
    entries = JSON.parse(entries);
  } else {
    entries = [];
  }
  return entries;
};

let userEntries = retrieveEntries();

const displayEntries = () => {
  const entries = retrieveEntries();
  let tableEntries = `
    <tr>
      <th class="px-4 py-2">Name</th>
      <th class="px-4 py-2">Email</th>
      <th class="px-4 py-2">Password</th>
      <th class="px-4 py-2">DOB</th>
      <th class="px-4 py-2">Accepted Terms</th>
    </tr>
  `;
  if (entries.length > 0) {
    tableEntries += entries.map((entry) => {
      const nameCell = `<td class='border px-4 py-2'>${entry.name}</td>`;
      const emailCell = `<td class='border px-4 py-2'>${entry.email}</td>`;
      const passwordCell = `<td class='border px-4 py-2'>${entry.password}</td>`;
      const dobCell = `<td class='border px-4 py-2'>${entry.dob}</td>`;
      const acceptTermsCell = `<td class='border px-4 py-2'>${entry.acceptTerms}</td>`;
      const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptTermsCell}</tr>`;
      return row;
    }).join("\n");
  }
  const table = `
    <table class="table-auto w-full">
      ${tableEntries}
    </table>
  `;
  let details = document.getElementById("user-entries");
  details.innerHTML = table;
};

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
  const isBetween18And55 = age >= 18 && age <= 55;

  if (!isBetween18And55) {
    alert("You must be between 18 and 55 years old to register.");
    return;
  }

  const entry = {
    name,
    email,
    password,
    dob,
    acceptTerms,
  };
  userEntries = retrieveEntries();
  userEntries.push(entry);
  localStorage.setItem("user-entries", JSON.stringify(userEntries));
  displayEntries();
  userForm.reset();
};

userForm.addEventListener("submit", saveUserForm);
displayEntries();
