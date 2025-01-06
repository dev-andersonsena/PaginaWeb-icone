document.addEventListener('DOMContentLoaded', () => {
    const marquee = document.getElementById('marquee');
    const width = marquee.offsetWidth;
    marquee.style.animation = `marquee ${width / 100}s linear infinite`;
  });