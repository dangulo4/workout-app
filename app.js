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
const round1 = document.getElementById('round-1');
const rest1 = document.getElementById('rest-1');
const round2 = document.getElementById('round-2');
const rest2 = document.getElementById('rest-2');
const round3 = document.getElementById('round-3');

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

    // create countdown
    function getReady(el) {
      let seconds = time % 60;
      el.innerHTML = `
      <div class='inputs-container flex'>
        <h4 class='title'>Get Ready in</h4>
        <h2 id='seconds' class='active animateSeconds'>${seconds}</h2>
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
