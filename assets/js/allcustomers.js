const customerstable = document.querySelector(".vendor-table"),
    customberstabletbody = customerstable.querySelector('tbody'),
    getAllUsers = async () => {
        try {
            
            makeSpinner()
            const response = await fetch(`${apiBaseUrl}api/getAllUsers`, {
                headers: { 'Content-Type': 'application/json',  'x-access-token' : user.token }
            });
            if(response.ok || response.status === 201 || response.status === 200){
                
                removeSpinner()
                return response.json();
            }
            else
                throw "An error Ocurred";
        } catch (ex) {
            // console.log(ex);
            toastnotification("error", ex.message);
            
            removeSpinner()
        }

    },
    populateTabe = async () => {
        const {users} =  await getAllUsers(),
            customers = users.filter(user => user.role.toLowerCase() === "user");
        customers.forEach((customer, index) => {
            const tr = document.createElement("tr"),
            tdSN = document.createElement("td"),
            tdName = tdSN.cloneNode(),
            tdEmail = tdSN.cloneNode(),
            tdUsername = tdSN.cloneNode(),
            tdStatus = tdSN.cloneNode(),
            tdAction = tdSN.cloneNode(),
            deactivate = document.createElement("button"),
            activate = deactivate.cloneNode();
            
            deactivate.textContent = "Deactibate"
            activate.textContent = "Activate";
            tdSN.textContent = index + 1;
            tdName.textContent = customer.name;
            tdEmail.textContent = customer.email;
            tdUsername.textContent = customer.username;
            tdStatus.textContent = customer.active? "Active" : "Not Active";
            tdAction.appendChild(customer.active? deactivate : activate);


            activate.classList.add("btn", "btn-success");
            deactivate.classList.add("btn", "btn-danger");
            tr.appendChild(tdSN);
            tr.appendChild(tdName);
            tr.appendChild(tdEmail);
            tr.appendChild(tdUsername);
            tr.appendChild(tdStatus);
            tr.appendChild(tdAction);

            customberstabletbody.appendChild(tr);

        })
    };
    populateTabe();
    