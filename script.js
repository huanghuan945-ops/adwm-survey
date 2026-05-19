const filterButtons = document.querySelectorAll(".filter-button");
const methodRows = document.querySelectorAll(".method-table tbody tr");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    methodRows.forEach((row) => {
      const shouldShow = filter === "all" || row.dataset.role === filter;
      row.classList.toggle("is-hidden", !shouldShow);
    });
  });
});

const navLinks = [...document.querySelectorAll(".nav-links a")];
const observedSections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      const id = `#${entry.target.id}`;
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === id);
      });
    });
  },
  {
    rootMargin: "-35% 0px -55% 0px",
    threshold: 0.01,
  }
);

observedSections.forEach((section) => sectionObserver.observe(section));

const copyButton = document.querySelector("[data-copy-target]");

if (copyButton) {
  copyButton.addEventListener("click", async () => {
    const target = document.querySelector(copyButton.dataset.copyTarget);

    if (!target) {
      return;
    }

    try {
      await navigator.clipboard.writeText(target.textContent.trim());
      copyButton.textContent = "Copied";
      copyButton.classList.add("copied");
      window.setTimeout(() => {
        copyButton.textContent = "Copy BibTeX";
        copyButton.classList.remove("copied");
      }, 1600);
    } catch (error) {
      copyButton.textContent = "Select BibTeX";
      copyButton.classList.remove("copied");
    }
  });
}
