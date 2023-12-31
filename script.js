// const student = 'https://example.com/api/data';
// Replace the URL with the actual URL from which you want to fetch data
const apiUrl = 'https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json';

let student = [];

// Function to fetch data from the URL and convert it to an array of objects
function fetchDataAndConvertToArray() {
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            student = data.map(item => {
                // Process the data and structure it as an object
                return {
                    "id": item.id,
                    "first_name": item.first_name,
                    "last_name": item.last_name,
                    "email": item.email,
                    "gender": item.gender,
                    "img_src": item.img_src,
                    "class": item.class,
                    "marks": item.marks,
                    "passing": item.passing,
                    "city": item.city,
                };
            });
            populateTable(student);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

// Call the fetchDataAndConvertToArray function to fetch and process the data
fetchDataAndConvertToArray();

// Update the populateTable function to accept a table ID
function populateTable(data, tableId = "studentTable") {
    const tableBody = document.querySelector(`#${tableId}`);
    tableBody.innerHTML = ""; // Clear existing rows

    data.forEach(stuData => {
        const fullName = `${stuData.first_name} ${stuData.last_name}`;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${stuData.id}</td>
            <td>
                <img src="${stuData.img_src}" alt="${fullName}">
                ${fullName}
            </td>
            <td>${stuData.gender}</td>
            <td>${stuData.class}</td>
            <td>${stuData.marks}</td>
            <td>${stuData.passing}</td>
            <td>${stuData.email}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to compare objects based on the "name" property
function compareNames(a, b) {
    const nameA = `${a.first_name} ${a.last_name}`.toLowerCase();
    const nameB = `${b.first_name} ${b.last_name}`.toLowerCase();

    if (nameA < nameB) {
        return -1;
    }
    if (nameA > nameB) {
        return 1;
    }
    return 0;
}

function compareNamesDescending(a, b) {
    const nameA = `${a.first_name} ${a.last_name}`.toLowerCase();
    const nameB = `${b.first_name} ${b.last_name}`.toLowerCase();

    if (nameA > nameB) {
        return -1;
    }
    if (nameA < nameB) {
        return 1;
    }
    return 0;
}

// Function to compare objects based on the "marks" property in ascending order
function compareMarksAscending(a, b) {
    return a.marks - b.marks;
}

function compareClassAscending(a, b) {
    return a.class - b.class;
}

// Function to handle search and update the table
function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase();

    const filteredData = student.filter(item => {
        // Convert data to lowercase for case-insensitive search
        const firstName = item.firstName.toLowerCase();
        const lastName = item.lastName.toLowerCase();
        const email = item.email.toLowerCase();

        // Check if any property contains the search term
        return firstName.includes(searchTerm) ||
               lastName.includes(searchTerm) ||
               email.includes(searchTerm);
    });

    // Populate the table with the filtered data
    populateTable(filteredData);
}

// Add event listeners for sorting and searching
document.querySelector("#sortAZButton").addEventListener("click", () => {
    // Sort the array of objects by name
    student.sort(compareNames);
    populateTable(student);
});

document.querySelector("#sortZAButton").addEventListener("click", () => {
    // Sort students array Z->A and repopulate the table
    student.sort(compareNamesDescending);
    populateTable(student);
});

document.querySelector("#sortMarksButton").addEventListener("click", () => {
    // Sort the array of objects by marks in ascending order
    student.sort(compareMarksAscending);
    populateTable(student);

});

document.querySelector("#sortPassingButton").addEventListener("click", () => {
    let newPassData = student.filter(item => item.passing === true);
    populateTable(newPassData);
});

document.querySelector("#sortClassButton").addEventListener("click", () => {
    student.sort(compareClassAscending);
    populateTable(student);
});

document.querySelector("#sortGenderButton").addEventListener("click", () => {
    let femaleStudent = student.filter(stu => stu.gender === "female");
    let maleStudent = student.filter(stu => stu.gender === "male");

    // Populate separate tables for female and male students
    populateTable(femaleStudent, "femaleTable");
    populateTable(maleStudent, "maleTable");
});

// Add event listeners for other sorting buttons and handle the logic.

document.querySelector("#searchButton").addEventListener("click", () => {
    handleSearch();
});


// Initial population of the table
populateTable(student);