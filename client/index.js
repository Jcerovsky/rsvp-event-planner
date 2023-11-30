const rootDivEl = document.getElementById("root");
const attendingEl = document.getElementById("attending");

const fetchGuests = async () => {
  const response = await fetch("http://localhost/cgi-bin/index.pl");
  const data = await response.json();
  console.log(data);
};
console.log("fired");

const handleChangeAttending = () => {
  console.log("fired");
  if (attendingEl.value === "1") {
    document.querySelector(".guest-attending").style.display = "flex";
  }
};

if (attendingEl) {
  attendingEl.addEventListener("change", handleChangeAttending);
}
