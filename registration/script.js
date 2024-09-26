// Função para validar o formulário antes de adicionar ou atualizar dados
function validateForm() {
    var name = document.getElementById("name").value;
    var age = document.getElementById("age").value;
    var occupation = document.getElementById("occupation").value;
    var email = document.getElementById("email").value;

    if (name == "") {
        alert("Name is required!");
        return false;
    }

    if (age == "") {
        alert("Age is required!");
        return false;
    } else if (age < 1) {
        alert("Age must be greater than 0");
        return false;
    }

    if (occupation == "") {
        alert("Occupation is required!");
        return false;
    }

    if (email == "") {
        alert("E-mail is required!");
        return false;
    } else if (!email.includes("@")) {
        alert("Invalid E-mail");
        return false;
    }

    return true;
}

// Função para mostrar os dados armazenados na tabela
function showData() {
    var peopleList;
    if (localStorage.getItem("peopleList") == null) {
        peopleList = [];
    } else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    var html = "";

    // Loop para criar as linhas da tabela com os dados armazenados
    peopleList.forEach(function (element, index) {
        html += "<tr>";
        html += "<td>" + element.name + "</td>";
        html += "<td>" + element.age + "</td>";
        html += "<td>" + element.occupation + "</td>";
        html += "<td>" + element.email + "</td>";
        html +=
            '<td><button onclick="deleteData(' +
            index +
            ')" class="btn btn-danger">Delete</button><button onclick="updateData(' +
            index +
            ')" class="btn btn-warning m-2">Edit</button></td>';
        html += "</tr>";
    });

    document.querySelector("#crudTable tbody").innerHTML = html;
}

// Função para adicionar dados ao local storage e atualizar a tabela
function addData() {
    if (validateForm()) {
        var name = document.getElementById("name").value;
        var age = document.getElementById("age").value;
        var occupation = document.getElementById("occupation").value;
        var email = document.getElementById("email").value;

        var peopleList;
        if (localStorage.getItem("peopleList") == null) {
            peopleList = [];
        } else {
            peopleList = JSON.parse(localStorage.getItem("peopleList"));
        }

        peopleList.push({
            name: name,
            age: age,
            occupation: occupation,
            email: email,
        });

        localStorage.setItem("peopleList", JSON.stringify(peopleList));
        showData();

        // Limpar o formulário após adicionar os dados
        document.getElementById("name").value = "";
        document.getElementById("age").value = "";
        document.getElementById("occupation").value = "";
        document.getElementById("email").value = "";
    }
}

// Função para deletar dados do local storage e atualizar a tabela
function deleteData(index) {
    var peopleList = JSON.parse(localStorage.getItem("peopleList"));
    peopleList.splice(index, 1);
    localStorage.setItem("peopleList", JSON.stringify(peopleList));
    showData();
}

// Função para carregar os dados no formulário para editar
function updateData(index) {
    document.getElementById("Submit").style.display = "none";
    document.getElementById("Update").style.display = "block";

    var peopleList = JSON.parse(localStorage.getItem("peopleList"));

    document.getElementById("name").value = peopleList[index].name;
    document.getElementById("age").value = peopleList[index].age;
    document.getElementById("occupation").value = peopleList[index].occupation;
    document.getElementById("email").value = peopleList[index].email;

    document.querySelector("#Update").onclick = function () {
        if (validateForm() == true) {
            peopleList[index].name = document.getElementById("name").value;
            peopleList[index].age = document.getElementById("age").value;
            peopleList[index].occupation = document.getElementById("occupation").value;
            peopleList[index].email = document.getElementById("email").value;

            localStorage.setItem("peopleList", JSON.stringify(peopleList));

            showData();

            document.getElementById("name").value = "";
            document.getElementById("age").value = "";
            document.getElementById("occupation").value = "";
            document.getElementById("email").value = "";

            document.getElementById("Submit").style.display = "block";
            document.getElementById("Update").style.display = "none";
        }
    };
}

// Mostrar os dados ao carregar a página
window.onload = function () {
    showData();
    document.getElementById("Update").style.display = "none"; // Esconder o botão Update inicialmente
};
