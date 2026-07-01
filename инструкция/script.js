const themeToggle = document.querySelector("#theme-toggle");
const getStoredTheme = () => {
  try {
    return localStorage.getItem("site-theme");
  } catch {
    return null;
  }
};
const setStoredTheme = (theme) => {
  try {
    localStorage.setItem("site-theme", theme);
  } catch {
    return;
  }
};
const storedTheme = getStoredTheme();
const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const initialTheme = storedTheme || (systemPrefersDark ? "dark" : "light");

const applyTheme = (theme) => {
  const isDark = theme === "dark";

  document.documentElement.dataset.theme = theme;

  if (themeToggle) {
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.setAttribute("aria-label", isDark ? "Включить светлую тему" : "Включить темную тему");
  }
};

applyTheme(initialTheme);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";

    setStoredTheme(nextTheme);
    applyTheme(nextTheme);
  });
}

const steps = Array.from(document.querySelectorAll(".step"));
const progressLabel = document.querySelector("#progress-label");
const progressTitle = document.querySelector("#progress-title");
const progressBar = document.querySelector("#progress-bar");

if (steps.length && progressLabel && progressTitle && progressBar) {
  const totalSteps = steps.length;
  let activeIndex = -1;

  progressBar.setAttribute("aria-valuemax", String(totalSteps));

  const getStepTitle = (step) => {
    const heading = step.querySelector("h2");
    return heading ? heading.textContent.replace(/^\s*\d+\s*/, "").trim() : "";
  };

  const updateProgress = (nextIndex) => {
    const safeIndex = Math.min(Math.max(nextIndex, 0), totalSteps - 1);

    if (safeIndex === activeIndex) {
      return;
    }

    activeIndex = safeIndex;
    const currentStep = activeIndex + 1;
    const label = `Шаг ${currentStep} из ${totalSteps}`;
    const percent = (currentStep / totalSteps) * 100;

    steps.forEach((step, index) => {
      step.classList.toggle("is-active", index === activeIndex);
    });

    progressLabel.textContent = label;
    progressTitle.textContent = getStepTitle(steps[activeIndex]);
    progressBar.style.width = `${percent}%`;
    progressBar.setAttribute("aria-valuenow", String(currentStep));
    progressBar.setAttribute("aria-valuetext", label);
  };

  const findActiveStep = () => {
    const viewportAnchor = window.innerHeight * 0.35;
    let nextIndex = 0;

    steps.forEach((step, index) => {
      const rect = step.getBoundingClientRect();

      if (rect.top <= viewportAnchor) {
        nextIndex = index;
      }
    });

    updateProgress(nextIndex);
  };

  findActiveStep();
  window.addEventListener("scroll", findActiveStep, { passive: true });
  window.addEventListener("resize", findActiveStep);
}

const screenshotImages = Array.from(document.querySelectorAll(".screenshot img"));
const imageModal = document.querySelector("#image-modal");
const modalImage = document.querySelector(".image-modal-img");
const modalCaption = document.querySelector(".image-modal-caption");
const modalClose = document.querySelector(".image-modal-close");

if (screenshotImages.length && imageModal && modalImage && modalCaption && modalClose) {
  const closeModal = () => {
    imageModal.classList.remove("is-open");
    imageModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    modalImage.src = "";
    modalImage.alt = "";
    modalCaption.textContent = "";
  };

  const openModal = (image) => {
    const caption = image.closest(".screenshot")?.querySelector(".screenshot-caption")?.textContent || image.alt;

    modalImage.src = image.currentSrc || image.src;
    modalImage.alt = image.alt;
    modalCaption.textContent = caption;
    imageModal.classList.add("is-open");
    imageModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    modalClose.focus();
  };

  screenshotImages.forEach((image) => {
    image.setAttribute("tabindex", "0");

    image.addEventListener("click", () => {
      openModal(image);
    });

    image.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openModal(image);
      }
    });
  });

  modalClose.addEventListener("click", closeModal);

  imageModal.addEventListener("click", (event) => {
    if (event.target === imageModal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && imageModal.classList.contains("is-open")) {
      closeModal();
    }
  });
}
