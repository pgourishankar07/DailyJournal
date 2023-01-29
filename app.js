const express = require("express");
const bp = require("body-parser");
const ejs = require("ejs");
const { urlencoded } = require("body-parser");
const _ = require("lodash");          //for getting parameters in the search box without any hypene for extra(see lodash documentation on lowercase function)
const homeContent =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia praesentium quae impedit culpa earum corporis, necessitatibus, incidunt recusandae architecto repellat, autem porro aliquid quibusdam qui facilis. Odit sequi rerum nulla, quisquam cumque necessitatibus aliquam maxime a consequuntur quod illum eveniet, ut sit quaerat non nihil quis dicta qui perspiciatis neque deleniti reiciendis nesciunt, dolores debitis! Asperiores nulla reprehenderit quis unde eligendi similique odit ullam ex fugiat. Aliquid neque eligendi earum? Reiciendis non ad eveniet sapiente vitae delectus laboriosam doloremque dolores suscipit nemo, voluptates quo voluptatum facere minus dolorem maiores vel. Commodi nisi sunt, vero iste saepe possimus. Architecto, amet quae.";
const aboutContent =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, nulla. Fuga, tempora odit? Quo nesciunt tenetur molestiae aut excepturi dignissimos praesentium impedit maxime libero esse sint dolore nihil beatae, quaerat non perspiciatis accusamus fugiat odio, modi quidem aperiam numquam iste. Aut facere magni quam eos unde modi veniam, saepe labore.";
const contactContent =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, nulla. Fuga, tempora odit? Quo nesciunt tenetur molestiae aut excepturi dignissimos praesentium impedit maxime libero esse sint dolore nihil beatae, quaerat non perspiciatis accusamus fugiat odio, modi quidem aperiam numquam iste. Aut facere magni quam eos unde modi veniam, saepe labore.";

const app = express();
app.set("view engine", "ejs");
app.use(bp.urlencoded({ extended: true })); //This line is used to parse the incoming request bodies in a middleware before the handlers, available under the req.body property. The option extended: true allows to use the more powerful qs library for parsing the data.
app.use(express.static("public"));

let allPost =[]

app.get("/", (req, res) => {
  res.render("home", { heading: "Home", content: homeContent ,allPosts : allPost});
});

app.get("/about", (req, res) => {
  res.render("about", { heading: "About", content: aboutContent });
});
app.get("/contact", (req, res) => {
  res.render("contact", { heading: "Contact", content: contactContent });
});

app.get("/compose", (req, res) => {
  res.render("compose", { heading: "Compose", content: contactContent });
});
app.post("/compose", (req, res) => {
  const obj = {
    title : req.body.t,
    content : req.body.p
  };
  allPost.push(obj);
  res.redirect("/");

})

app.get("/posts/:page",(req,res)=>{
  let path = _.lowerCase(req.params.page);            //_.lowerCase('first-day') = first day
  for (let i = 0; i < allPost.length; i++) {
    if (path == _.lowerCase(allPost[i].title)) {     //_.lowerCase('First day') = first day
      res.render("post",{heading: allPost[i].title, content:allPost[i].content})
    }
  }
})


app.listen(3000, () => {
  console.log("Server has started");
})
