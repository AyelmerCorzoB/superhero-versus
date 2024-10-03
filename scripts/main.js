const data = fetch("../json/data.json")
.then(response => response.json())
.then(data => console.log(data))

console.log(data)