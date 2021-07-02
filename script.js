var data;
var lastIndex = 1;

// onload function to fetch pagination JSON data and store it in global variable(So that we can reuse data and calls to api is reduced.)
window.onload = function () {
    let req1 = new XMLHttpRequest();
    let url = "https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json";
    req1.open('GET', url, true);
    req1.send();
    req1.onload = function () {
        if (this.status == 200) {
            data = JSON.parse(this.response);
            updatetable(1);
        }
    }
}

//function used to create table data 
function trth(elementname, value = "") {
    var td = document.createElement(elementname);
    td.innerHTML = value;
    return td;
}

//function to create required buttons
function createbutton(id) {
    let button = document.createElement('button');
    button.setAttribute('class', 'btn btn-primary');
    if (id === 11) {
        button.innerHTML = 'First';
    }
    else if (id === 12) {
        button.innerHTML = 'Last';
    }
    else if (id === 13) {
        button.innerHTML = 'Previous';
    }
    else {
        button.innerHTML = id;
    }
    return button;
}


//creating a table with header and append the table to document body
let table = document.createElement("table");
table.className = "table";

let thead = document.createElement("thead");
thead.className = "thead-dark";

let tr1 = document.createElement("tr");
tr1.append(trth("th", "Id"));
tr1.append(trth("th", "Name"));
tr1.append(trth("th", "Email"));


thead.append(tr1);
let tbody = document.createElement("tbody");
table.append(thead, tbody);

table.style.textAlign = "center";

document.body.append(table);

//Creating required buttons by calling 'createbutton' function
for (let i = 1; i <= 13; i++) {
    let button = createbutton(i);
    document.body.append(button);

}

//Event handler for all buttons
let btns = document.querySelectorAll('button');

for (i of btns) {
    i.addEventListener('click', function () {
        // Clearing previous row data from table
        for (let i = 1; i < table.rows.length;) {
            table.deleteRow(i);
        }

        let index = this.innerHTML;
        if (index === "First") {
            index = 1;
        }
        else if (index === "Last") {
            index = 10;
        }
        else if (index == "Previous") {
            index = lastIndex - 1;
            if (index < 1) {
                index = 1;
                alert("Previous cannot go beyond 1");

            }
        }
        // this variable is used to store the last button clicked.
        lastIndex = index;
        updatetable(index);

    });
}

//Updates table based on button clicked.
function updatetable(index) {
    index = (index - 1) * 10;
    for (let i = index; i < index + 10; i++) {
        let tr = document.createElement("tr");
        tr.append(trth("td", data[i].id));
        tr.append(trth("td", data[i].name));
        tr.append(trth("td", data[i].email));
        tbody.append(tr);
    }
    //append the updated tbody to table
    table.append(tbody);

}
