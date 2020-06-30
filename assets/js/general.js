const userstring = window.localStorage.getItem("user"),
    user = userstring !== null ? JSON.parse(userstring) : "",
    worker = new Worker('../assets/js/loggedinwebworker.js'),
    toastnotification = (heading, message) => {
        if (document.body.querySelector('.toast'))
            document.body.removeChild(document.body.querySelector('.toast'));
        const div = document.createElement("div"),
            toast = div.cloneNode(),
            toastheader = div.cloneNode(),
            strong = document.createElement("strong"),
            button = document.createElement("button"),
            span = document.createElement("span"),
            toastbody = div.cloneNode();
        div.setAttribute("style", "position: relative; min-height: 200px;");
        div.setAttribute("aria-live", "polite");
        div.setAttribute("aria-atomic", "true");
        toast.classList.add("toast", "shadow", "text-white");
        switch (heading.toLowerCase()) {
            case "error":
                toast.classList.remove("bg-info");
                toast.classList.remove("bg-warning");
                toast.classList.remove("bg-success");
                toast.classList.add("bg-danger");
                break;
            case "success":
                toast.classList.remove("bg-info");
                toast.classList.remove("bg-warning");
                toast.classList.add("bg-success");
                toast.classList.remove("bg-danger");
                break;
            case "warning":
                toast.classList.remove("bg-info");
                toast.classList.add("bg-warning");
                toast.classList.remove("bg-success");
                toast.classList.remove("bg-danger");
                break;
            case "info":
                toast.classList.add("bg-info");
                toast.classList.remove("bg-warning");
                toast.classList.remove("bg-success");
                toast.classList.remove("bg-danger");
                break;
        }
        toast.setAttribute("data-autohide", "false");
        toastheader.classList.add("toast-header");
        strong.classList.add("mr-auto");
        toast.setAttribute("style", "position: fixed; top: 75px; right: 75px; z-index:1000000");
        button.type = "button";
        button.classList.add("ml-2", "mb-1", "close");
        button.setAttribute("data-dismiss", "toast");
        button.setAttribute("aria-label", "Close");
        span.setAttribute("aria-hidden", "true");
        toastbody.classList.add("toast-body");
        span.textContent = "x";
        strong.textContent = heading + "!";
        toastbody.innerHTML = message;
        button.appendChild(span)
        toastheader.appendChild(strong)
        toastheader.appendChild(button)
        toast.appendChild(toastheader);
        toast.appendChild(toastbody);
        document.body.appendChild(toast);
        $(toast).toast('show')

    },
    getUserInfo = async (userId) => {
            try {

                makeSpinner()
                if (user !== "") {
                    const response = await fetch(`${apiBaseUrl}api/getMyInfo/${userId}`, {
                        method: 'GET', // *GET, POST, PUT, DELETE, etc.
                        headers: {
                            'Content-Type': 'application/json',
                            'x-access-token': await user.token
                        } // body data type must match "Content-Type" header
                    });
                    // debugger
                    const status = await response.status;
                    // debugger
                    if (response.status === 201 || response.status === 200) {

                        removeSpinner()
                        return response.json();
                    } else if (status === 403) {
                        throw "invalid token";
                    } else {
                        throw "an error occurred";
                    }
                }

                removeSpinner()
                return "";
            } catch (ex) {

                removeSpinner()
                // debugger
                signout();
                window.location.href = clientBaseUrl + "login.html";
            }

        },
        signout = () => {
            window.localStorage.removeItem("user");
            window.location.href = clientBaseUrl + "index.html"
        },
        dashboardSignout = () => {
            window.localStorage.removeItem("user");
            window.location.href = "../index.html"
        },
        gotoMyDashboard = () => {
            if (user) {
                window.location.href = switchDashboard(user.role)
            }
        },
        switchDashboard = (role) => {
            // debugger
            let roleurl = clientBaseUrl;
            if (role !== "") {
                switch (role.toLowerCase()) {
                    case "vendor":
                        roleurl += "vendor/index.html";
                        break;
                    case "admin":
                        roleurl += "admin/index.html"
                        break;
                    default:
                        roleurl += "index.html"
                }
            }

            return roleurl;
        },
        getRootUrl = () => {
            return window.location.origin ?
                window.location.origin + '/' :
                window.location.protocol + '/' + window.location.host + '/';
        },
        getUrlVars = (url = "") => {
            var vars = [],
                hash;
            var hashes = url===""? window.location.href.slice(window.location.href.indexOf('?') + 1).split('&'):url.slice(url.indexOf('?') + 1).split('&');
            for (var i = 0; i < hashes.length; i++) {
                hash = hashes[i].split('=');
                vars.push(hash[0]);
                vars[hash[0]] = hash[1];
            }
            return vars;
        },
        redirecturl = getUrlVars()['redirecturl'],
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
    top: 50%;
    
    height: 77px;
    width: 77px;
`);
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
        clientBaseUrl = getRootUrl() === "http://127.0.0.1:5501/" ? getRootUrl() : getRootUrl() + 'PlanIt/',
        apiBaseUrl = clientBaseUrl === "http://127.0.0.1:5501/" ? "http://localhost:3000/" : "https://fathomless-springs-44788.herokuapp.com/",
        saveuserInfo = (user) => window.localStorage.setItem("user", JSON.stringify(user));
if (user !== "") {
    let userstringa = window.localStorage.getItem("user"),
        usera = userstringa !== null ? JSON.parse(userstringa) : ""
    worker.postMessage(usera);
    worker.onmessage = async (e) => {
        
        usera = await e.data;
        // debugger
        if (usera === "") {
            worker.terminate();
            alert("You are logged out");
        }
        usera = JSON.parse(usera);
        if (typeof usera.user === "undefined") {
            worker.terminate();
            alert("You are logged out");
            signout();
        }
        const token = usera.token
        usera = usera.user;
        usera['userId'] = usera._id;
        usera['token'] = token;
        saveuserInfo(usera);
        userstringa = window.localStorage.getItem("user");
        usera = userstringa !== null ? JSON.parse(userstringa) : "";
        worker.postMessage(usera);

    };
}


setTimeout(function () {
    feather.replace()
}, 1)