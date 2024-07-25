document.getElementById("submitForm").addEventListener('click', submitForm);
document.getElementById("homeLink").addEventListener('click', homeLink);

function submitForm(e) {
    e.preventDefault();

    const form = new FormData(document.querySelector('#editForm'));
    form.append('apiKey', apiKey);

    fetch(rootPath + 'controller/insert-contact/', {
        method: 'POST',
        headers: { 'Accept': 'application/json, *.*' },
        body: form
    })
    .then(function (response) {
        return response.text();
    })
    .then(function (data) {
        if (data == "1") {
            alert("Contact Added");
            homeLink();
        } else {
            alert(data);
            homeLink();
        }
    })
}

function homeLink() {
    window.open("index.html", "_self");
}
