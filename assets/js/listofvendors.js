const vendortable = document.querySelector('.vendor-table'),
    vendortablebody = document.querySelector('tbody'),
        makeVendorTBody = async () => {
            const {
                vendors
            } = await getVendors();

            vendors.forEach((data) => {
                const tr = document.createElement("tr"),
                    tdName = document.createElement("td"),
                    tdCompanyName = tdName.cloneNode(),
                    tdServiceTypes = tdName.cloneNode(),
                    tdStatus = tdName.cloneNode(),
                    tdAction = tdName.cloneNode(),
                    deactivate = document.createElement("a"),
                    activate = deactivate.cloneNode();
                deactivate.textContent = "Deactivate";
                activate.textContent = "Activate";
                deactivate.classList.add("btn", "btn-danger", "text-white")
                activate.classList.add("btn", "btn-success", "text-white")
                tdName.textContent = data.name;
                tdCompanyName.textContent = data.companyName;
                tdServiceTypes.textContent = data.services.split(",").join(", ");
                tdStatus.textContent = data.active ? "Active" : "Not Active";
                
                tdAction.appendChild(data.active?deactivate:activate);
                tr.appendChild(tdName);
                tr.appendChild(tdCompanyName);
                tr.appendChild(tdServiceTypes);
                tr.appendChild(tdStatus);
                tr.appendChild(tdAction);
                vendortablebody.appendChild(tr);
            });


        }

makeVendorTBody();