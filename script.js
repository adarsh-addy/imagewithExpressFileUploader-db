let btn = document.querySelector(".btn1");

btn.addEventListener("click", async function (e) {
  e.preventDefault();
  // alert("hi");

  //post method
  let form = document.querySelector("form");
  const formData = new FormData(form); //wrapping all the data of '-form-' in the form of object

  let resp = await axios
    .post("/backend/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .catch((err) => {
      console.log(err.response.data);
      // alert(err.response.data)
      let div = document.querySelector(".contain");
      div.innerHTML = "";
      div.innerHTML = `<h1>No Data</h1>`;
    });
  if (resp) {
    console.log(resp.data);
    // alert(resp.data.message)

    //get method
    let div = document.querySelector(".contain");
    div.innerHTML = "";
    let result = await axios.get("/backend/show");
    // console.log(result.data);
    let image1 = result.data.records;
    console.log(image1);

    for (let imgg of image1) {
      let con = `<div class="card text-center mt-3 border border-primary">
    <div class="card-body">
      <img src='${imgg.image}'  class="card-img-top img-fluid" />
      
    </div>
    <div class="card-footer border-T border-dark">
    <h1 class="display-5 font-monospace">${imgg.name}</h1>
  </div>
  </div> `;

      div.innerHTML += con;
    }
    console.log(result);
  }
});
