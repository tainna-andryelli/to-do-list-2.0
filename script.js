function colorMode() {
  const dark = document.getElementById("dark");
  const html = document.documentElement;
  const light = document.getElementById("light");

  dark.addEventListener("click", () => {
    html.classList.add("dark-mode");
    html.classList.remove("light-mode");
    dark.style.display = "none";
    light.style.display = "inline-block";
  });

  light.addEventListener("click", () => {
    html.classList.remove("dark-mode");
    html.classList.add("light-mode");
    light.style.display = "none";
    dark.style.display = "inline-block";
  });
}

colorMode();

function activeSearch() {
  const buttonSearch = document.querySelector(".search");
  const inputSearch = document.querySelector(".input-search");

  buttonSearch.addEventListener("click", () => {
    inputSearch.classList.toggle("active");
  });
}

activeSearch();
