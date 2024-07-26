import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import words from './words';
import Learned from './Learned';
import Card from './Card';
import style from './App.module.css';
import classes from './Buttons.module.css';

function App() {    

  //стейт с массивом слов
  const [base, setBase] = useState([...words]);   
  //переключатель - отображать англ/рус вариант 
  const [toggle, setToggle] = useState(true); 
  // Состояние для выбранного слова
  const [random, setRandom] = useState(getRandomNumber(0, base.length - 1));
  // стейт с объектом (слово на en/ru, status)
  const [textCard, setCard] = useState(() => {return base[random]});
  // состояние базы выученных слов - для сброса
  const [resetText, setResetText] = useState();
  //счетчик выученных слов - при 10 обнуляется
  const [count, setCount] = useState(0);
  //статус показа выученных слов
  const [learnList, setLearn] = useState(true);

  //Функция для генерации случайного числа
  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  //вспомогательная функция для юзэффекта - на случай, 
  //если попадется random выученного слова 
  function reRandom() {return base[getRandomNumber(0, base.length - 1)]};

  useEffect(() => {
    setCard (
      () => {return !base[random].status ? base[random] : {reRandom}} 
            )
                  }, 
                    [random]
  );
   
  //функция кнопки Знаю
  function know() {
    setCount((count) => ++count);  
    let copyBase = [...base];
    copyBase[random].status = true;
    setBase(copyBase);
    setRandom(getRandomNumber(0, base.length - 1));
    if(count >= 10) {shake(base)}; 
  };

  //функция кнопки Не знаю
  function dontKnow() {
    console.log('Не знаю');
    setToggle(false);
    setTimeout(
      function() {
        setToggle(true);
        setRandom(getRandomNumber(0, base.length - 1)); 
                  }, 3000
    );      
  };

  //функция "перемешка" - вызывается по достижении каждых 10 выученных слов
  function shake(base) {
    let copyBase = [...base];
    let arr = base.filter(
      function(item) {
        return item.status;
      }
    )
        
    let anyword = arr[getRandomNumber(0, arr.length - 1)];
      for (let i = 0; i < copyBase.length; i++) {
        if (copyBase[i] === anyword) {
          anyword.status = false; 
          copyBase[i] = anyword; 
          setBase(copyBase);
          setRandom(i);                         
        }
      }   
      
      setCount(0);
  }

  //функция кнопки Сброс
  function reset() {
    let copyBase = [...base];
    
    copyBase.forEach( obj => {obj.status = false;} );//сбрасываем статус всем словам
             
    setBase(copyBase);
    setResetText('Статус выученных слов сброшен');
    setTimeout(
      function() { setResetText(); }, 3000 
    );
  };
  
  //для компонента Rows
  const [tumbler, setTumbler] = useState(false);

  function isStatus(item, index) {
    return item.status ? (<tr key={index}>
                            <td>{item.en}</td>
                            <td>{item.ru}</td>
                            <td>{item.status ? 'да' : 'нет'}</td>
                          </tr>) 
                          : 
                          null;
  };

  function noStatus(item, index) {
    return !item.status ?  (<tr key={index}>
                              <td>{item.en}</td>
                              <td>{item.ru}</td>
                              <td>{item.status ? 'да' : 'нет'}</td>
                            </tr>)
                            : 
                            null;
  };

  function show() {setTumbler(!tumbler)};
  //конец для компонента Rows

  function showLearned() {
    setLearn(!learnList); 
  }

  return (
    <div class = {style.wrap}> 
      <button class = {classes.btn3} onClick={showLearned}>show/hide Learned</button>
    
        {learnList ? 
          <div>
            <Card
              toggle = {toggle}
              textCard = {textCard}
              know = {know}
              dontKnow = {dontKnow}
              resetText = {resetText}
              reset = {reset}
              show = {show}
              showLearned = {showLearned}
            />
          </div>
          :
          <div>
            <Learned 
              base = {base}
              tumbler = {tumbler}
              setTumbler = {setTumbler}
              isStatus = {isStatus}
              noStatus = {noStatus}
              show = {show}
            />
          </div>
        }  
    </div>
  );
}

export default App;