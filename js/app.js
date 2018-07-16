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
      studentsTotalContainer.innerHTML += '<p>Total de alunas: '+ officeStudents +'</p>';
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
  totalContainer.innerHTML = '<p>Total de desistentes: ' + total + '</p>';
  mainContent.appendChild(totalContainer);
}

function aboveAverage() {
  const TECHMAX = 1800;
  const HSEMAX = 1200;
  var totalAboveAverage = 0;
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




// Puedes hacer uso de la base de datos a través de la variable `data`
console.log(data);
