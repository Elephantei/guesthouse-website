document.addEventListener("DOMContentLoaded", () => {
  const galleryGrid = document.getElementById("gallery-grid");
  const imageCount = 6; // You can increase this

  for (let i = 1; i <= imageCount; i++) {
    const link = document.createElement("a");
    link.href = `assets/image${i}.jpeg`;
    link.setAttribute("data-lightbox", "guesthouse-gallery");

    const img = document.createElement("img");
    img.src = `assets/image${i}.jpg`;
    img.alt = `Guest house photo ${i}`;

    link.appendChild(img);
    galleryGrid.appendChild(link);
  }

  // Animation on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1
  });

  const images = document.querySelectorAll('.gallery-grid img');
  images.forEach(img => observer.observe(img));
});
