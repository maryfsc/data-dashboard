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
      studentsTotalContainer.innerHTML += '<p class="student-number">'+ officeStudents +'</p><p>Alunas</p>';
      mainContent.appendChild(studentsTotalContainer);
  }

  detractors();
  aboveAverage();
  netPromoterScores();
  teacherAverage();
  jediAverage();
  studentsExpectations();
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

  var totalInactive = parseInt(inactive / totalStudents * 100);
  var totalActive = parseInt(active / totalStudents * 100);

// Objeto com dados para o gráfico
  var activeGraph = [
    {name: 'ativas', y: totalActive},
    {name: 'desistentes', y: totalInactive}
  ]

// Início do código do gráfico 
  Highcharts.chart('detractors-graph-container', {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    title: {
      text: 'Browser market shares in January, 2018'
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
        enabled: true,
        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
        style: {
          color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
        }
      }
    }
  },
  series: [{
    name: ' ',
    colorByPoint: true,
    data: activeGraph
  }]
});

  var totalContainer = document.createElement('div');
  var graphContainer = document.createElement('div');
  graphContainer.id = 'detractors-graph-container';
  totalContainer.classList = 'div-content';
  totalContainer.innerHTML = '<h2 class="green">' + totalInactive + '</h2>';
  totalContainer.innerHTML += '<p>Desistiram</p>';
  mainContent.appendChild(totalContainer);

  console.log(activeGraph);
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

  var studentPercent = parseInt((totalAboveAverage / totalStudents) * 100);

  var percentContainer = document.createElement('div');
  percentContainer.innerHTML = '<p>Porcentagem de alunas acima da média: ' + studentPercent + '%</p>';
  mainContent.appendChild(percentContainer);

  var quantityContainer = document.createElement('div');
  quantityContainer.innerHTML = '<p>Quantidade de alunas acima da média: ' + totalAboveAverage + '</p>';
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
  var npsTotal = parseInt((promoters - detractors) / sprintQuantity);

  var npsContainer = document.createElement('div');
  npsContainer.innerHTML = 'Média de NPS: ' + npsTotal + '%';
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
  teacherPointsContainer.innerHTML = 'Nota média de mentores: ' + mediaTeacherPoints;
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
   jediPointsContainer.innerHTML = 'Nota média de Jedis: ' + mediaJediPoints;
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
    var meetsAndExceedsExpectation = parseInt((cumpleExpectation + superaExpectation) / sprintQuantity);

    var studentsExpectationContainer = document.createElement('div');
    studentsExpectationContainer.innerHTML = 'Expectativa das Alunas: Para ' + meetsAndExceedsExpectation + '% cumpre ou supera as expectativas.';
    mainContent.appendChild(studentsExpectationContainer);
}

console.log(data);
