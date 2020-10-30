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
var t_minus_speed = 20;          //อัตตราเร่งความเร็วของเวลานับถอยหลัง


function start() {
  minn = 45; secc = 60;
  tl.to(".start", { display: 'none' })
    .to(".start-engine", { display: 'none' })
    .to(".timeline_box", { display: 'block' })
    .to(".t_minus", { opacity: 1, duration: 1 });
  //document.getElementById("time_status").innerHTML = "";
  count_down();
}


var i = setInterval(function interv() {
  secc += time_speed;
  if (time_speed != 0) {
    //       TIMER SPEED CONTROL      //
    
    if (parseInt(secc) == 60 || parseInt(secc) >= 60) { secc = 0; minn += 1; }
    
    //else if ((minn == 0 && parseInt(secc) == 1)) { acceleration = 18;altitude_speed = 0.162;}
    
    else if ((minn == 0 && parseInt(secc) == 58)) {
      time_speed = 0; acceleration = 0; altitude_speed = 0;
      gsap.to(".max-q", { display: 'block', duration: 1 });
    }   //SPEED     
    //else if ((minn == 0 && parseInt(secc) == 58)) { time_speed = 1.2; acceleration = 74.184; altitude_speed = 0.85; }   //SPEED     
    
    else if ((minn == 2 && parseInt(secc) == 33)) {
      time_speed = 0; acceleration = 0; altitude_speed = 0;
      gsap.to(".meco", { display: 'block', duration: 1 });
    }
    //else if ((minn == 2 && parseInt(secc) == 29)) { time_speed = 0.2; acceleration = 0.5; altitude_speed = 0.05;} //SLOW
    
    //else if ((minn == 2 && parseInt(secc) == 50)) { time_speed = 2; acceleration = 80; altitude_speed = 1.2;}   //SPEED
    
    else if ((minn == 3 && parseInt(secc) == 40)) {
      start_2nd();
    }
    else if ((minn == 7 && parseInt(secc) == 10)) {
      time_speed = 0;
      gsap.to(".entry-burn", { display: 'block', duration: 1 });
    }
    else if ((minn == 8 && parseInt(secc) == 46)) {
      gsap.to(".seco-1", { display: 'block', duration: 1 })
      seco_1();
    }
    else if ((minn == 9 && parseInt(secc) == 7)) {
      landing_1st();
    }
    else if ((minn == 9 && parseInt(secc) == 20)) {
      time_speed = 0;
      gsap.to(".goto_separation_2nd", {display: 'block', duration: 1 })
    }
    else if ((minn == 12 && parseInt(secc) == 2)) {
      separation_2nd();
    }

    else if ((minn == 13 && parseInt(secc) == 10)) {
      gsap.to(".dragon", { scale: 0.2, duration: 2 });
      gsap.to(".out_of_earth", { scale: 1, duration: 2 });
    }
    //else if ((minn == 8 && parseInt(secc) == 46)) { time_speed = 0.2; acceleration = 0.5; altitude_speed = 0.01;} //SLOW
    //else if ((minn == 9 && parseInt(secc) == 20)) { time_speed = 1.2; acceleration = 0.01;}   //SPEED
  
  }
  cumulative_speed += acceleration;
  altitude_cumulative += altitude_speed;
  speed.innerHTML = parseInt(cumulative_speed);
  altitude.innerHTML = altitude_cumulative.toFixed(1);
  min.innerHTML = minn;
  sec.innerHTML = parseInt(secc);
}, 100);



CustomEase.create("hop", "M0,0 C0.176,0.056 0.306,-0.028 0.616,0.244 0.661,0.283 0.798,0.468 1,0.568");
gsap.to(".earth", { rotation: -1000, duration: 250 });
gsap.to(".start-engine", { display: 'block', opacity:1, duration: 1 });

//       COUNT_DOWN     00:00
function count_down() {
  var k = setInterval(function interv() {
    secc -= t_minus_speed;
    if (t_minus_speed != 0) {
      if (parseInt(secc) == 0) { secc = 60; minn -= 1; }
      //   CONTROL TWEEN AND TIMELINE    //
      else if (minn == 45) {
        gsap.to(".tl_1", { duration: 1, text: "" });
        gsap.to(".tl_1", { color:"rgb(81 223 105)", duration: 1, text: "T-minus: 45:00 – Launch director ให้สัญญาณการโหลดเชื้อเพลิงขึ้นยาน" });
      }
      else if (minn == 42) {
        gsap.to(".tl_2", { duration: 1, text: "" });
        gsap.to(".tl_2", { color:"rgb(81 223 105)", duration: 1, text: "T-minus: 42:00 – Undock Crew Access Arm (ทางเดินขึ้นยาน)" });      }
      else if (minn == 37) {
        gsap.to(".tl_3", { duration: 1, text: "" });
        gsap.to(".tl_3", { color:"rgb(81 223 105)", duration: 1, text: "T-minus: 37:00 – Launch Escape System ถูกสลับเป็นโหมด Armed" }); 
      }
      else if (minn == 35) {
        gsap.to(".tl_4", { duration: 1, text: "" });
        gsap.to(".tl_4", { color:"rgb(81 223 105)", duration: 1, text: "T-minus: 35:00 – เริ่ม Load RP-1 Kerosene (เชื้อเพลิงจรวด) ขึ้นจรวด First stage LOX (Liquid Oxygen)" });
      }
      else if (minn == 16) {
        gsap.to(".tl_5", { duration: 1, text: "" });
        gsap.to(".tl_5", { color: "rgb(81 223 105)", duration: 1, text: "T-minus: 16:00 – เริ่ม Load RP-1 Kerosene ขึ้นจรวด Second stage LOX" });
      }
      else if (minn == 7) {
        gsap.to(".tl_6", { duration: 1, text: "" });
        gsap.to(".tl_6", { color: "rgb(81 223 105)", duration: 1, text: "T-minus: 07:00 – เริ่มการหล่อเย็นเครื่องยนต์ Falcon 9" });
      }
      else if (minn == 5) {
        gsap.to(".tl_7", { duration: 1, text: "" });
        gsap.to(".tl_7", { color: "rgb(81 223 105)", duration: 1, text: "T-minus: 05:00 – ตัดพลังงานไฟฟ้าจาก Ground Power Unit เป็น Internal Power (ใช้ไฟจากในยาน)" });
      }
      else if (minn == 1) {
        gsap.to(".tl_8", { duration: 1, text: "" });
        gsap.to(".tl_8", { color: "rgb(81 223 105)", duration: 1, text: "T-minus: 01:00 – Pre-launch Checks (ตรวจสอบขั้นสุดท้ายก่อนการปล่อย) และเริ่มการอัดความดันในถังเชื้อเพลิง (Propellant Tank Pressurization)" });
      }
      else if (minn == 0) {
        gsap.to(".tl_9", { duration: 1, text: "" });
        gsap.to(".tl_9", { color: "rgb(81 223 105)", duration: 1, text: "T-minus: 00:45 – Launch director ให้สัญญาณ Go/No Go" });
        minn = 0;
        secc = 0;
        //document.getElementById("time_status").innerHTML = "";
        gsap.to(".t_minus", { opacity:0 })
        clearInterval(k);
      }
    }
    min.innerHTML = minn;
    sec.innerHTML = parseInt(secc);
}, 100);
 }

//       LIFTOFF        00:00
function liftoff() {
  time_speed = 0.5;acceleration = 18;altitude_speed = 0.162;
  gsap.to(".t_minus ", {opacity:0, top: '90%', color:'#fff'});
  gsap.to(".timeline_box", { display: 'none', duration: 0.5 });
  gsap.to(".circle", { rotation: -29.5, duration: 13 });
  gsap.to("html", { background: 'rgb(22 40 59)', duration: 11});
  gsap.to(".onearth", { top: '200%', duration: 5, ease: "hop"});
  setTimeout(function () {
    gsap.to(".dragon", { scale: 0.25, duration: 2.5 });
    setTimeout(function () { gsap.to(".c1", { yPercent: 600, duration: 2 }) }, 2000);
    setTimeout(function () { gsap.to(".c2", { yPercent: 500, duration: 3 }) }, 0);
    setTimeout(function () { gsap.to(".c3", { yPercent: 500, duration: 1 }) }, 5000);
  }, 3500);

  setTimeout(function () {
    gsap.to(".dragon", { rotation: 40, duration: 8.5 }); 
    gsap.to(".effect", { rotation: 40, duration: 8.5 });
  }, 6500);
  
  tl.to(".pad", { yPercent: 200, duration: 2, ease: "hop" })
    .to(".dragon", { scale: 0.5, yPercent: -55, duration: 2.5 })
    .to(".left, .right", { opacity: 1, duration: 2 })
    .to(".t_minus ", { opacity: 1 })
    .to(".pad", { display: 'none' });
}


//       MAX_Q          00:58
function max_q() {
  time_speed = 1; acceleration = 74.184; altitude_speed = 0.85;
  gsap.to(".max-q", { display: 'none', duration: 1 });
  gsap.to("html", { background: '#222', duration: 5});
  gsap.to(".dragon", { rotation: 85, duration: 10 });
  gsap.to(".circle", { rotation: -51.5, duration: 10 });
  setTimeout(function () { 
       gsap.to("canvas", { opacity: 1, duration: 7 });
  gsap.to(".out_of_earth", {top: '65%', duration:7})
    }, 3000);
}

//       MECO           02:33
function meco() {
  time_speed = 2;
  gsap.to(".meco", { display: 'none', duration: 1 });
  gsap.to(".trail_1st", { display: 'none', duration: 0.5 });
  gsap.to(".circle", { rotation: -97.18, duration: 16 });
  gsap.to(".out_of_earth", { scale: 0.2, duration: 2 });
  tl.to(".dragon", { scale: 0.7, duration: 2 })
    .to(".dragon ._1st", { top: 10000, duration: 5, ease: "hop" });
}

//       2ND START      02:36
function start_2nd() {
  gsap.to(".trail_2nd", { display: 'block', duration: 0.5 });
  gsap.to(".out_of_earth", { scale: 1, duration: 2 });
  gsap.to(".dragon", { scale: 0.2, duration: 2 });
}
//       1ST ENTRY BURN 07:15
function entry_burn_1st() {
  time_speed = 1;
  gsap.to(".circle", { rotation: -118.18, duration: 9 });
  gsap.to(".entry-burn", { display: 'none', duration: 1 });s
  tl.to(".landing_1", { display:'block', duration: 3 })
    .to(".landing_3", { display: 'block', duration: 2 })
    .to(".landing_2", { display: 'block', duration: 2 });
}

//       SECO-1         08:47
function seco_1() {
  gsap.to(".circle", { rotation: -120.65, duration:3 });
  gsap.to(".trail_2nd", { display: 'none', duration: 0.5});
 }

//       1ST LANDING    09:22
function landing_1st() {
  gsap.to(".landing_1", { display: 'none' })
  gsap.to(".landing_2", { display: 'none' });
  gsap.to(".landing_3", { display: 'none' });
}
function goto_separation_2nd() {
  time_speed = 2;
  gsap.to(".circle", { rotation: -152.8, duration:8.5 });
}
//       2ND SEPARATION  12:00
function separation_2nd() { 
  gsap.to(".out_of_earth", { scale: 0.2, duration: 2 });
  tl.to(".dragon", { scale: 0.7, duration: 2 })
    .to(".dragon ._2nd", { top: 10000, duration: 5, ease: "hop" });
}
function end() {
   gsap.to(".dragon", { scale: 0.2, xPercent: 0, duration: 3 });
  gsap.to(".earth", { scale: 1, xPercent: 0, duration: 3 });
}

function restart() {
  time_speed = 0;
  alert("end");
}