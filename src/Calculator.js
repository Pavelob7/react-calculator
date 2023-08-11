// импортируем React и хук useState, стили из css
import React, {useState} from 'react';
import './Calculator.scss';

function Calculator() {
  //хуки
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  //обработка введенных чисел
  const handleInputChange = (e, inputType) => {
    const inputValue = e.target.value;
    if (inputType === 'num1') {
      setNum1(inputValue);
    } else if (inputType === 'num2') {
      setNum2(inputValue);
    }
  };

  //проверка на то, введены ли оба числа, иначе модальное окно
  const handleCalculation = (operator) => {
    if (!num1 || !num2) {
      setIsModalOpen(true);
      return;
    }

    //ведение рассчетов
    const num1Value = parseFloat(num1);
    const num2Value = parseFloat(num2);

    // метод map
    const operationsMap = {
      '+': (a, b) => (a + b),
      '-': (a, b) => (a - b),
      '×': (a, b) => (a * b),
      '/': (a, b) => (b !== 0 ? (a / b) : 'Ошибка: деление на ноль'), //тернарный оператор
    };

    //сохраняет результат операции
    const calculatedResult = operationsMap[operator](num1Value, num2Value);

    //округление числа до n знаков после запятой, чтобы не было проблем аля 0,1+0,2=0,300...04
    const roundToNDecimals = (number, n) => {
      return Number(number.toFixed(n));
    };

    //округляем до 10 знаков после запятой (можно заменить и выбрать другое значение)
    const resultFormatted = calculatedResult !== 'Ошибка: деление на ноль' ? roundToNDecimals(calculatedResult, 10) : calculatedResult;

    setResult(resultFormatted);

    //очистка полей после операции
    setNum1('');
    setNum2('');
  };

  //массив с операндами, чтобы не писать 4 одинаковые кнопки ниже, а просто брать отсюда значение
  const operations = ['+', '-', '×', '/'];

  //обработка модального окна, точнее закрыто ли оно
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  //объяснение, что творится ниже:
  //основной контейнер с инпутами calculator-container
  //число 1 input-field
  //число 2 input-field
  //создание тех самых кнопок операнд operator-button
  //модальное dialog и создание блюра backdrop (стили блюра см в css)
  //результат result-field

  return (
    <div className="calculator-container">
      <input
        type="number"
        className="input-field"
        placeholder="Введите число"
        value={num1}
        autoFocus
        onChange={(e) => handleInputChange(e, 'num1')}
      />

      <input
        type="number"
        className="input-field"
        placeholder="Введите число"
        value={num2}
        onChange={(e) => handleInputChange(e, 'num2')}
      />

      <div>
        {operations.map((operation) => (
          <button className="operator-button" key={operation} onClick={() => handleCalculation(operation)}>
            {operation}
          </button>
        ))}
      </div>

      {isModalOpen && <div className="backdrop"/>}

      <dialog open={isModalOpen} className="dialog">
        <p>Введите оба числа</p>
        <button onClick={handleCloseModal}>Закрыть</button>
      </dialog>

      <input
        type="text"
        className="result-field"
        placeholder="Результат:"
        value={result}
        readOnly/>
    </div>
  );
}

export default Calculator;
