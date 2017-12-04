console.log(data);

window.addEventListener('load', function() {
  var globalData = document.querySelector('.global-data');
  var sprintAchievement = document.querySelector('.sprint-achievement');
  var hideForTeachers = document.querySelector('.hide-for-teachers');
  var navigator = document.querySelector('.navigator');

  // agregando evento click a la barra de navegacion principal
    navigator.addEventListener('click', showCharts);
    function showCharts(event) {
      console.log('hola')
      if (event.target.getAttribute('value') === 'teachers') {
        globalData.classList.remove('show');
        globalData.classList.add('hide');
      } else if (event.target.getAttribute('value') === 'overview')
        globalData.classList.remove('hide');
        globalData.classList.add('show');
    }

    // evento para los filtros:
    var PLACE = '';
    var CODE = '';
    var SPRINT = '';
    var students = {};
    var placeFilter = document.querySelector('.place-filter');
    var codeFilter = document.querySelector('.code-filter');
    var sprintFilter = document.querySelector('.sprint-filter');

    codeFilter.addEventListener('change', showNumber);

    // funcion del evento change:
    function showNumber(event) {
      PLACE = placeFilter.value;
      CODE = this.value;
      students = data[PLACE][CODE]['students'];
      console.log(students)

      // agregando datos:

    // estudiantes activos por sede :
    var enrollmentStudents = document.querySelector('.enrollment-students');
    enrollmentStudents.textContent = totalActive(PLACE, CODE, 'active');

    // porcentaje de desercion:
    var dropout = document.querySelector('.dropout');
    dropout.textContent = desertionPercentage(PLACE, CODE);

    var teacherRatings = document.querySelector('.teacher-ratings');
    teacherRatings.textContent = TeachersPoints(PLACE, CODE);

    var jediMasterRatings = document.querySelector('.jedi-master-ratings');
    jediMasterRatings.textContent = jediMasterPoints(PLACE, CODE);

    var studentsSatisfaction = document.querySelector('.students-satisfaction');
    studentsSatisfaction.textContent = satisfied(PLACE,CODE);

    var netPromoterScore = document.querySelector('.nps');
    netPromoterScore.textContent = npsOfSprints(PLACE, CODE);

    var promotersPercentage = document.querySelector('.promoters');
    promotersPercentage.textContent = promoters(PLACE, CODE) + '%';

    var detractorsPercentage = document.querySelector('.detractors');
  detractorsPercentage.textContent = detractors(PLACE, CODE) + '%';

  var pasivePercentage = document.querySelector('.pasive');
  pasivePercentage.textContent = pasive(PLACE, CODE) + '%';



    function totalActive(place, code, activeOrNotActive) {
      var isActive = 0;
      var isNotActive = 0;
      for (var i = 0 ; i < data[place][code].students.length; i++) {
        if (data[place][code].students[i].active === true && activeOrNotActive === 'active') {
          isActive++;
        } else if (data[place][code].students[i].active === false && activeOrNotActive === 'notActive') {
          isNotActive++;
        }
      }
      if (activeOrNotActive === 'active') {
        return isActive;
      } else if (activeOrNotActive === 'notActive') {
        return isNotActive;
      }
    }

    // FUNCION QUE CALCULA EL PORCENTAJE DESERCION:
  function desertionPercentage(place, code) {
    var totalStudents = totalActive(place, code, 'active') + totalActive(place, code, 'notActive');
    return parseFloat(((totalActive(place, code, 'notActive') / totalStudents) * 100).toFixed(1)) ;
  }

  // funcion que saca el promedio de los puntajes de los profesores   (todos los sprints)
function TeachersPoints(place, code) {
  var listOfCodes = data[place];
  // var arrayPrueba= []
  var sum = 0;
  var promocion = listOfCodes[code];
  var students = promocion.students;
  var ratings = promocion.ratings;
  for (var i = 0 ; i < ratings.length ; i++) {
  // arrayPrueba.push(ratings[i].teacher)  ;
    sum += ratings[i].teacher;
  }
  var average = sum / ratings.length;
  return average.toFixed(1);
}

// funcion que saca el promedio de los puntajes de los jedi-master   (todos los sprints)

function jediMasterPoints(place, code) {
  var listOfCodes = data[place];
  var sum = 0;
  var promocion = listOfCodes[code];
  var students = promocion.students;
  var ratings = promocion.ratings;
  for (var i = 0 ; i < ratings.length ; i++) {
    sum += ratings[i].jedi;
  }
  var average = sum / ratings.length;
  return average.toFixed(1);
}

// para calcular la satisfaccion de los estudiantes :


function satisfied(place,code) {
  var ratings = data[place][code].ratings;
  var sumPercent= 0;
    for (var i = 0; i < ratings.length; i++) {
      sumPercent = sumPercent + ratings[i]['nps']['promoters'];
    }

    var averageSatisfied = sumPercent/ratings.length
    return averageSatisfied.toFixed(2);
  }

  // funcion que calcula el net promoter score :
  function npsOfSprints(place, code) {
    var listOfCodes = data[place];
    var anwersContainer = [];
    var sum = 0;
    var totalAnswers = 0;
    var promocion = listOfCodes[code];
    var students = promocion.students;
    var ratings = promocion.ratings;
    for (var i = 0 ; i < ratings.length ; i++) {
      // para promoters
      anwersContainer.push(ratings[i].nps.promoters - ratings[i].nps.detractors);
    }
    for (var j = 0 ; j < anwersContainer.length;j++) {
      sum += anwersContainer[j];
    }
    return sum / anwersContainer.length;
  }

  // funcion que calula promoters :
function promoters(place, code) {
  var sum = 0;
  var array = data[place][code].ratings;
  for (var i = 0 ; i < array.length ; i++) {
    sum += data[place][code].ratings[i].nps.promoters;
  }
  return sum / array.length;
}

function detractors(place, code) {
    var sum = 0;
    var array = data[place][code].ratings;
    for (var i = 0 ; i < array.length ; i++) {
      sum += data[place][code].ratings[i].nps.detractors;
    }
    return sum / array.length;
  }

  function pasive(place, code) {
    var sum = 0;
    var array = data[place][code].ratings;
    for (var i = 0 ; i < array.length ; i++) {
      sum += data[place][code].ratings[i].nps.passive;
    }
    return sum / array.length;
  }



    }



});
