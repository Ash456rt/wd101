let userForm = document.getElementById("user-form");

// Function to calculate the user's age based on date of birth
const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};

// Retrieve entries from localStorage
const retrieveEntries = () => {
    let entries = localStorage.getItem("user-entries");
    if (entries) {
        entries = JSON.parse(entries);
    } else {
        entries = [];
    }
    return entries;
};

let userEntries = retrieveEntries(); // Initialize with existing entries

// Display entries in the table
const displayEntries = () => {
    const entries = retrieveEntries();

    const tableEntries = entries
        .map((entry) => {
            const nameCell = `<td class='border px-4 py-2'>${entry.name}</td>`;
            const emailCell = `<td class='border px-4 py-2'>${entry.email}</td>`;
            const passwordCell = `<td class='border px-4 py-2'>${entry.password}</td>`;
            const dobCell = `<td class='border px-4 py-2'>${entry.dob}</td>`;
            const acceptTermsCell = `<td class='border px-4 py-2'>${entry.acceptTerms ? 'Yes' : 'No'}</td>`;
            const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptTermsCell}</tr>`;
            return row;
        })
        .join("\n");

    const table = `
    <table class="table-auto w-full">
        <tr>
            <th class="px-4 py-2">Name</th>
            <th class="px-4 py-2">Email</th>
            <th class="px-4 py-2">Password</th>
            <th class="px-4 py-2">DOB</th>
            <th class="px-4 py-2">Accepted terms?</th>
        </tr>
        ${tableEntries}
    </table>`;

    let details = document.getElementById("user-entries");
    details.innerHTML = table;
};

// Save form data to localStorage and update the table
const saveUserForm = (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const acceptTerms = document.getElementById("terms").checked;

    // Validate age (18 to 55)
    const age = calculateAge(dob);
    if (age < 18 || age > 55) {
        alert("Age must be between 18 and 55 years.");
        return;
    }

    const entry = {
        name,
        email,
        password,
        dob,
        acceptTerms,
    };

    // Add new entry to the list of entries
    userEntries.push(entry);
    
    // Store updated entries back to localStorage
    localStorage.setItem("user-entries", JSON.stringify(userEntries));

    // Update the table with new entry immediately
    displayEntries();
};

// Attach form submission handler
userForm.addEventListener("submit", saveUserForm);

// Display entries when the page loads
displayEntries();

