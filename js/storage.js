// Store Data from Home Page -> Mohammed Abdullah 
$("#start").on('click', function () {
        var name = document.getElementById('validationCustomUsername');
        var level1 = document.querySelectorAll("input[type=radio]")[0];
        var level2 = document.querySelectorAll("input[type=radio]")[1];
        localStorage.setItem('name', name.value);
        localStorage.setItem('level1', level1.checked);
        localStorage.setItem('level2', level2.checked);
    });
    