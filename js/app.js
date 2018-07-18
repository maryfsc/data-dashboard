var mainContent = document.getElementById('main-content');

var menuButton = document.getElementById('menu-button');
menuButton.addEventListener('click', showMenu);

function showMenu() {
  var listButton = document.getElementsByClassName('list-button');

  for (i = 0; i < listButton.length; i++) {
    if (listButton[i].classList.contains('hidden')){
      listButton[i].classList.remove('hidden');
      listButton[i].classList.add('show');
    } else {
      listButton[i].classList.remove('show');
      listButton[i].classList.add('hidden');
      }
   }
} 

var aqp = document.getElementById('aqp');
aqp.param = 'AQP';
var cdmx = document.getElementById('cdmx');
cdmx.param = 'CDMX';
var lim = document.getElementById('lim');
lim.param = 'LIM';
var scl = document.getElementById('scl');
scl.param = 'SCL';

var offices = document.getElementsByClassName('office');

for (i = 0; i < offices.length; i++) {
  offices[i].addEventListener('click', showOffice);
}

var office;

function showOffice(evt) {
 office = evt.target.param;
  
  while (mainContent.hasChildNodes()) {
    mainContent.removeChild(mainContent.firstChild);
  }

  for (var series in data[office]) {
    for (var student in data[office][series]['students'])
      var studentsTotalContainer = document.createElement('div');
      var officeStudents = data[office][series]['students'].length;
      studentsTotalContainer.classList = 'div-content';
      studentsTotalContainer.innerHTML = '<h2>' + series + '</h2>';
      studentsTotalContainer.innerHTML += '<i class="icon-user"></i>';
      studentsTotalContainer.innerHTML += '<p class="pink">'+ officeStudents +'</p><p>Alunas</p>';
      mainContent.appendChild(studentsTotalContainer);
  }
  detractors();
  aboveAverage();
  netPromoterScores();
  teacherAverage();
  jediAverage();
  studentsExpectations();
  // studentProfile();
  // studentPhoto();
}

function detractors() {
  var active = 0;
  var inactive = 0;
  var totalStudents = 0;

  for (var series in data[office]) {
    for (var student in data[office][series]['students']) {
      totalStudents += 1;
      if (data[office][series]['students'][student]['active'] === false){
        inactive += 1;
      } else {
        active += 1;
      }
    }
  }

  var totalInactive = parseInt(inactive / totalStudents * 100) + '%';
  var totalActive = parseInt(active / totalStudents * 100) + '%';

  var totalContainer = document.createElement('div');
  totalContainer.classList = 'div-content';
  totalContainer.innerHTML = '<h2 class="green">' + totalInactive + '</h2>';
  totalContainer.innerHTML += '<p>Desistiram</p>';
  totalContainer.innerHTML += '<i class="icon-frown-o"></i>';
  mainContent.appendChild(totalContainer);
}

function aboveAverage() {
  const TECHMAX = 1800;
  const HSEMAX = 1200;
  var totalAboveAverage = 0;
  var techAboveAverage = 0;
  var hseAboveAverage = 0;
  var totalStudents = 0;

  for (var series in data[office]) {
    for (var student in data[office][series]['students']) {
      var tech = 0;
      var hse = 0;
      totalStudents += 1;

      for (var i in data[office][series]['students'][student]['sprints']) {
        var sprintQuantity = data[office][series]['students'][student]['sprints'].length;
        tech += data[office][series]['students'][student]['sprints'][i]['score']['tech'];
        hse += data[office][series]['students'][student]['sprints'][i]['score']['hse'];
      }

      var techTotal = tech / sprintQuantity;
      var hseTotal = hse / sprintQuantity;

      var percentTechPoints = parseInt((techTotal / TECHMAX) * 100);
      var percentHsePoints = parseInt((hseTotal / HSEMAX) * 100);

      if (percentTechPoints > 70 && percentHsePoints > 70) {
        totalAboveAverage += 1;
      }
    }
  }

  var studentPercent = parseInt((totalAboveAverage / totalStudents) * 100) + '%';

  var percentContainer = document.createElement('div');
  percentContainer.classList = 'div-content';
  percentContainer.innerHTML = '<h2 class="green">' + studentPercent + '</h2>';
  percentContainer.innerHTML += '<p>De alunas acima da média</p>';
  percentContainer.innerHTML += '<i class="icon-line-chart"></i>';
  mainContent.appendChild(percentContainer);

  var quantityContainer = document.createElement('div');
  quantityContainer.classList = 'div-content';
  quantityContainer.innerHTML = '<h2 class="pink">' + totalAboveAverage + '</h2>';
  quantityContainer.innerHTML += '<p>Alunas acima da média</p>';
  quantityContainer.innerHTML += '<i class="icon-chart-bar"></i>';
  mainContent.appendChild(quantityContainer);
}

function netPromoterScores() {
  var promoters = 0;
  var detractors = 0;
  var sprintQuantity = 0;
  for (var series in data[office]) {
    for (var i in data[office][series]['ratings']) {
      sprintQuantity += 1;
      promoters += data[office][series]['ratings'][i]['nps']['promoters'];
      detractors += data[office][series]['ratings'][i]['nps']['detractors'];
    }
  }
  var npsTotal = parseInt((promoters - detractors) / sprintQuantity) + '%';

  var npsContainer = document.createElement('div');
  npsContainer.classList = 'div-content';
  npsContainer.innerHTML = '<h2 class="green">' + npsTotal + '</h2>';
  npsContainer.innerHTML += '<p>NPS</p>';
  npsContainer.innerHTML += '<i class="icon-pencil-square-o"></i>';
  mainContent.appendChild(npsContainer);
}

function teacherAverage(){

  var teacherPoints = 0;
  var sprintQuantity = 0;

  for (var series in data[office]){
     for (var i in data[office][series]['ratings']){
       sprintQuantity += 1;
       teacherPoints += data[office][series]['ratings'][i]['teacher'];
     }
    }

  var mediaTeacherPoints = (teacherPoints / sprintQuantity).toFixed(2);

  var teacherPointsContainer = document.createElement('div');
  teacherPointsContainer.classList = 'div-content';
  teacherPointsContainer.innerHTML = '<h2 class="pink">' + mediaTeacherPoints + '</p>';
  teacherPointsContainer.innerHTML += '<p>Média de Teacher Points</p>';
  teacherPointsContainer.innerHTML += '<i class="icon-coffee"></i>';
  mainContent.appendChild(teacherPointsContainer);
}

function jediAverage(){

  var jediPoints = 0;
  var sprintQuantity = 0;
   for (var series in data[office]){
     for (var i in data[office][series]['ratings']){
       sprintQuantity += 1;
       jediPoints += data[office][series]['ratings'][i]['jedi'];
     }
   }
   var mediaJediPoints = (jediPoints / sprintQuantity).toFixed(2);

   var jediPointsContainer = document.createElement('div');
   jediPointsContainer.classList = 'div-content';
   jediPointsContainer.innerHTML = '<h2 class="pink">' + mediaJediPoints + '</p>';
   jediPointsContainer.innerHTML += '<p>Média de Jedi Points</p>';
   jediPointsContainer.innerHTML += '<i class="icon-rocket"></i>';
   mainContent.appendChild(jediPointsContainer);
}

function studentsExpectations(){
  var cumpleExpectation = 0;
  var noCumpleExpectation = 0;
  var superaExpectation = 0;
  var sprintQuantity = 0;

    for (var series in data[office]){
      for (var i in data[office][series]['ratings']){
        sprintQuantity += 1;
        cumpleExpectation += data[office][series]['ratings'][i]['student']['cumple'];
        noCumpleExpectation += data[office][series]['ratings'][i]['student']['no-cumple'];
        superaExpectation += data[office][series]['ratings'][i]['student']['supera'];
      }
    }
    var meetsAndExceedsExpectation = parseInt((cumpleExpectation + superaExpectation) / sprintQuantity) + '%';

    var studentsExpectationContainer = document.createElement('div');
    studentsExpectationContainer.classList = 'div-content';
    studentsExpectationContainer.innerHTML = '<h2 class="green">' + meetsAndExceedsExpectation + '</h2>';
    studentsExpectationContainer.innerHTML += '<p>De satisfeitas ou surpresas com a Laboratoria!</p>';
    studentsExpectationContainer.innerHTML += '<i class="icon-smile-o"></i>';
    mainContent.appendChild(studentsExpectationContainer);
}

// function studentPhoto() {
//   for (var series in data[office]) {
//     for (var student in data[office][series]['students']) {
//       var img = document.createElement('img');
//       img.src = data[office][series]['students'][student]['photo'];
//       img.style = "weight: 100px; height: 100px;";
//       mainContent.appendChild(img);
//     }
//   }
// }

// function studentProfile(){
//   var studentProfileArray = [];
//   var studentProfile = {};
//     for (var series in data[office]){
//       for (var student in data[office][series]['students']){
//         studentProfile['name'] = data[office][series]['students'][student]['name'];
//         studentProfile['active'] = data[office][series]['students'][student]['active'];
//         studentProfileArray.push(studentProfile);
//     }
//   }
//     console.log(studentProfileArray);
// }
