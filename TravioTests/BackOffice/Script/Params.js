﻿var m_process =
    {
      processId: 0,
      name: "*Travio.BackOffice*"
    };
    

var m_auth =
{
  id: 0, //изменить значение в зависимости от проверяемой роли. Значения от 0 до 3
        //0 - Администратор, 1 - Оператор, 2 - Поверитель, 3 - некорректный логин
  name:["Administrator","Operator","Poveritel","ErrName"],
  bool_pass: true,//корректность пароля
  password:["err","1"],
};


var tab_map = new Map ([
    ['Устройства', 3],['Архив',1],['Поверка времени кадра',2],
    ['Поверка интервалов времени',2],['Схема',3],['Привязка к карте',1], 
    ['Поверка радара',2],['Режим работы',1],['Аналитика',1],
    ['Проверка размеров ГРЗ',0],['Правила',1], ['Технологические параметры',0],
    ['Поверка системы',2],['Права',0],
    ]);
    
function main()
{
tab_map.get("")
  for(let key of tab_map.keys())
  {

    var a = tab_map.get(key);
  }
}

module.exports =
{
  m_auth:m_auth,
  tab_map:tab_map
};