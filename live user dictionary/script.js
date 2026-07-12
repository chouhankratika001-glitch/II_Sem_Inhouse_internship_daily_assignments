// ============================
// Global Variables
// ============================

let users = [];
let filteredUsers = [];

// HTML Elements
const userContainer = document.getElementById("userContainer");
const loading = document.getElementById("loading");
const errorBox = document.getElementById("errorBox");
const retryBtn = document.getElementById("retryBtn");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const userCount = document.getElementById("userCount");

// ============================
// Fetch Users
// ============================

function fetchUsers() {

    loading.style.display = "block";
    errorBox.classList.add("d-none");
    userContainer.innerHTML = "";

    fetch("https://randomuser.me/api/?results=20")

        .then(response => {

            if (!response.ok) {
                throw new Error("Network Error");
            }

            return response.json();

        })

        .then(data => {

            users = data.results;
            filteredUsers = [...users];

            loading.style.display = "none";

            displayUsers(filteredUsers);

        })

        .catch(error => {

            console.error(error);

            loading.style.display = "none";

            errorBox.classList.remove("d-none");

        });

}

// ============================
// Display Users
// ============================

function displayUsers(list) {

    userContainer.innerHTML = "";

    userCount.textContent = list.length;

    if (list.length === 0) {

        userContainer.innerHTML = `

            <div class="col-12">

                <div class="alert alert-warning text-center">

                    No users found.

                </div>

            </div>

        `;

        return;
    }

    list.forEach(user => {

        const card = document.createElement("div");

        card.className = "col-lg-4 col-md-6 mb-4";

        card.innerHTML = `

            <div class="user-card">

                <div class="card-body">

                    <img src="${user.picture.large}" alt="${user.name.first}">

                    <h4 class="card-title mt-3">

                        ${user.name.first} ${user.name.last}

                    </h4>

                    <p class="card-text">

                        <i class="bi bi-envelope-fill"></i>

                        ${user.email}

                    </p>

                    <p class="card-text">

                        <i class="bi bi-telephone-fill"></i>

                        ${user.phone}

                    </p>

                    <p class="card-text">

                        <i class="bi bi-geo-alt-fill"></i>

                        ${user.location.country}

                    </p>

                    <p class="card-text">

                        <i class="bi bi-gender-ambiguous"></i>

                        ${user.gender}

                    </p>

                    <p class="card-text">

                        <i class="bi bi-calendar-event-fill"></i>

                        Age : ${user.dob.age}

                    </p>

                </div>

            </div>

        `;

        userContainer.appendChild(card);

    });

}

// ============================
// Search Users
// ============================

searchInput.addEventListener("input", function () {

    const searchValue = this.value.toLowerCase();

    filteredUsers = users.filter(user => {

        const fullName = `${user.name.first} ${user.name.last}`.toLowerCase();

        return fullName.includes(searchValue);

    });

    displayUsers(filteredUsers);

});

// ============================
// Sort Users
// ============================

sortSelect.addEventListener("change", function () {

    if (this.value === "az") {

        filteredUsers.sort((a, b) => {

            return a.name.first.localeCompare(b.name.first);

        });

    }

    if (this.value === "za") {

        filteredUsers.sort((a, b) => {

            return b.name.first.localeCompare(a.name.first);

        });

    }

    displayUsers(filteredUsers);

});

// ============================
// Retry Button
// ============================

retryBtn.addEventListener("click", fetchUsers);

// ============================
// Start App
// ============================

fetchUsers();