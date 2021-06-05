const db = firebase.firestore();
//this is how we get the actual data in our firestore database
db.collection("cafes")
  .get()
  .then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      console.log(doc.data());
    });
  });

//let's grab the HTML and display the above data there

const cafeList = document.querySelector("#cafe-list");
//create element and render cafe
const renderCafe = (doc) => {
  let li = document.createElement("li");
  let name = document.createElement("span");
  let city = document.createElement("span");
  //let's create a delete cross for lesson 5
  let cross = document.createElement("div");
  cross.textContent = "x";
  li.appendChild(cross);

  li.setAttribute("data-id", doc.id);
  name.textContent = doc.data().name;
  city.textContent = doc.data().city;

  li.appendChild(name);
  li.appendChild(city);

  cafeList.appendChild(li);
  //LESSON 5 DELETING ELEMENTS
  cross.addEventListener("click", (e) => {
    //stop bubbling up
    e.stopPropagation();
    let id = e.target.parentElement.getAttribute("data-id");
    db.collection("cafes").doc(id).delete();
  });
};
//getting data
db.collection("cafes")
  .get()
  .then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      //passing the above function
      renderCafe(doc);
    });
  });
// video 4 saving data
//let's grab the form
const form = document.querySelector("#add-cafe-form");
//saving data
form.addEventListener("submit", (e) => {
  e.preventDefault();
  db.collection("cafes").add({
    name: form.name.value,
    city: form.city.value,
  });
  //to empty the input field
  form.name.value = "";
  form.city.value = "";
});
//video 5 DELETING DATA
