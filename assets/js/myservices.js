const table = document.querySelector('.my-servcies-table'),
    tbody = table.querySelector('tbody'),
    getMyServices = async () => {
            try {
                
                makeSpinner()
                const response = await fetch(`${apiBaseUrl}api/vendors/getServiceByVendorId/${user.userId}`, {
                    method: 'GET', // *GET, POST, PUT, DELETE, etc.
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': await user.token
                    } // body data type must match "Content-Type" header
                });
                // debugger
                if (response.status === 201 || response.status === 200) {
                    
                    removeSpinner()
                    return response.json();
                } else {
                    throw "an error occurred";
                }
            } catch (ex) {
                toastnotification("Error", ex.message);
                
                removeSpinner()
            }

        },
    populateTable = async () => {
        debugger
            const myservices = await getMyServices();
            tbody.textContent = "";
            myservices.service.forEach((val, index) => {
                const td1 = document.createElement("td"),
                    td2 = td1.cloneNode(),
                    td3 = td1.cloneNode(),
                    td4 = td1.cloneNode(),
                    td5 = td1.cloneNode(),
                    td6 = td1.cloneNode(),
                    tr = document.createElement("tr"),
                    editbutton = document.createElement("a"),
                    deactivatebutton = document.createElement("button"),
                    activatebutton = deactivatebutton.cloneNode();
                deactivatebutton.type = 'button';
                activatebutton.type = 'button';
                deactivatebutton.classList.add("btn", "btn-danger", "m-1");
                activatebutton.classList.add("btn", "btn-success", "m-1");
                editbutton.classList.add("btn", "btn-primary", "m-1");
                deactivatebutton.addEventListener("click", async () => {
                    const response = await deactivateService(val._id)
                    if (response) {
                        toastnotification("Success", "Deactivated successfully");
                        await populateTable();
                    }
                })
                activatebutton.addEventListener("click", async () => {
                    const response = await activateService(val._id)
                    if (response) {
                        toastnotification("Success", "Activated successfully");
                        await populateTable();
                    }
                })
                td1.textContent = index + 1;
                tr.appendChild(td1);
                td2.textContent = val.title;
                tr.appendChild(td2);
                td3.textContent = val.price;
                tr.appendChild(td3);
                td4.textContent = val.serviceType;
                tr.appendChild(td4);
                td5.textContent = val.createdAt;
                tr.appendChild(td5);
                deactivatebutton.textContent = "Deactivate";
                activatebutton.textContent = "Activate";
                editbutton.href = `createservice.html?userid=${user.userId}&serviceid=${val._id}`;
                editbutton.textContent = "Edit"
                val.active ? td6.appendChild(editbutton) : "";
                td6.appendChild(val.active ? deactivatebutton : activatebutton);
                tr.appendChild(td6);
                tbody.appendChild(tr);

            })
        },
        deactivateService = async (serviceid) => {
            try {
                
                makeSpinner()
                const conf = confirm("Are you sure you want to delete?");
                if (conf) {
                    const response = await fetch(`${apiBaseUrl}api/vendors/deleteService/${serviceid}`, {
                        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
                        headers: {
                            'Content-Type': 'application/json',
                            'x-access-token': await user.token
                        }
                    });
                    if (response.status === 201) {
                        
                    removeSpinner()
                        return response.json()
                    }
                    throw "Error in fetching"
    
                }
            } catch (ex) {
                toastnotification("Error", ex.message);
                // console.error(ex);
                
                removeSpinner()
            }
        },
        activateService = async (serviceid) => {
            try {
                
                makeSpinner()
                const conf = confirm("Are you sure you want to activate?");
                if (conf) {
                    const response = await fetch(`${apiBaseUrl}api/vendors/activateService/${serviceid}`, {
                        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
                        headers: {
                            'Content-Type': 'application/json',
                            'x-access-token': await user.token
                        }
                    });
                    if (response.status === 201) {
                        
                    removeSpinner()
                        return response.json()
                    }
                    throw "Error in fetching"
    
                }
            } catch (ex) {
                toastnotification("Error", message);
                // console.error(ex);
                
                removeSpinner()
            }
        }

populateTable()