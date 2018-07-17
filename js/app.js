var mainContent = document.getElementById('main-content');

// pegando o elemento HTML do botão de menu e acrescentando o evento de click
var menuButton = document.getElementById('menu-button');
menuButton.addEventListener('click', showMenu);

function showMenu() {

  // retorna um array com todos os elementos HTML com classe 'list-button'
  var listButton = document.getElementsByClassName('list-button');

  // percorre o array listButton removendo e acrescentando classes
  // pré-definidas no CSS
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

// pegando os botões individualmente e acrescentando um parâmetro 'param' como no JSON
// para a função showOffice identificar qual a sede em questão

var aqp = document.getElementById('aqp');
aqp.param = 'AQP';
var cdmx = document.getElementById('cdmx');
cdmx.param = 'CDMX';
var lim = document.getElementById('lim');
lim.param = 'LIM';
var scl = document.getElementById('scl');
scl.param = 'SCL';

// pegando os botões via classe 'office'
var offices = document.getElementsByClassName('office');

// acrescentando o event listener de click em cada um dos botões
for (i = 0; i < offices.length; i++) {
  offices[i].addEventListener('click', showOffice);
}

var office;

function showOffice(evt) {

  // assegurando que o parâmetro evt terá o mesmo parâmetro
  // da sede definido anteriormente
 office = evt.target.param;

// apagando o conteúdo anterior do mainContent para receber o conteúdo seguinte
 while (mainContent.hasChildNodes()) {
    mainContent.removeChild(mainContent.firstChild);
}
// fazendo um for dentro de for para acessar o número de estudantes por
// sede e geração, inserindo no HTML por fim
  for (var series in data[office]) {
    for (var student in data[office][series]['students'])
      var studentsTotalContainer = document.createElement('div');
      var officeStudents = data[office][series]['students'].length;
      studentsTotalContainer.innerHTML = series;
      studentsTotalContainer.innerHTML += '<p>Total de alunas da turma: '+ officeStudents +'</p>';
      mainContent.appendChild(studentsTotalContainer);

  }

  // var officeName = document.createElement('h1');

  // // if (office = 'AQP') {
  // //   officeName.textContent = 'AREQUIPA';
  // //   mainContent.appendChild(officeName);
  // // } 

  // // if (officeName = 'CDMX') {
  // //   officeName.textContent = 'CIDADE DO MÉXICO';
  // //   mainContent.appendChild(officeName);
  // // } 

  // // if (officeName = 'LIM') {
  // //   officeName.textContent = 'LIMA';
  // //   mainContent.appendChild(officeName);
  // // } else {
  // //   officeName.textContent = 'SANTIAGO DO CHILE';
  // //   mainContent.appendChild(officeName);
  // // }

  detractors();
  aboveAverage();
  netPromoterScores();
  // techOnly();
  teacherAverage();
  jediAverage();
  studentsExpectations();
  studentProfile();
}

function detractors() {
  var sum = 0;
  var totalStudents = 0;
  for (var series in data[office]) {
    for (var student in data[office][series]['students']) {
      totalStudents += 1;
      if (data[office][series]['students'][student]['active'] === false){
        sum += 1;
      }
    }
  }
  var total = parseInt(sum / totalStudents * 100) + '%';

  var totalContainer = document.createElement('div');
  totalContainer.innerHTML = '<p>Total de desistentes: ' + total + '</p>';
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

  var studentPercent = parseInt((totalAboveAverage / totalStudents) * 100);

  var percentContainer = document.createElement('div');
  percentContainer.innerHTML = '<p>Porcentagem de alunas acima da média: ' + studentPercent + '%</p>';
  mainContent.appendChild(percentContainer);

  var quantityContainer = document.createElement('div');
  quantityContainer.innerHTML = '<p>Quantidade de alunas acima da média: ' + totalAboveAverage + '</p>';
  mainContent.appendChild(quantityContainer);

}

// function techOnly() {
//   debugger
//   const TECHMAX = 1800;
//   const HSEMAX = 1200;
//   var tech = [];

//   for (var series in data[office]) {
//     for (var student in data[office][series]['students']) {
//       for (var i in data[office][series]['students'][student]['sprints']) {
//         tech.push(data[office][series]['students'][student]['sprints'][i]['score']['tech']);
//       }
//     }
//   }
//   console.log(tech);
// }

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
  var npsTotal = parseInt((promoters + detractors) / sprintQuantity);

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
   var mediaTeacherPoints = parseInt(teacherPoints / sprintQuantity);

   var teacherPointsContainer = document.createElement('div');
   teacherPointsContainer.innerHTML = 'Média Mentores: ' + mediaTeacherPoints;
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
   var mediaJediPoints = parseInt(jediPoints / sprintQuantity);

   var jediPointsContainer = document.createElement('div');
   jediPointsContainer.innerHTML = 'Média Jedi: ' + mediaJediPoints;
   mainContent.appendChild(jediPointsContainer);
}

function studentesExpectations(){
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
    studentsExpectationContainer.innerHTML = 'Expectativa das Alunas: ' + meetsAndExceedsExpectation + ' cumprem ou superam as expectativas';
    mainContent.appendChild(studentsExpectationContainer);
}

function studentProfile() {
  var profileStudents = 0;

  for (var series in data[office]) {
    for (var student in data[office][series]['students']) {
      var img = document.createElement('img');
      img.src = data[office][series]['students'][student]['photo'];
      mainContent.appendChild(img);
    }
  }
}

// Puedes hacer uso de la base de datos a través de la variable `data`
console.log(data);
