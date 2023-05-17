let backendLink = "http://localhost:4500"


let Msgbox = document.getElementById("message-box");
const messageForm = document.getElementById("send_box");
let messageinput = document.getElementById("message-input");
let messages = []

const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});

let UserName = params.UserName
let UserID = params.UserID
// if (!UserName) {
//     alert("Please login")
//     window.location.href = "login.html"
// }

// ConnectToSocket()
RenderMsgs();

//? <!--------< Socket Establish>---------------------->

async function ConnectToSocket() {
    const socket = await io(backendLink);
    socket.emit("new-user", { UserName: UserName, message: `${UserName} joined the Chat` });


    socket.on("chat-message", (data) => {
        messages.push(data);
        RenderMsgs()
    });
    socket.on("user_connected", (data) => {
        messages.push({ UserName: "", message: `${data.UserName} joined the Chat` });
        RenderMsgs()
    });
    // socket.on("user_disconnect", (data) => {
    //     messages.push({ UserName: "", message: ` ${data.UserName} is Disconnected` });
    //     RenderMsgs()
    // });
    messageForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const message = messageinput.value;
        messages.push({ UserName, message });
        RenderMsgs()
        let data = { UserName, message }
        socket.emit("send-chat-message", data);
        messageinput.value = "";
    });

}

// ?---------------------->


function RenderMsgs() {

    let data = messages.map(item => {
        return `
         <div class="${item.UserName == "" ? "CenteredMessage" : item.UserName == UserName ? "SecondUser" : "FirstUser"}">
        <p> ${item.UserName == "" ? `${item.message}` : item.UserName == UserName ? `${item.message} ` :
                `<label style="color:blue;font-weight:500"> ${item.UserName}</label> : ${item.message} `} </p>
         </div>`
    })
    Msgbox.innerHTML = data.join("")
}



let SearchPeople = document.getElementById("SearchPeople")
SearchPeople.addEventListener("input", e => {
    let search = e.target.value
    SeachPeopleQuery(search);
})
async function SeachPeopleQuery(search) {
    try {
        let res = await fetch(`${backendLink}/users?search=${search}`)
        let data = await res.json();
        RenderUsersInSearch(data.Users)
    } catch (error) {
        console.log(error)
    }
}
function RenderUsersInSearch(data) {
    let searchContainer = document.getElementById("searchContainer")
    data = data.map((item) => {
        return `
        <div class="SeachChild">
        <h4>${item.name}</h4>
        <p>${item.email}</p>
        <button data-id=${item._id}>Add to Contact 🟢</butt>

      </div>`
    })
    searchContainer.innerHTML = data.join("")

}



SeachPeopleQuery("")