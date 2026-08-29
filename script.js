/* =========================================
   SMARTBLOOD APPLICATION
========================================= */

const $ = (id) => document.getElementById(id);


/* =========================================
   SCREENS
========================================= */

const screens = [
    "registerScreen",
    "roleScreen",
    "donorScreen",
    "patientScreen",
    "bloodBankScreen"
];


function showScreen(screenId) {

    screens.forEach((id) => {

        $(id).classList.remove("active");

    });

    $(screenId).classList.add("active");

    window.scrollTo(0, 0);

}


/* =========================================
   PROFILE
========================================= */

let profile =
    JSON.parse(
        localStorage.getItem("smartBloodProfile")
    ) || null;


function getValue(id) {

    return $(id).value.trim();

}


function escapeHTML(value) {

    return String(value || "")
        .replace(/[&<>"']/g, function(character) {

            const map = {

                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#039;"

            };

            return map[character];

        });

}


/* =========================================
   REGISTER
========================================= */

$("registerForm").addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        profile = {

            name: getValue("name"),

            age: getValue("age"),

            gender: getValue("gender"),

            height: getValue("height"),

            weight: getValue("weight"),

            contact: getValue("contact"),

            bloodGroup: getValue("bloodGroup"),

            address: getValue("address"),

            district: getValue("district"),

            healthIssues:
                getValue("healthIssues") || "None"

        };


        localStorage.setItem(
            "smartBloodProfile",
            JSON.stringify(profile)
        );


        showScreen("roleScreen");

    }
);


/* =========================================
   ROLE BUTTONS
========================================= */

$("donorBtn").onclick = function() {

    loadProfile();

    showScreen("donorScreen");

};


$("patientBtn").onclick = function() {

    loadProfile();

    showScreen("patientScreen");

};


$("bloodBankBtn").onclick = function() {

    loadProfile();

    showScreen("bloodBankScreen");

};


/* =========================================
   BACK BUTTONS
========================================= */

$("backRegister").onclick = function() {

    showScreen("registerScreen");

};


$("backFromDonor").onclick = function() {

    showScreen("roleScreen");

};


$("backFromPatient").onclick = function() {

    showScreen("roleScreen");

};


$("backFromBank").onclick = function() {

    showScreen("roleScreen");

};


/* Blood Bank internal navigation */

$("backToBankTop").onclick = function() {

    document
        .getElementById("bankName")
        .scrollIntoView({
            behavior: "smooth"
        });

};


$("backToInventory").onclick = function() {

    document
        .getElementById("saveInventory")
        .scrollIntoView({
            behavior: "smooth"
        });

};


/* =========================================
   LOAD PROFILE
========================================= */

function loadProfile() {

    if (!profile) return;


    $("donorProfile").innerHTML = `

        <b>Name:</b>
        ${escapeHTML(profile.name)}

        <br>

        <b>Age:</b>
        ${escapeHTML(profile.age)}

        <br>

        <b>Gender:</b>
        ${escapeHTML(profile.gender)}

        <br>

        <b>Blood Group:</b>

        <span class="badge">
            ${escapeHTML(profile.bloodGroup)}
        </span>

        <br>

        <b>Height:</b>
        ${escapeHTML(profile.height)} cm

        <br>

        <b>Weight:</b>
        ${escapeHTML(profile.weight)} kg

        <br>

        <b>District:</b>
        ${escapeHTML(profile.district)}

        <br>

        <b>Contact:</b>
        ${escapeHTML(profile.contact)}

    `;


    $("patientDistrict").value =
        profile.district;

}


/* =========================================
   DONOR
========================================= */

$("saveDonor").onclick = function() {

    const donorData = {

        availability:
            getValue("availability"),

        area:
            getValue("donorArea")

    };


    localStorage.setItem(
        "smartBloodDonor",
        JSON.stringify(donorData)
    );


    $("donorMessage").style.display =
        "block";


    $("donorMessage").textContent =
        "✓ Donor profile saved successfully!";

};


/* =========================================
   BLOOD COMPATIBILITY
========================================= */

const compatibility = {

    "A+": ["A+", "A-", "O+", "O-"],

    "A-": ["A-", "O-"],

    "B+": ["B+", "B-", "O+", "O-"],

    "B-": ["B-", "O-"],

    "AB+": [
        "A+",
        "A-",
        "B+",
        "B-",
        "AB+",
        "AB-",
        "O+",
        "O-"
    ],

    "AB-": [
        "A-",
        "B-",
        "AB-",
        "O-"
    ],

    "O+": [
        "O+",
        "O-"
    ],

    "O-": [
        "O-"
    ]

};


/* =========================================
   PATIENT SEARCH
========================================= */

$("findDonors").onclick = function() {

    const bloodGroup =
        getValue("requiredGroup");

    const units =
        getValue("units");

    const hospital =
        getValue("hospital");

    const district =
        getValue("patientDistrict");

    const urgency =
        getValue("urgency");


    if (
        !bloodGroup ||
        !hospital ||
        !district
    ) {

        alert(
            "Please fill Blood Group, Hospital and District."
        );

        return;

    }


    const compatible =
        compatibility[bloodGroup];


    $("matchResult").innerHTML = `

        <div class="result-card">

            <h3>
                🔎 Blood Matching Result
            </h3>

            <p>
                <b>Required Blood:</b>
                ${escapeHTML(bloodGroup)}
            </p>

            <p>
                <b>Required Units:</b>
                ${escapeHTML(units)}
            </p>

            <p>
                <b>Hospital:</b>
                ${escapeHTML(hospital)}
            </p>

            <p>
                <b>District:</b>
                ${escapeHTML(district)}
            </p>

            <p>
                <b>Urgency:</b>
                ${escapeHTML(urgency)}
            </p>

            <p>
                <b>Compatible Groups:</b>
                ${compatible.join(", ")}
            </p>

            <br>

            <p>
                ⚠️ Demo mode:
                Firebase can be connected later
                for real donor matching.
            </p>

        </div>

    `;

};


/* =========================================
   BLOOD BANK REGISTRATION
========================================= */

$("registerBank").onclick = function() {

    const bank = {

        name:
            getValue("bankName"),

        license:
            getValue("bankLicense"),

        contact:
            getValue("bankContact"),

        email:
            getValue("bankEmail"),

        district:
            getValue("bankDistrict"),

        hours:
            getValue("bankHours"),

        address:
            getValue("bankAddress")

    };


    if (
        !bank.name ||
        !bank.contact ||
        !bank.district
    ) {

        alert(
            "Please enter Blood Bank Name, Contact and District."
        );

        return;

    }


    localStorage.setItem(
        "smartBloodBank",
        JSON.stringify(bank)
    );


    $("bankMessage").style.display =
        "block";


    $("bankMessage").textContent =
        "✓ Blood Bank registered successfully!";

};


/* =========================================
   BLOOD INVENTORY
========================================= */

$("saveInventory").onclick = function() {

    const inventory = {

        "A+": getValue("Apos"),

        "A-": getValue("Aneg"),

        "B+": getValue("Bpos"),

        "B-": getValue("Bneg"),

        "AB+": getValue("ABpos"),

        "AB-": getValue("ABneg"),

        "O+": getValue("Opos"),

        "O-": getValue("Oneg")

    };


    localStorage.setItem(
        "smartBloodInventory",
        JSON.stringify(inventory)
    );


    $("inventoryMessage").style.display =
        "block";


    $("inventoryMessage").textContent =
        "✓ Blood inventory updated successfully!";

};


/* =========================================
   BLOOD BANK SEARCH
========================================= */

$("searchBank").onclick = function() {

    const group =
        getValue("searchBlood");

    const district =
        getValue("searchDistrict");


    if (!group || !district) {

        alert(
            "Select Blood Group and District."
        );

        return;

    }


    const bank =
        JSON.parse(
            localStorage.getItem(
                "smartBloodBank"
            )
        );


    const inventory =
        JSON.parse(
            localStorage.getItem(
                "smartBloodInventory"
            )
        );


    if (!bank || !inventory) {

        $("bankSearchResult").innerHTML = `

            <div class="result-card">

                <h3>
                    🏦 Blood Bank Search
                </h3>

                <p>
                    No blood bank inventory
                    registered in this demo yet.
                </p>

            </div>

        `;

        return;

    }


    const units =
        inventory[group] || 0;


    $("bankSearchResult").innerHTML = `

        <div class="result-card">

            <h3>
                🏦 Blood Availability
            </h3>

            <p>
                <b>Blood Bank:</b>
                ${escapeHTML(bank.name)}
            </p>

            <p>
                <b>District:</b>
                ${escapeHTML(bank.district)}
            </p>

            <p>
                <b>Blood Group:</b>
                ${escapeHTML(group)}
            </p>

            <p>
                <b>Available Units:</b>
                ${escapeHTML(units)}
            </p>

            <p>
                <b>Contact:</b>
                ${escapeHTML(bank.contact)}
            </p>

        </div>

    `;

};


/* =========================================
   LOGOUT
========================================= */

function logout() {

    localStorage.removeItem(
        "smartBloodProfile"
    );

    profile = null;

    showScreen("registerScreen");

}


$("donorLogout").onclick = logout;

$("patientLogout").onclick = logout;

$("bankLogout").onclick = logout;


/* =========================================
   START APP
========================================= */

if (profile) {

    showScreen("roleScreen");

} else {

    showScreen("registerScreen");

}
