let btn = document.getElementById("btn1");
let output = document.getElementById("output");
let filterData = document.getElementById("btn2");
let filterData3 = document.getElementById("btn5");
let filterData1 = document.getElementById("btn3");
let filterData2 = document.getElementById("btn4");
btn.onclick = async () => {
    let response = await fetch("https://fakestoreapi.com/products");
    let data = await response.json();
    alert("Data Fetched");
    localStorage.setItem("data", JSON.stringify(data));
    displayData(data);
}
filterData.onclick = () => {
    let data = JSON.parse(localStorage.getItem("data")) || [];
    if (data.length > 0) {
        data = data.filter(obj => obj["category"] === "electronics");
        displayData(data);
    } else {
        output.innerHTML = "No Data Available";
    }
}
filterData1.onclick = () => {
    let data = JSON.parse(localStorage.getItem("data")) || [];
    if (data.length > 0) {
        data = data.filter(obj => obj["category"] ===  "women's clothing");
        displayData(data);
    } else {
        output.innerHTML = "No Data Available";
    }
}
 filterData2.onclick = () => {
    let data = JSON.parse(localStorage.getItem("data")) || [];
    if (data.length > 0) {
        data = data.filter(obj => obj["category"] === "men's clothing");
        displayData(data);
    } else {
        output.innerHTML = "No Data Available";
    }
}
filterData3.onclick = () => {
    let data = JSON.parse(localStorage.getItem("data")) || [];
    if (data.length > 0) {
        data = data.filter(obj => obj["category"] ===  "jewellery");
        displayData(data);
    } else {
        output.innerHTML = "No Data Available";
    }
}
function displayData(data) {
    output.innerHTML = "";
    data.forEach((obj, index) => {
        let information = document.createElement("div");
        information.className = "cards"
        information.innerHTML =
            `<p><b>Id : </b>${obj["id"]}</p>
            <p><b>Title : </b>${obj["title"]}</p>
            <p><b>Price : </b>${obj["price"]}</p>
            <p><b>Description : </b>${obj["description"]}</p>
            <p><b>Category : </b>${obj["category"]}</p>`;

        let deletebtn = document.createElement("button");
        deletebtn.innerText = "Delete";

        deletebtn.onclick = () => {
            deleteData(index);
        }                   

        let seeMorebtn = document.createElement("button");
                seeMorebtn.innerText = "See More";
                seeMorebtn.onclick = () => {
                    openSeeMoreWindow(obj);
                };

                information.appendChild(deletebtn);
                information.appendChild(seeMorebtn);
                output.appendChild(information);
    });
}
function deleteData(index) {
    let data = JSON.parse(localStorage.getItem("data"));
    data.splice(index, 1);
    localStorage.setItem("data", JSON.stringify(data));
    displayData(data);
}
function openSeeMoreWindow(somedata) {
            const newWindow = window.open("", "_practice", "width=800,height=800");
            newWindow.document.write(`
             <h1>${somedata.title}</h1>
              <img src="${somedata.image}" alt="${somedata.title}" style="max-width: 30%; height: auto;">
                    <p><b>Price:</b> $${somedata.price}</p>
                    <button onclick="window.close()">Close</button>`);
                    newWindow.document.close();
}
window.onload = () => {
    let data = JSON.parse(localStorage.getItem("data")) || [];
    if (data.length > 0) {
        displayData(data);
    } else {
        output.innerHTML = "No Data Available";
    }
}