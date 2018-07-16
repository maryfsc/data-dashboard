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
      studentsTotalContainer.innerHTML += '<p>'+ officeStudents +'</p>';
      mainContent.appendChild(studentsTotalContainer);

  }
  detractors();
  aboveAverage();
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
  totalContainer.innerHTML = total;
  mainContent.appendChild(totalContainer);
}

function aboveAverage() {
  debugger
  for (var series in data[office]) {
    for (var student in data[office][series]['students']) {
      for (var sprints in data[office][series]['students'][student]) {
        for (var i in data[office][series]['students'][student]['sprints']){
          for (var score in data[office][series]['students'][student]['sprints'][i]['score']){
            var tech = data[office][series]['students'][student]['sprints'][i]['score'][0];
            var hse = ['score'][1];
            var total = tech + hse;
            console.log(tech);
          }
        }
      }
    }
  }
}




// Puedes hacer uso de la base de datos a través de la variable `data`
console.log(data);
