const table = document.querySelector('.my-servcies-table'),
    tbody = table.querySelector('tbody'),
    getMyServices = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}api/vendors/getServiceByVendorId/${user.userId}`, {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': await user.token
                } // body data type must match "Content-Type" header
            });
            // debugger
            if (response.ok) {
                return response.json();
            } else {
                throw "an error occurred";
            }
        } catch (ex) {
            toastnotification("Error", "Can't get services");
        }

    },
    populateTable = async () => {
        const myservices = await getMyServices();
        myservices.service.forEach((val, index) => {
            const td1 = document.createElement("td"),
            td2 = td1.cloneNode(),
            td3 = td1.cloneNode(),
            td4 = td1.cloneNode(),
            td5 = td1.cloneNode(),
            td6 = td1.cloneNode(),
            tr = document.createElement("tr"),
            editbutton = document.createElement("a");
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
            editbutton.href = `createservice.html?userid=${user.userId}&serviceid=${val._id}`
            editbutton.textContent="edit"
            td6.appendChild(editbutton);
            tr.appendChild(td6);
            tbody.appendChild(tr);
            
        })
    }

populateTable()