

// GLOBAL

// получаем все инпуты со страницы
const inputs = document.querySelectorAll('.inputbtn');

// получаю результирующий инпут
const resultInput = document.querySelector('.resultBtn');



// ATTACH EVENTS

// ограничваем ввод чего-либо в инпут с результатом
resultInput.addEventListener('keypress', handleKeyPress);


// вешаем обработчик клик на все иппуты
inputs.forEach((input) => {
    input.addEventListener('click', handelClick)
})




// BASIC LOGIC

// функция обрабатывает нажатые кнопки с цифрами
function handelClick(event) {

    // функция ограничвает ввод нулей и * / + если строка ешэ пустая
    if (validateStart(this.value)) {
        return;
    }

        
    // если нажата AC, то полностью очистит поле
    if (this.value === 'AC') {
        clean();
        return;
    }

    if (this.value === 'DE') {
        deleateLastNum();
        return;
    }
    
    // если пользователь нажал =, высчитываем результат через функцию equil
    if (this.value === "=") {
        // если в resultInput.value есть значение, то вызываем equil. иначе передаётся undefined
        if (resultInput.value) {
            equil(resultInput.value)
            return;
        } else {
            return;
        }
    } 

    // добавляем новое значение в resultInput.value, только если validateInput = false. validateInput проверят дублированность символов +-*/
    if (validateInput(this.value)) {
    } else {
        resultInput.value += this.value;
    }
    
}



// функция ограничвает ввод нулей или знаков * / + если строка ещё пустая
function validateStart(value) {

    if (!resultInput.value && (value === '*' || value === '/' || value === '+')) {
        return true;
    }

    // если строка ещё пустая и пользователь ввёл 0 или 00, то ставим точку для создания дроби
    if (!resultInput.value && (value === '0' || value === '00')) {
        resultInput.value += '.';
        return true;
    }
}



// функция проверяет вводимые пользователем символы на дублирование и пресекает их повторения
function validateInput(value) {

    const restrictions = ['..', '.+', '.-', '.*','./', '+.', '-.', '*/', '/.','++', '+-', '-+', '+*', '*+', '+/', '/+','--', '-*', '-/','**', '*-', '*/', '//', '/-', '/*', '*.'];
    
        for (let i of restrictions) {
            if ((resultInput.value + value).includes(i)) {
                return true;
            }
        }
}


// функция высчитывает конечный результат из строки resultInput.value
function equil(res) {
    // функция eval получает строку с вычислениями и выдаёт результат
    let result = eval(res);

    // toFixed ограничвает остаток до 4 чисел после точки и возвращает строку
    result = result.toFixed(5);
    
    // парсим строчное число в обычное, чтобы убрать ненужные нули
    result = parseFloat(result);
    resultInput.value = result;
}


// функция польностью очищает поле ввода
function clean() {
    resultInput.value = '';
}


// функция удаляет последний элемент 
function deleateLastNum() {
    resultInput.value = resultInput.value.slice(0, -1);
}



// функция ограничивает ввод пользователя в инпут, в котором отображается результат
function handleKeyPress(event) {
    event.preventDefault();
}

