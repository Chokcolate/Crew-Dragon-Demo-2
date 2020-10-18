var tl = gsap.timeline();
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(TextPlugin);
gsap.registerPlugin(CustomEase);

min = document.getElementById("min");
sec = document.getElementById("sec");
speed= document.getElementById("speed");
altitude = document.getElementById("altitude");

var minn = 0; var secc = 0;     //นาที : วินาที
var acceleration = 0;           //อัตตราเร่งความเร็ว
var cumulative_speed = 0;       //ความเร็วสะสม
var time_speed = 0;             //อัตตราเร่งความเร็วของเวลา
var t_minus_speed = 0;          //อัตตราเร่งความเร็วของเวลานับถอยหลัง


function start() {
  minn = 45; secc = 60;
  t_minus_speed = 10;
  count_down();
}


var i = setInterval(function interv() {
  if (time_speed != 0) {
    //       TIMER SPEED CONTROL      //
    if (parseInt(secc) == 60) { secc = 0; minn += 1 }
    else if ((minn == 0 && parseInt(secc) == 0)) { liftoff(); acceleration = 18 }
    else if ((minn == 0 && parseInt(secc) == 58)) { time_speed = 1.2; acceleration = 74.184; }   //SPEED     
    else if ((minn == 2 && parseInt(secc) == 29)) { time_speed = 0.2; acceleration = 0.5;} //SLOW
    else if ((minn == 2 && parseInt(secc) == 50)) { time_speed = 2;   acceleration = 80;}   //SPEED
    else if ((minn == 9 && parseInt(secc) == 15)) { time_speed = 0.5; acceleration = 0.5;} //SLOW
    else if ((minn == 9 && parseInt(secc) == 35)) { time_speed = 1.2; acceleration = 80;}   //SPEED
  

    //   CONTROL TWEEN AND TIMELINE    //
    else if ((minn == 0 && parseInt(secc) == 57)) { max_q(); }
    else if ((minn == 2 && parseInt(secc) == 33)) { meco(); }
    else if ((minn == 2 && parseInt(secc) == 36)) { separation_1st(); }
    else if ((minn == 2 && parseInt(secc) == 44)) { start_2nd(); }
    else if ((minn == 7 && parseInt(secc) == 10)) { entry_burn_1st(); }
    else if ((minn == 8 && parseInt(secc) == 47)) { seco_1(); }
    else if ((minn == 9 && parseInt(secc) == 22)) { landing_1st(); }
    else if ((minn == 12 && parseInt(secc) == 0)) { separation_2nd(); }
  
  }

  secc += time_speed;
  cumulative_speed += acceleration;

  speed.innerHTML = cumulative_speed;
  min.innerHTML = minn;
  sec.innerHTML = parseInt(secc);
}, 100);



CustomEase.create("hop", "M0,0 C0.176,0.056 0.306,-0.028 0.616,0.244 0.661,0.283 0.798,0.468 1,0.568");
TweenMax.to("body", {background:"linear-gradient(to right, #f00, #0f0, #00f, #600, #060)"});
gsap.to(".circle", { rotation: 10});
gsap.to(".status_footer", { opacity: 1, duration: 2 });


//       COUNT_DOWN
function count_down() {
  gsap.to(".timeline_box", { xPercent: 13, yPercent: 50 });
  var k = setInterval(function interv() {
    if (t_minus_speed != 0) {
      if (parseInt(secc) == 0) { secc = 60; minn -= 1; }
      //   CONTROL TWEEN AND TIMELINE    //
      else if (minn == 45) {
        gsap.to(".tl_1", { display: 'block', duration: 1, text: "T-minus: 45:00 minutes – Launch director ให้สัญญาณการโหลดเชื้อเพลิงขึ้นยาน <br> T-minus: 42:00 minutes – Undock Crew Access Arm (ทางเดินขึ้นยาน)" });
      }
      else if (minn == 37) {
        gsap.to(".tl_2", { display: 'block', duration: 1, text: "T-minus: 37:00 minutes – Launch Escape System ถูกสลับเป็นโหมด Armed <br> T-minus: 35:00 minutes – เริ่ม Load RP-1 Kerosene (เชื้อเพลิงจรวด) ขึ้นจรวด First stage LOX (Liquid Oxygen)" }); 
      }
      else if (minn == 16) {
        gsap.to(".tl_3", { display: 'block', duration: 1, text: "T-minus: 16:00 minutes – เริ่ม Load RP-1 Kerosene ขึ้นจรวด Second stage LOX" }); 
      }
      else if (minn == 7) {
        gsap.to(".tl_4", { display: 'block', duration: 1, text: "T-minus: 07:00 minutes – เริ่มการหล่อเย็นเครื่องยนต์ Falcon 9 <br> T-minus: 05:00 minutes – ตัดพลังงานไฟฟ้าจาก Ground Power Unit เป็น Internal Power (ใช้ไฟจากในยาน)" });
      }
      else if (minn == 1) {
        gsap.to(".tl_4", { display: 'block', duration: 1, text: "T-minus: 01:00 minute – Pre-launch Checks (ตรวจสอบขั้นสุดท้ายก่อนการปล่อย) และเริ่มการอัดความดันในถังเชื้อเพลิง (Propellant Tank Pressurization) <br> T-minus: 00:45 minute – Launch director ให้สัญญาณ Go/No Go" });
      }
      else if (minn == 0) {
        gsap.to(".timeline_box", { display: 'none', duration: 1 });
        clearInterval(k); minn = 0; secc = 0; time_speed = 1;
      }
    }
    min.innerHTML = minn;
    sec.innerHTML = parseInt(secc);
    secc -= t_minus_speed;
}, 100);
 }

//       GO / NO GO
function go_nogo() {
  
}

//       LIFTOFF
function liftoff() {
  gsap.to(".circle", { rotation: -29.5, duration: 7 });
  setTimeout(function () { gsap.to(".status_footer", { opacity: 1, duration: 2 }); }, 2000);
  setTimeout(function () { gsap.to(".dragon", { rotation: 10, duration: 5 }); }, 4000);
  setTimeout(function () { gsap.to(".dragon", { rotation: 40, duration: 10 }); }, 6000);
  setTimeout(function () { gsap.to(".dragon", { rotation: 85,  duration: 10 }); }, 9000);
  setTimeout(function () { gsap.to(".eart", { top: '-250%', duration: 10 }); }, 10000);
  setTimeout(function () { gsap.to(".eart", { rotation: -100, duration: 40 }); }, 11000);

  tl.to(".pad", { yPercent: 300, duration: 2.5, ease: "hop" })
    .to(".pad", { display:'none' })
    .to(".parallax", { scale: 0.7, y: -80, duration: 2.5 })
    .to(".c1", { yPercent: 500, xPercent: -20, duration: 2 })
    .to(".c2", { yPercent: 400, xPercent: -60, duration: 1.5 })
    .to(".c3", { yPercent: 400, xPercent: -100, duration: 1 })
    .to(".parallax", { scale: 0.2, xPercent: -10, duration: 5 });
}


//       MAX_Q
function max_q() {
  gsap.to(".circle", { rotation: -51.5,duration: 11.5});
  gsap.to(".tl_1", { display: 'block', duration: 0.5, text: "00:00:58 MAX-Q" });
}

//       MECO
function meco() {
  gsap.to(".circle", { rotation: -58.4,duration: 10});
  gsap.to(".tl_2", { display: 'block', duration: 0.5, text: "00:02:33 MECO" });
  gsap.to(".parallax", { scale: 0.7, xPercent: 0, duration: 3 });
  gsap.to(".eart_iss", { scale: 0.7, xPercent: 0, duration: 3 });
}

//       1ST SEPARATION
function separation_1st() {
  gsap.to(".dragon ._1st", { top: 7000, xPercent: 10, duration: 10, ease: "hop" })
}

//       2ND START
function start_2nd() {
  gsap.to(".circle", { rotation: -97.18,duration: 18.5});
  gsap.to(".parallax", { scale: 0.2, xPercent: 0, duration: 5 });
  gsap.to(".eart_iss", { scale: 1, xPercent: 0, duration: 5 });
}
//       1ST ENTRY BURN
function entry_burn_1st() {
  gsap.to(".circle", { rotation: -118.18,duration: 10.5});
  tl.to(".landing_1", { display:'block', duration: 5 })
    .to(".landing_2", { display:'block', duration: 2 });
}

//       SECO-1
function seco_1() {
  gsap.to(".circle", { rotation: -120.65, duration: 2});
 }

//       1ST LANDING
function landing_1st() { 
  gsap.to(".circle", { rotation: -152.8, duration: 10.5});
  gsap.to(".landing_1", { display:'none'})
  gsap.to(".landing_2", { display:'none'});
}

//       2ND SEPARATION
function separation_2nd() {}