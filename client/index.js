const rootEl = document.getElementById("root");
const errorEl = document.querySelector(".errorDiv");
const attendingEl = document.getElementById("attending");

const fetchGuests = async () => {
  const response = await fetch("http://localhost/cgi-bin/index.pl");
  const data = await response.json();
  console.log(data);
};

const saveGuestData = async (event) => {
  event.preventDefault();
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const attending = document.getElementById("attending").value;
  const numberOfAttendees = document.getElementById("numberOfAttendees").value;
  const dietaryRequirements = document.getElementById(
    "dietaryRequirements",
  ).value;
  const specialRequests = document.getElementById("specialRequests").value;

  const guestData = {
    first_name: firstName,
    last_name: lastName,
    attending: attending,
    number_of_attendees: numberOfAttendees,
    dietary_requirements: dietaryRequirements,
    special_requests: specialRequests,
  };

  try {
    const res = await fetch("http://localhost/cgi-bin/index.pl", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(guestData),
    });
    if (res.status === 200) {
      console.log("saved data");
    } else {
      errorEl.display = "block";
      errorEl.textContent = `HTTP error: status ${res.status}`;
    }
  } catch (err) {
    errorEl.display = "block";
    errorEl.textContent = `Could not save data: ${err}`;
  }
};

const handleChangeAttending = () => {
  if (attendingEl.value === "1") {
    document.querySelector(".guest-attending").style.display = "flex";
  } else {
    document.querySelector(".guest-attending").style.display = "none";
  }
};

if (attendingEl) {
  attendingEl.addEventListener("change", handleChangeAttending);
}

document.querySelector(".submit-btn").addEventListener("click", saveGuestData);
