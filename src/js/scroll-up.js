function scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }

const scrollToTopButton = document.getElementById("scrollToTopButton");
scrollToTopButton.style.display = "none";

window.addEventListener("scroll", () => {
            if (window.scrollY >= 50) {
                scrollToTopButton.style.display = "block";
            } else {
                scrollToTopButton.style.display = "none";
            }
        });

scrollToTopButton.addEventListener("click", scrollToTop);