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
      console.log(err.response);
    });
  if (resp) {
    console.log(resp);
  }

  //get method
  let div = document.querySelector(".contain");

  let result = await axios.get("/backend/show");
  console.log(result.data);
  let image1 = result.data.records;
  console.log(image1);

  for (let imgg of image1) {
    let con = ` <h1>${imgg.name}</h1>
    <img src='${imgg.image}'/>`;

    div.innerHTML += con;
  }
  console.log(result);
});
