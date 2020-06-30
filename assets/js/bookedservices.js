const bookingstable = document.querySelector(".bookings-table"),
    bookingstabletbody = bookingstable.querySelector('tbody'),
    getMyBookingss = async () => {
            try {

                makeSpinner()
                const response = await fetch(`${apiBaseUrl}api/getBookingsByVendorId/${user.userId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': user.token
                    }
                });
                if (response.status === 201 || response.status === 200) {
                    removeSpinner()
                    return response.json();
                } else
                    throw "An error Ocurred";
            } catch (ex) {
                // console.log(ex);
                toastnotification("error", ex);

                removeSpinner()
            }

        },
        populateTable = async () => {
            try{
                const allbookings = await getMyBookingss();
                console.log(allbookings);
                if(typeof allbookings !== "undefined") {
                    bookingstabletbody.textContent = "";
                    allbookings.bookingdetails.forEach((booking, index) => {
                        const tr = document.createElement("tr"),
                            tdSN = document.createElement("td"),
                            tdCustomerName = tdSN.cloneNode(),
                            tdCustomerEmail = tdSN.cloneNode(),
                            tdCustomerPhone = tdSN.cloneNode(),
                            tdService = tdSN.cloneNode(),
                            tdServiceType = tdSN.cloneNode(),
                            tdDateNeeded = tdSN.cloneNode(),
                            tdBookingDate = tdSN.cloneNode(),
                            tdAccepted = tdSN.cloneNode(),
                            accept = document.createElement("button");

                        tdSN.textContent = index + 1;
                        tdCustomerName.textContent = booking.name;
                        tdCustomerEmail.textContent = booking.email;
                        tdCustomerPhone.textContent = booking.phone;
                        tdService.textContent = booking.service.title;
                        tdServiceType.textContent = booking.service.serviceType;
                        tdDateNeeded.textContent = booking.dateNeeded;
                        tdBookingDate.textContent = booking.createdAt;
                        tdAccepted.textContent = booking.accepted;
                        accept.textContent = "Accept Booking"

                        accept.classList.add("btn", "btn-success")

                        accept.addEventListener('click', async (e) =>{
                            const result = await acceptBooking(booking._id);
                            if(typeof result !== "undefined"){
                                toastnotification("success", result.message)
                                populateTable();
                                return;
                            } else throw "An error occured"
                        });

                        tr.appendChild(tdSN)
                        tr.appendChild(tdCustomerName)
                        tr.appendChild(tdCustomerEmail)
                        tr.appendChild(tdCustomerPhone)
                        tr.appendChild(tdService)
                        tr.appendChild(tdServiceType)
                        tr.appendChild(tdDateNeeded)
                        tr.appendChild(tdBookingDate)
                        tr.appendChild(tdAccepted)
                        booking.accepted?"":tr.appendChild(accept)
                        bookingstabletbody.appendChild(tr)
                    })
                }
            } catch (ex) {
                toastnotification("error", ex);
            }
        },
        acceptBooking = async (bookingId) => {
            try{
                makeSpinner();
                const response = await fetch(`${apiBaseUrl}acceptBookingByBookingId/${bookingId}`, {
                    headers: { 'x-access-token': user.token  }
                });
                if (response.status === 201 || response.status === 200) {
                    removeSpinner()
                    return response.json();
                } else
                    throw "An error Ocurred";
            } catch (ex) {
                removeSpinner();
                toastnotification("error", ex);
            }
        };
populateTable();