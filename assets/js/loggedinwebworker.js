onmessage = async (e) => {
    const getRootUrl = () => {
            return location.origin ?
                location.origin + '/' :
                location.protocol + '/' + location.host + '/';
        },
        clientBaseUrl = getRootUrl() === "http://127.0.0.1:5501/" ? getRootUrl() : getRootUrl() + 'PlanIt/',
    apiBaseUrl = clientBaseUrl === "http://127.0.0.1:5501/" ? "http://localhost:3000/" : "https://fathomless-springs-44788.herokuapp.com/";
    let user;
    // debugger
    user = e.data;
    if (user !== "") {
        let x = setInterval(async () => {
            const response = await fetch(`${apiBaseUrl}api/getMyInfo/${user.userId}`, {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': await user.token
                } // body data type must match "Content-Type" header
            });
            // debugger
            // debugger
            if (response.status === 201 || response.status === 200) {
                
                postMessage(JSON.stringify(await response.json()));
            
            } else {
                clearInterval(x);
                postMessage("");
            }
        }, 60000)
    }
    //console.log(e.data);
}