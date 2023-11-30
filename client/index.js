const rootDivEl = document.getElementById("root");
const attendingEl = document.getElementById("attending");

const fetchGuests = async () => {
  const response = await fetch("http://localhost/cgi-bin/index.pl");
  const data = await response.json();
  console.log(data);
};

const handleChangeAttending = () => {
  if (attendingEl.value === "Yes") {
    document;
  }
};

document.addEventListener("change");
