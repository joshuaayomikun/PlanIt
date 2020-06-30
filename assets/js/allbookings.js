const bookingstable = document.querySelector(".bookings-table"),
bookingstabletbody = bookingstable.querySelector('tbody'),
    getAllBookingss = async () => {
        try {
            
            makeSpinner()
            const response = await fetch(`${apiBaseUrl}api/getAllBookings`, {
                headers: { 'Content-Type': 'application/json',  'x-access-token' : user.token }
            });
            if(response.status === 201 || response.status === 200){
                
                removeSpinner()
                return response.json();
            }
            else
                throw "An error Ocurred";
        } catch (ex) {
            // console.log(ex);
            toastnotification("error", ex);
            
            removeSpinner()
        }

    },
    populateTable = async () => {
        const allbookings =  await getAllBookingss();
        console.log(allbookings);
        allbookings.bookingdetails.forEach((booking, index) => {
            const tr = document.createElement("tr"),
            tdSN = document.createElement("td"),
            tdCustomerName = tdSN.cloneNode(),
            tdCustomerEmail = tdSN.cloneNode(),
            tdCustomerPhone = tdSN.cloneNode(),
            tdService = tdSN.cloneNode(),
            tdServiceType = tdSN.cloneNode(),
            tdVendorName = tdSN.cloneNode(),
            tdVendorCompany = tdSN.cloneNode(),
            tdVendorEmail = tdSN.cloneNode(),
            tdDateNeeded = tdSN.cloneNode(),
            tdBookingDate = tdSN.cloneNode(),
            tdAccepted = tdSN.cloneNode();

            tdSN.textContent = index + 1;
            tdCustomerName.textContent = booking.name;
            tdCustomerEmail.textContent = booking.email;
            tdCustomerPhone.textContent = booking.phone;
            tdService.textContent = booking.service.title;
            tdServiceType.textContent = booking.service.serviceType;
            tdVendorName.textContent = booking.vendor.name;
            tdVendorCompany.textContent = booking.vendor.companyName;
            tdVendorEmail.textContent = booking.vendor.email;
            tdDateNeeded.textContent = booking.dateNeeded;
            tdBookingDate.textContent = booking.createdAt;
            tdAccepted.textContent = booking.accepted;

            tr.appendChild(tdSN)
            tr.appendChild(tdCustomerName)
            tr.appendChild(tdCustomerEmail)
            tr.appendChild(tdCustomerPhone)
            tr.appendChild(tdService)
            tr.appendChild(tdServiceType)
            tr.appendChild(tdVendorName)
            tr.appendChild(tdVendorCompany)
            tr.appendChild(tdVendorEmail)
            tr.appendChild(tdDateNeeded)
            tr.appendChild(tdBookingDate)
            tr.appendChild(tdAccepted)
            bookingstabletbody.appendChild(tr)







        })
        // console.log({users});
        //     customers = users.filter(user => user.role.toLowerCase() === "user");
        // customers.forEach((customer, index) => {
        //     const tr = document.createElement("tr"),
        //     tdSN = document.createElement("td"),
        //     tdName = tdSN.cloneNode(),
        //     tdEmail = tdSN.cloneNode(),
        //     tdUsername = tdSN.cloneNode(),
        //     tdStatus = tdSN.cloneNode(),
        //     tdAction = tdSN.cloneNode(),
        //     deactivate = document.createElement("button"),
        //     activate = deactivate.cloneNode();
            
        //     deactivate.textContent = "Deactibate"
        //     activate.textContent = "Activate";
        //     tdSN.textContent = index + 1;
        //     tdName.textContent = customer.name;
        //     tdEmail.textContent = customer.email;
        //     tdUsername.textContent = customer.username;
        //     tdStatus.textContent = customer.active? "Active" : "Not Active";
        //     tdAction.appendChild(customer.active? deactivate : activate);


        //     activate.classList.add("btn", "btn-success");
        //     deactivate.classList.add("btn", "btn-danger");
        //     tr.appendChild(tdSN);
        //     tr.appendChild(tdName);
        //     tr.appendChild(tdEmail);
        //     tr.appendChild(tdUsername);
        //     tr.appendChild(tdStatus);
        //     tr.appendChild(tdAction);

        //     customberstabletbody.appendChild(tr);

        // })
    };
    populateTable();
    