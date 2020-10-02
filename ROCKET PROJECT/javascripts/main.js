var tl = gsap.timeline();
gsap.registerPlugin(TextPlugin);
tl.to(".display-1", {
  duration: 2,
  text: "CREW DRAGON <br> DEMO-2",
  delay: 0.5,
}).to(".start", {
  opacity: 1,
  duration: 1,
});
function start() {
  gsap.to("#bg", { yPercent: 100, duration: 3 });
  tl.to("#dragon", {
    left: "770px",
    duration: 1,
    yPercent: -50,
    top: "430px",
    height: 400,
    duration: 1.5,
  });
  gsap.to(".launch_pad", { rotation: 0, opacity: 1, duration: 3 });
  gsap.to(".content_1", { rotation: 0, opacity: 0, duration: 2 });
  tl.to(".broadcast", {
    duration: 1,
    left: 80,
    top: 300,
  })
    .to(".bg", {
      opacity: 0.5,
      duration: 2,
    })
    .to(".tx1", {
      duration: 1,
      text:
        "T-minus: 45:00 minutes – Launch director ให้สัญญาณการโหลดเชื้อเพลิงขึ้นยาน",
    })
    .to(".tx2", {
      duration: 1,
      text: "T-minus: 42:00 minutes – Undock Crew Access Arm (ทางเดินขึ้นยาน)",
    })
    .to(".tx3", {
      duration: 1,
      text:
        "T-minus: 37:00 minutes – Launch Escape System ถูกสลับเป็นโหมด Armed",
    })
    .to("#next", {
      opacity: 1,
      x: 350,
      y: 20,
      duration: 0.5,
    });
}
