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
var altitude_speed = 0;         //อัตตราเติมโตของความสูงจากพื้นดิน
var altitude_cumulative = 0;    //ความสูงสะสมจากพื้นดิน
var time_speed = 0;             //อัตตราเร่งความเร็วของเวลา
var t_minus_speed = 0;          //อัตตราเร่งความเร็วของเวลานับถอยหลัง


function start() {
  minn = 45; secc = 60;
  t_minus_speed = 20;
  count_down();
  gsap.to(".start", { display: 'none',opacity:1, duration: 2 });
}


var i = setInterval(function interv() {
  if (time_speed != 0) {
    //       TIMER SPEED CONTROL      //
    if (parseInt(secc) == 60 || parseInt(secc) >= 60) { secc = 0; minn += 1; }
    else if ((minn == 0 && parseInt(secc) == 1)) { acceleration = 18;altitude_speed = 0.162;}
    else if ((minn == 0 && parseInt(secc) == 58)) { time_speed = 1.2; acceleration = 74.184; altitude_speed = 0.85; }   //SPEED     
    else if ((minn == 2 && parseInt(secc) == 29)) { time_speed = 0.2; acceleration = 0.5; altitude_speed = 0.05;} //SLOW
    else if ((minn == 2 && parseInt(secc) == 50)) { time_speed = 2; acceleration = 80; altitude_speed = 1.2;}   //SPEED
    else if ((minn == 8 && parseInt(secc) == 46)) { time_speed = 0.2; acceleration = 0.5; altitude_speed = 0.01;} //SLOW
    else if ((minn == 9 && parseInt(secc) == 20)) { time_speed = 1.2; acceleration = 0.01;}   //SPEED
  

    //   CONTROL TWEEN AND TIMELINE    //
    else if ((minn == 0 && parseInt(secc) == 57)) { max_q(); }
    else if ((minn == 2 && parseInt(secc) == 33)) { meco(); }
    else if ((minn == 2 && parseInt(secc) == 36)) { separation_1st(); }
    else if ((minn == 2 && parseInt(secc) == 44)) { start_2nd(); }
    else if ((minn == 7 && parseInt(secc) == 10)) { entry_burn_1st(); }
    else if ((minn == 8 && parseInt(secc) == 47)) { seco_1(); }
    else if ((minn == 9 && parseInt(secc) == 3)) { landing_1st(); }
    else if ((minn == 12 && parseInt(secc) == 1)) { separation_2nd(); }
    else if ((minn == 13 && parseInt(secc) == 1)) { end(); }
    else if ((minn == 15 && parseInt(secc) == 1)) { restart(); }
  
  }

  secc += time_speed;
  cumulative_speed += acceleration;
  altitude_cumulative += altitude_speed;
  speed.innerHTML = parseInt(cumulative_speed);
  altitude.innerHTML = altitude_cumulative.toFixed(1);
  min.innerHTML = minn;
  sec.innerHTML = parseInt(secc);
}, 100);



CustomEase.create("hop", "M0,0 C0.176,0.056 0.306,-0.028 0.616,0.244 0.661,0.283 0.798,0.468 1,0.568");
gsap.to(".eart", { rotation: -1000, duration: 250 });
gsap.to(".start", { display: 'block', opacity:1, duration: 1 });

//       COUNT_DOWN
function count_down() {
  document.getElementById("time_status").innerHTML = "นับถอยหลัง";
  gsap.to(".t_minus", { display: 'block', duration: 1 });
  gsap.to(".timeline_box", { xPercent: 13, yPercent: 50 });
  var k = setInterval(function interv() {
    secc -= t_minus_speed;
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
        minn = 0;
        secc = 0;
        document.getElementById("time_status").innerHTML = "";
        clearInterval(k);
        go_nogo();
      }
    }
    min.innerHTML = minn;
    sec.innerHTML = parseInt(secc);
}, 100);
 }

//       GO / NO GO
function return_go() {
  liftoff();
  gsap.to(".go_nogo", { display: 'none', duration: 1 });
  gsap.to(".timeline_box", { display: 'none', duration: 1 });
};
function return_nogo() { time_speed = 0; };
function go_nogo() {
  setTimeout(function () { return_go() }, 9000);
  gsap.to(".timeout_1", { width: '100%', duration: 10 });
  gsap.to(".go_nogo", { display: 'block', opacity: 1, duration: 1 });
  gsap.to(".t_minus ", {display: 'none', opacity: 0, duration: 1});
}

//       LIFTOFF
function liftoff() {
  time_speed = 1;
  gsap.to(".start-engine", { display: 'block',opacity:1, duration: 1 });
  gsap.to(".t_minus ", {display: 'block', opacity: 1, duration: 1});
  gsap.to(".t_minus ", {top: '90%', left:'48%', color:'#fff'});
  gsap.to(".circle", { rotation: -29.5, duration: 7 });
  gsap.to(".left", { opacity: 1, duration: 1 });
  gsap.to(".right", { opacity: 1, duration: 1 });
  setTimeout(function () { gsap.to(".dragon", { rotation: 85,  duration: 15 }); }, 7000);
  tl.to(".pad", { yPercent: 300, duration: 2.5, ease: "hop" })
    .to(".pad", { display:'none' })
    .to(".parallax", { scale: 0.7, y: -100, duration: 2.5 })
    .to(".c1", { yPercent: 500, xPercent: -20, duration: 2 })
    .to(".c2", { yPercent: 400, xPercent: -60, duration: 1.5 })
    .to(".c3", { yPercent: 400, xPercent: -100, duration: 1 })
    .to(".parallax", { scale: 0.2, xPercent: 0, duration: 5 });
}


//       MAX_Q
function max_q() {
  gsap.to(".start-engine", { display: 'none',opacity:0, duration: 1 });
  gsap.to(".max-q", { display: 'block',opacity:1, duration: 1 });
  gsap.to(".circle", { rotation: -51.5,duration: 11.5});
  gsap.to(".tl_1", { display: 'block', duration: 0.5, text: "00:00:58 MAX-Q" });
  gsap.to(".parallax", { scale: 0.7, xPercent: 0, duration: 3 });
  gsap.to(".eart_iss", { scale: 0.7, xPercent: 0, duration: 3 });
}

//       MECO
function meco() {
  gsap.to(".max-q", { display: 'none',opacity:0, duration: 1 });
  gsap.to(".eart", { top: '-250%', duration: 10 });
  gsap.to(".trail_1st", { display: 'none', duration: 0.5});
}

//       1ST SEPARATION
function return_separation_1st() {
  gsap.to(".separation-1st", { display: 'block',opacity:1, duration: 1 });
  gsap.to(".dragon ._1st", { top: 10000, duration: 5, ease: "hop" })
  gsap.to(".separation_1st", { opacity: 0, display: 'none', duration: 1 });
}
function separation_1st() {
  setTimeout(function () { return_separation_1st() }, 9000);
  gsap.to(".parallax", { scale: 1, xPercent: 0, duration: 3 });
  gsap.to(".eart_iss", { scale: 0.2, xPercent: 0, duration: 3 });
  gsap.to(".separation_1st", { opacity: 1, display: 'block', duration: 1 });
  gsap.to(".timeout_2", { width: '100%', duration: 10 });
}

//       2ND START
function start_2nd() {
  gsap.to(".separation-1st", { display: 'none',opacity:0, duration: 1 });
  gsap.to(".circle", { rotation: -97.18, duration: 20 });
  gsap.to(".parallax", { scale: 0.2, xPercent: 0, duration: 3 });
  gsap.to(".eart_iss", { scale: 1, xPercent: 0, duration: 3 });
  gsap.to(".trail_2nd", { display: 'block', duration: 0.5});
}
//       1ST ENTRY BURN
function entry_burn_1st() {
  gsap.to(".entry-burn", { display: 'block',opacity:1, duration: 1 });
  gsap.to(".circle", { rotation: -118.18,duration: 10});
  tl.to(".landing_1", { display:'block', duration: 5 })
    .to(".landing_3", { display: 'block', duration: 2 })
    .to(".landing_2", { display:'block', duration: 2 });
}

//       SECO-1
function seco_1() {
  gsap.to(".entry-burn", { display: 'none',opacity:0, duration: 1 });
  gsap.to(".seco-1", { display: 'block',opacity:1, duration: 1 });
  gsap.to(".circle", { rotation: -120.65, duration: 6 });
  gsap.to(".trail_2nd", { display: 'none', duration: 0.5});
 }

//       1ST LANDING
function landing_1st() { 
  gsap.to(".seco-1", { display: 'none',opacity:0, duration: 1 });
  gsap.to(".circle", { rotation: -152.8, duration: 22});
  gsap.to(".landing", { display: 'block',opacity:1, duration: 1 });
  gsap.to(".landing_1", { display:'none'})
  gsap.to(".landing_2", { display: 'none' });
  gsap.to(".landing_3", { display:'none'});
}

//       2ND SEPARATION
function return_separation_2nd() { 
  gsap.to(".landing", { display: 'none',opacity:0, duration: 1 });
  gsap.to(".dragon ._2nd", { top: 10000, duration: 5, ease: "hop" })
  gsap.to(".separation_2nd", { opacity: 0, display: 'none', duration: 1 });
}
function separation_2nd() {
  setTimeout(function () { return_separation_2nd() }, 9000);
  gsap.to(".parallax", { scale: 1, xPercent: 0, duration: 3 });
  gsap.to(".eart_iss", { scale: 0.2, xPercent: 0, duration: 3 });
  gsap.to(".separation_2nd", { opacity: 1, display: 'block', duration: 1 });
  gsap.to(".timeout_3", { width: '100%', duration: 10 });
}


function end() {
   gsap.to(".parallax", { scale: 0.2, xPercent: 0, duration: 3 });
  gsap.to(".eart_iss", { scale: 1, xPercent: 0, duration: 3 });
}

function restart() {
  time_speed = 0;
  alert("end");
}