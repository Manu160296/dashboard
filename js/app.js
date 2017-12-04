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

    }



});
