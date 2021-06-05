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
// db.collection("cafes")
//   .get()
//   .then((snapshot) => {
//     snapshot.docs.forEach((doc) => {
//       //passing the above function
//       renderCafe(doc);
//     });
//   });
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
// //lesson 6 making queries
// //this can be used to get only the best score
// //instead of "==" we can use "<" or ">" too and for "london", a number like 0, 5, 1000 etc.
// db.collection("cafes")
//   .where("city", "==", "london")
//   .get()
//   .then((snapshot) => {
//     snapshot.docs.forEach((doc) => {
//       //passing the above function
//       renderCafe(doc);
//     });
//   });

//lesson 7 Ordering data
//orders alphabetically with orderBy
// db.collection("cafes")
//   .orderBy("city")
//   .get()
//   .then((snapshot) => {
//     snapshot.docs.forEach((doc) => {
//       //passing the above function
//       renderCafe(doc);
//     });
//   });
//lesson 8 Real-time data
//real-time listener
db.collection("cafes")
  .orderBy("city")
  .onSnapshot((snapshot) => {
    let changes = snapshot.docChanges();
    changes.forEach((change) => {
      if (change.type == "added") {
        renderCafe(change.doc);
      } else if (change.type == "removed") {
        let li = cafeList.querySelector("[data-id=" + change.doc.id + "]");
        cafeList.removeChild(li);
      }
    });
  });
//lesson 9 updating data
//I got the id of dubliners by inspecting it
db.collection("cafes").doc("0v6WRMcBJ7lEVG1LIEmJ").update({
  name: "Wairo World",
});
//this one completely overrides  the whole document
db.collection("cafes").doc("0v6WRMcBJ7lEVG1LIEmJ").set({
  name: "Wairo earth",
  city: "liverpool",
});
//I think the first one, update, would be more useful for me
