var tl = gsap.timeline();
gsap.registerPlugin(TextPlugin);
gsap.to(".display-1", {
  duration: 2,
  text: "CREW DRAGON <br> DEMO-2",
  delay: 0.5,
});
function start() {
  tl.to("#dragon", {
    xPercent: -50,
    left: "50%",
    duration: 1,
  }).to("#dragon", {
    yPercent: -50,
    top: "50%",
    height: 400,
    duration: 1.5,
  });

  gsap.to(".content_1", { rotation: 0, opacity: 0, duration: 2 });
}
