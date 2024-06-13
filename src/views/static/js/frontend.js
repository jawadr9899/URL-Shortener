const el = document.getElementById("main_f");
const btn = document.getElementById("clear_urls");
const enteredLink = document.getElementById("_link").value.trim();
const URL = "http://localhost:3000/api/";


btn.addEventListener("click", async function (e) {
  try {

    e.preventDefault();
    const resp = await fetch(URL, {
      method: "DELETE",
      credentials: "include",
    });
    resp
      .json()
      .then((data) => {
        if (data.ok) {
          location.reload();
        }
      })
      .catch((e) => console.error(e));
  } catch (error) {
    console.log(error);
  }
});
