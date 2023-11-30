const rootDiv = document.getElementById("root");

const fetchGuests = async () => {
  const response = await fetch("http://localhost/cgi-bin/index.pl");
  const data = await response.json();
  console.log(data);
};
