{
  const myTime = setInterval(myTimer, 1000);
  function myTimer() {
    const today = new Date();
    const displayTime = today.toLocaleTimeString();
    document.getElementById('displayTime').innerHTML = displayTime;
  }
}
// todo: Get elements from DOM
const body = document.querySelector('body');
const icon = document.querySelector('i');

// get inputs
const roundTimeInput = document.getElementById('roundTime');
const restTimeInput = document.getElementById('restTime');
const startStopBtn = document.getElementById('start');

// get Rounds and Rests
const round1 = document.getElementById('round_1');
const rest1 = document.getElementById('rest_1');
const round2 = document.getElementById('round_2');
const rest2 = document.getElementById('rest_2');
const round3 = document.getElementById('round_3');

// get Alerts
const alert10sec = document.getElementById('alert10sec');
const alertStart = document.getElementById('alertStart');
const alertStop = document.getElementById('alertStop');

const startTimer = () => {
  // todo: time stamps
  let roundTime = roundTimeInput.value * 60;
  let restTime = restTimeInput.value * 60;
  let time = '10';

  // todo: verify
  if (roundTimeInput.value === '' || restTimeInput.value === '') {
    alert('Enter Round and Rest Time');
    return;
  } else {
    // Todo: Stop countdown
    startStopBtn.innerHTML = 'Stop';
    startStopBtn.style.backgroundColor = '#e24379';
    startStopBtn.onclick = newWorkout;

    // todo alert 10 sec
    setAlert(alert10sec);

    // todo: start countdown
    const startCountDown = document.querySelector('.title');
    setInterval(() => {
      getReady(startCountDown);
    }, 1000);

    // todo: start workout
    setTimeout(() => {
      // todo: hide header
      document.querySelector('header').style.display = 'none';
      // todo: alert start round
      setAlert(alertStart);

      // todo: start first round
      setInterval(() => {
        if (round1.innerText !== '0:00') {
          updateRound(round1);
          // round1.parentElement.classList.add('active');
          round1.parentElement.classList.add('active');
          // change icon
          addRemoveIconClass('fa-dumbbell', 'fa-hand-fist');
          // Alert 10 sec
          checkFor10Sec(round1);
          // Alert stop round
          round1.innerText === '0:00' ? setAlert(alertStop) : round1;
        } else if (round1.innerText === '0:00' && rest1.innerText !== '0:00') {
          // start rest 1
          // toggle display
          addRemoveActiveClass(round1, rest1);
          // update rest
          updateRest(rest1);
          //   // change icon
          addRemoveIconClass('fa-hand-fist', 'fa-bottle-water');

          // alter 10 sec
          checkFor10Sec(rest1);
          // Alert start  next round
          rest1.innerText === '0:00' ? setAlert(alertStart) : rest1;

          // Rest Round Time
          resetRoundTime();
        } else if (rest1.innerText === '0:00' && round2.innerText !== '0:00') {
          // todo: start Round 2
          // toggle display
          addRemoveActiveClass(rest1, round2);
          // update Rest
          updateRound(round2);
          // Change icon
          addRemoveIconClass('fa-bottle-water', 'fa-hand-fist');
          // alert 10 sec
          checkFor10Sec(round2);
          // alert start next round
          round2.innerText === '0:00' ? setAlert(alertStop) : round2;
          // rest round time
          resetRestTime();
        } else if (round2.innerText === '0:00' && rest2.innerText !== '0:00') {
          // todo start rest2
          // toggle display
          addRemoveActiveClass(round2, rest2);
          // update rest
          updateRest(rest2);
          //change icon
          addRemoveIconClass('fa-hand-fist', 'fa-bottle-water');
          // alert 10 sec
          checkFor10Sec(rest2);
          //alert start next round
          rest2.innerText === '0:00' ? setAlert(alertStart) : rest2;
          // Rest round time
          resetRoundTime();
        } else if (round3.innerText !== '0:00') {
          // todo start round 3
          // toggle display
          addRemoveActiveClass(rest2, round3);
          // update rest
          updateRound(round3);
          // change icon
          addRemoveIconClass('fa-bottle-water', 'fa-hand-fist');
          // alert 10 sec
          checkFor10Sec(round3);
          // alert stop round
          round3.innerText === '0:00' ? setAlert(alertStop) : round3;
        }
        // todo: stop workout and create new workout
        if (round3.innerText === '0:00') {
          body.innerHTML = `
          <h1 class="title">Done</h1>
           <div class="inputs-container">
            <button class="btn" onclick="newWorkout()">Again</button>
          </div>
          `;
        }
      }, 1000);
    }, 11000);

    // Check for 10 secs
    function checkFor10Sec(activity) {
      activity.innerText === '0:10' ? (setAlert(alert10sec), (activity.style.color = '#e24379')) : activity;
    }

    // Add remove icon class
    function addRemoveIconClass(currentIcon, nextIcon) {
      icon.classList.remove(currentIcon);
      icon.classList.add(nextIcon);
    }

    function addRemoveActiveClass(previousActivity, currentActivity) {
      previousActivity.parentElement.classList.remove('active');
      currentActivity.parentElement.classList.add('active');
    }

    // Update round
    function updateRound(round) {
      const minutes = Math.floor(roundTime / 60);
      let seconds = roundTime % 60;

      seconds = seconds < 10 ? '0' + seconds : seconds;
      round.innerHTML = `${minutes}:${seconds}`;
      roundTime--;
    }

    function resetRoundTime() {
      return (roundTime = roundTimeInput.value * 60);
    }
    // Update  rest
    function updateRest(rest) {
      const minutes = Math.floor(restTime / 60);
      let seconds = restTime % 60;

      seconds = seconds < 10 ? '0' + seconds : seconds;
      rest.innerHTML = `${minutes}:${seconds}`;
      restTime--;
    }

    function resetRestTime() {
      return (restTime = restTimeInput.value * 60);
    }

    // create countdown
    function getReady(el) {
      let seconds = time % 60;
      el.innerHTML = `
      <div class="inputs-container flex">
        <h4 class="title">Get Ready in</h4>
        <h2 id="seconds" class="active animateSeconds">${seconds}</h2>
      </div>
      `;
      time--;
    }

    // Interaction Alert
    function setAlert(alert) {
      alert.play();
      setTimeout(() => {
        alert.pause();
        alert.currentTime = 0;
      }, 1300);
    }
  }
};
// Utility function
// Todo: stop and restart the workout
const newWorkout = () => {
  window.location.reload();
};
