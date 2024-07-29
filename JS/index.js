document.getElementById("refresh").addEventListener('click', fetchContacts);
document.getElementById("addContact").addEventListener('click', addContact);

function fetchContacts() {
    fetch(rootPath + "controller/get-contacts/")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            displayOutput(data);
            //console.log(data);
        })
}

function displayOutput(data) {
    output = "<table>";

    for (a in data) {
        output += `
            <tr onclick="editContact(${data[a].id})">
                <td class="text-center"><img src="${rootPath}controller/uploads/${data[a].avatar}" class="img-fluid rounded-circle my-3" style="width: 150px; height: 150px; object-fit: cover;"></td>
                <td>
                    <h5 class="ms-3">${data[a].firstname}</h5>
                </td>
                <td>
                    <h5 class="ms-3">${data[a].lastname}</h5>
                </td>
            </tr>
        `
    }
    output += "</table>";
    document.getElementById("table").innerHTML = output;
}

function addContact() {
    window.open("add-contact.html", "_self");
}

function editContact(id) {
    window.open("edit-contact.html?id=" + id, "_self");
}