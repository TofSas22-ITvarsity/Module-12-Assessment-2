let id = getId();
document.getElementById("homeLink").addEventListener('click', homeLink);
document.getElementById("editContact").addEventListener('click', editContact);
document.getElementById("submitForm").addEventListener('click', submitForm);
document.getElementById("deleteContact").addEventListener('click', deleteContact);

function getId() {
    let url = window.location.href;
    let pos = url.search("=");
    let id = url.slice(pos + 1);
    return id;
}

function getContact() {
    fetch(rootPath + 'controller/get-contacts/?id=' + id)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            displayOutput(data);
        })
}

function homeLink() {
    window.open("index.html", "_self");
}

function displayOutput(data) {
    let avatarImg = `<img src="${rootPath}/controller/uploads/${data[0].avatar}" class="img-fluid rounded-circle mb-3">`;
    document.getElementById("avatarImage").innerHTML = avatarImg;
    document.getElementById("firstname").value = data[0].firstname;
    document.getElementById("lastname").value = data[0].lastname;
    document.getElementById("mobile").value = data[0].mobile;
    document.getElementById("email").value = data[0].email;
}

function editContact() {
    document.getElementById("firstname").readOnly = false;
    document.getElementById("lastname").readOnly = false;
    document.getElementById("mobile").readOnly = false;
    document.getElementById("email").readOnly = false;
    document.getElementById("avatar").hidden = false;
    document.getElementById("submitForm").hidden = false;
}
function submitForm(e) {
    e.preventDefault();

    const form = new FormData(document.querySelector("#editForm"));
    form.append('apiKey', apiKey);
    form.append('id', id);

    fetch(rootPath + 'controller/edit-contact/', {
        method: 'POST',
        headers: { 'Accept': 'application/json, *.*' },
        body: form
    })
        .then(function (response) {
            return response.text();
        })
        .then(function (data) {
            if (data == "1") {
                alert("Contact Edited");
                homeLink();
            } else {
                alert(data);
                homeLink();
            }
        })
}

function deleteContact() {
    let confirmDelete = confirm("Delete contact, are you sure?");

    if (confirmDelete == true) {
        fetch(rootPath + 'controller/delete-contact/?id=' + id)
            .then(function (response) {
                return response.text();
            })
            .then(function (data) {
                if (data == "1") {
                    homeLink();
                } else {
                    alert(data);
                }
            })
    }
}