const apiBaseUrl = "http://localhost:3000/";

const toastnotification = async (heading, message) => {
    const div = await document.createElement("div");
    const toast = await document.createElement("div");
    const toastheader = await document.createElement("div");
    const strong = await document.createElement("strong");
    const button = await document.createElement("button");
    const span = await document.createElement("span");
    const toastbody = await document.createElement("div");
    div.setAttribute("style", "position: relative; min-height: 200px;");
    div.setAttribute("aria-live", "polite");
    div.setAttribute("aria-atomic", "true");
    toast.classList.add("toast");
    toast.setAttribute("data-autohide", "false");
    toastheader.classList.add("toast-header");
    strong.classList.add("mr-auto");
    toast.setAttribute("style", "position: fixed; top: 0; right: 0; z-index:1000000");
    button.type = "button";
    button.classList.add("ml-2", "mb-1", "close");
    button.setAttribute("data-dismiss", "toast");
    button.setAttribute("aria-label", "Close");
    span.setAttribute("aria-hidden", "true");
    toastbody.classList.add("toast-body");
    span.textContent = "x";
    strong.textContent = heading;
    toastbody.innerHTML = message;
    button.appendChild(span)
    toastheader.appendChild(strong)
    toastheader.appendChild(button)
    toast.appendChild(toastheader);
    toast.appendChild(toastbody);
    document.body.appendChild(await toast);
    $(toast).toast('show')
    // <div aria-live="polite" aria-atomic="true" style="position: relative; min-height: 200px;">
    //     <div class="toast" style="position: absolute; top: 0; right: 0;">
    //         <div class="toast-header">
    //         {/* <img src="..." class="rounded mr-2" alt="..."> */}
    //         <strong class="mr-auto">Bootstrap</strong>
    //         <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
    //             <span aria-hidden="true">&times;</span>
    //         </button>
    //         </div>
    //         <div class="toast-body">
    //         Hello, world! This is a toast message.
    //         </div>
    //     </div>
    //     </div>
};

const getUserInfo = async () => {
    const userstring = await  window.localStorage.getItem("user");
    const user = typeof userstring !== 'undefined' ? JSON.parse( await userstring): "";
    if (user) {
        const response = await fetch(`${apiBaseUrl}api/getMyInfo/${user.userId}`, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: { 'Content-Type': 'application/json',  'x-access-token' : await user.token}// body data type must match "Content-Type" header
        });

        return response.json();
    }
    return "";

};