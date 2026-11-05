(() => {
  const frames = document.querySelectorAll(".preview-frame");
  const updateScales = () => {
    frames.forEach((frame) => {
      const width = frame.classList.contains("phone-frame") ? 390 : 1280;
      frame.style.setProperty("--preview-scale", String(frame.clientWidth / width));
    });
  };

  updateScales();
  new ResizeObserver(updateScales).observe(document.body);
})();
