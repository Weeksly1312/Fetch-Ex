const url = "/arkx";
fetch(url)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json(); // Parse response data as JSON
  })
  .then((data) => {
    const newData = [];
    for (const value of data) {
      newData.push(value);
    }
    const cards = document.querySelector(".cards");
    newData.forEach((chunk) => {
      const newDiv = document.createElement("div");
      newDiv.classList.add("card");
      newDiv.innerHTML = `<div class="card-info">
      <div class="card-avatar"></div>
      <div class="card-title">${chunk.name}</div>
      <div class="card-subtitle">${chunk.co} - ${chunk.ville} - ${chunk.age}Y/O</div>
    </div>
    <ul class="card-social">
      <li class="card-social__item">${chunk.skills[0]}</li>
      <li class="card-social__item">${chunk.skills[1]}</li>
      <li class="card-social__item">${chunk.skills[2]}</li>
    </ul>`;

      cards.appendChild(newDiv);
    });
    /* <div class="card">
          
        </div> */
  })
  .catch((err) => {
    console.error(err);
  });
