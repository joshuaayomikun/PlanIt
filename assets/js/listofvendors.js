const vendortable = document.querySelector('.vendor-table'),
    vendortablebody = document.querySelector('tbody'),
        makeVendorTBody = async () => {
            const {
                vendors
            } = await getVendors();

            vendors.forEach((data) => {
                const tr = document.createElement("tr"),
                    tdName = document.createElement("td"),
                    tdEmail = tdName.cloneNode(),
                    tdCompanyName = tdName.cloneNode(),
                    tdServiceTypes = tdName.cloneNode(),
                    tdStatus = tdName.cloneNode(),
                    tdAction = tdName.cloneNode(),
                    deactivate = document.createElement("a"),
                    activate = deactivate.cloneNode(),
                    signinasvendor = deactivate.cloneNode(),
                    body = {userId: data._id, role: 'vendor'};
                deactivate.textContent = "Deactivate";
                activate.textContent = "Activate";
                signinasvendor.textContent = "Sign in as user";
                deactivate.classList.add("btn", "btn-danger", "text-white", "mx-1")
                signinasvendor.classList.add("btn", "btn-primary", "text-white", "mx-1")
                activate.classList.add("btn", "btn-success", "text-white", "mx-1")
                tdName.textContent = data.name;
                tdEmail.textContent = data.email
                tdCompanyName.textContent = data.companyName;
                tdServiceTypes.textContent = data.services.split(",").join(", ");
                tdStatus.textContent = data.active ? "Active" : "Not Active";
                signinasvendor.addEventListener('click', async (e) => await signInAsVendor(e, body));
                tdAction.appendChild(data.active?deactivate:activate);
                tdAction.appendChild(signinasvendor);
                tr.appendChild(tdName);
                tr.appendChild(tdEmail);
                tr.appendChild(tdCompanyName);
                tr.appendChild(tdServiceTypes);
                tr.appendChild(tdStatus);
                tr.appendChild(tdAction);
                vendortablebody.appendChild(tr);
            });


        },
        signInAsVendor = async (e, body) => {
            try{
                e.preventDefault();
                // debugger
                const user = await signinAsAnyUser(body);
                // if(typeof)
                saveuserInfo(user);
                window.location.href = switchDashboard(user.role)

            } catch(ex) {
                toastnotification("error", ex);
            }

        }

makeVendorTBody();