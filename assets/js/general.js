
const userstring = window.localStorage.getItem("user");
const user = typeof userstring !== 'undefined' ? JSON.parse(userstring): "";
const toastnotification = (heading, message) => {
    if(document.body.querySelector('.toast'))
    document.body.removeChild(document.body.querySelector('.toast'));
    const div = document.createElement("div"),
        toast = div.cloneNode(),
        toastheader = div.cloneNode(),
        strong = document.createElement("strong"),
        button = document.createElement("button"),
        span = document.createElement("span"),
        toastbody =div.cloneNode();
    div.setAttribute("style", "position: relative; min-height: 200px;");
    div.setAttribute("aria-live", "polite");
    div.setAttribute("aria-atomic", "true");
    toast.classList.add("toast", "shadow", "text-white");
    switch(heading.toLowerCase()) {
        case "error":
            toast.classList.add("bg-danger");
            break;
        case "success":
            toast.classList.add("bg-success");
            break;
        case "warning":
            toast.classList.add("bg-warning");
            break;
        case "info":
            toast.classList.add("bg-info");
            break;
    }
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
    strong.textContent = heading+"!";
    toastbody.innerHTML = message;
    button.appendChild(span)
    toastheader.appendChild(strong)
    toastheader.appendChild(button)
    toast.appendChild(toastheader);
    toast.appendChild(toastbody);
    document.body.appendChild(toast);
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
},
getUserInfo = async (userId) => {
    try{
        
        makeSpinner()
        if (await user) {
            const response = await fetch(`${apiBaseUrl}api/getMyInfo/${userId}`, {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                headers: { 'Content-Type': 'application/json',  'x-access-token' : await user.token}// body data type must match "Content-Type" header
            });
            // debugger
            const status = await response.status;
            // debugger
            if(response.ok || response.status === 201 || response.status === 200){
                
                removeSpinner()
                return response.json();
            }
            else if(status === 403){
                throw "invalid token";
            }else{
                throw "an error occurred";
            }
        }
        
        removeSpinner()
        return "";
    } catch(ex) {
        
        removeSpinner()
        // debugger
        signout();
        window.location.href = "../login.html"
    }

},
signout = () => {
    window.localStorage.removeItem("user");
    window.location.href = clientBaseUrl+"index.html"
},
dashboardsignout = () => {
    window.localStorage.removeItem("user");
    window.location.href = "../index.html"
},
gotomydashboard = () => {
    const userstring = window.localStorage.getItem("user");
    const user = typeof userstring !== 'undefined' ? JSON.parse(userstring): "";
    if(user){
        switch(user.role.toLowerCase()) {
            case "vendor":
                window.location.href = "vendor/";
                break;
            case "admin":
                window.location.href = "admin/"
                break;
            default:
                window.location.href = "customer/"
        }
    }
}, 
getRootUrl = () => {
    return window.location.origin
        ? window.location.origin + '/'
        : window.location.protocol + '/' + window.location.host + '/';
},
getUrlVars = () => {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
},
shuffle = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
},
makeSpinner = () => {
    const spinneroverlay = document.createElement('div'),
    spinnergrow = spinneroverlay.cloneNode(),
    readonly = document.createElement("span");

    readonly.classList.add("sr-only");
    readonly.textContent = "Loading...";
    spinnergrow.classList.add("position-fixed", "spinner-grow", "text-primary", "page-spinner");
    spinnergrow.setAttribute("role", "status");
    spinnergrow.setAttribute("style", `z-index: 10000;
    left: 50%;
    top: 50%;`);
    spinneroverlay.classList.add("spinner-overlay");
    spinneroverlay.setAttribute("style", `
    position:fixed;
    height: 100vh;
    left: 0;
    right: 0;
    z-index: 200000;
    top: 0;
    background: #0000004f;`)

    spinnergrow.appendChild(readonly);
    document.body.appendChild(spinnergrow);
    document.body.appendChild(spinneroverlay);
},
removeSpinner = () => {
    const spinneroverlay = document.querySelector(".spinner-overlay");
    const pagespinner = document.querySelector(".page-spinner");

    document.body.removeChild(spinneroverlay)
    document.body.removeChild(pagespinner)
},
clientBaseUrl = getRootUrl() ==="http://127.0.0.1:5501/"? getRootUrl() : getRootUrl()+'PlanIt/',
apiBaseUrl = clientBaseUrl ==="http://127.0.0.1:5501/" ? "http://localhost:3000/":"https://fathomless-springs-44788.herokuapp.com/";