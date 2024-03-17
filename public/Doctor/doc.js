const toggleMenu = document.getElementById("menuToggle");
const sideMenu = document.getElementById("sideMenu");
const content = document.querySelector(".content");
const bars = document.querySelectorAll(".bar");
const menuItems = document.querySelectorAll(".menu-items .item");

toggleMenu.addEventListener("click", () => {
  sideMenu.classList.toggle("resize");
  content.classList.toggle("resize");
  toggleMenu.classList.toggle("active");

  bars.forEach((bar) => {
    bar.classList.add("anim-bar");
    setTimeout(() => {
      bar.classList.remove("anim-bar");
    }, 1000);
  });
});
setTimeout(() => {
  sideMenu.classList.add("resize");
  content.classList.add("resize");
  toggleMenu.classList.add("active");
  bar.classList.add("anim-bar");
}, 1000);

menuItems.forEach(function (item) {
  item.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the default link behavior

    menuItems.forEach(function (item) {
      item.classList.remove("active");
    });

    this.classList.add("active");
  });
});
