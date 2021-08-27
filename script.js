 function reverseStr(str){


var listOfChars = str.split('');
var reverseListOfChars = listOfChars.reverse();
var reverseString = reverseListOfChars.join('');


return reverseString;

}

function isPalindrome(str){

var reverse = reverseStr(str);

if(reverse === str){
  return true;
}
else{
  return false;
}
}

function convertDateToStr(date)
 {
    var dateStr = { day: "", month: "", year: "" };

    if(date.day <10) {
        dateStr.day = "0" + date.day;
    }
    else {
        dateStr.day = date.day.toString();
    }

    if(date.month <10) {
        dateStr.month = "0" + date.month;
    }
    else {
        dateStr.month = date.month.toString();
    }

    dateStr.year = date.year.toString();

    return dateStr;
 }

function getAllDateFormats(date){
var datestr = convertDateToStr(date);

var ddmmyyyy = datestr.day + datestr.month + datestr.year;
var mmddyyyy = datestr.month + datestr.day + datestr.year;
var yyyymmdd = datestr.year + datestr.month + datestr.day;
var ddmmyy = datestr.day + datestr.month + datestr.year.slice(-2);
var yymmdd = datestr.year.slice(-2) + datestr.month + datestr.day;


return [ddmmyyyy,mmddyyyy,yyyymmdd,ddmmyy,yymmdd];
}


function checkPalindromeForAllDates(date){
  var palindrome = false;
  var listOfAllDateFormats = getAllDateFormats(date);

  for(var i=0; i < listOfAllDateFormats.length; i++){

    if(isPalindrome(listOfAllDateFormats[i])){
 palindrome = true;
 }
 }
 return palindrome;
}



function ifLeapYear(year){
  if(year % 400 === 0){
    return true;
  }
  if(year % 100 === 0){
    return false;
  }
  if(year%4 === 0){
    return true;
  }
  return false;
}

function getNextDate(date){
var day = date.day +1;
var month = date.month;
var year = date.year;

var totalDaysInEachMonth = [31,28,31,30,31,30,31,31,30,31,30,31];

if (month === 2){
  if(ifLeapYear(year)){
    if(day > 29){
      day = 1;
      month++;
    }
    else{
      if(day > 28){
        day = 1;
        month++;
      }
    }
  }
}
else{
if(day > totalDaysInEachMonth[month-1]){
  day = 1;
  month++;
}
}


if(month > 12){
  month =1;
  year++;
}


 return {
   day : day,
   month : month,
   year: year
 }
}


  function getNextPalindromeDate(date){
    var ctr = 0;
    var nextDate = getNextDate(date);

    while(1) {
      ctr++;
      var nextPalidromeDate = checkPalindromeForAllDates(nextDate);
      if(nextPalidromeDate){
    
       break;
    }
    nextDate = getNextDate(nextDate);
  }
  return [ctr, nextDate];
  }




  var dateInput = document.querySelector(".date-input");
  var checkBirthday = document.querySelector(".check-birthday");
  var output = document.querySelector(".result");

  function clickHandler(){
   
   
   var birthDaystr = dateInput.value;
  



   if(birthDaystr !== 0){
     var listOfDate = birthDaystr.split("-");
   var date = {
     day: Number(listOfDate[2]),
     month: Number(listOfDate[1]),
     year: Number(listOfDate[0])
   };

   var birthdayPalindrome = checkPalindromeForAllDates(date);
     if(birthdayPalindrome){
     output.innerText = "yay your birthday is a palindrome 🥳" ;
     }
     else{
       var [countNext, nextDate] = getNextPalindromeDate(date);
   output.innerText = "oops you missed palidrome birthday by" + " " + countNext + " " + "days 🥺" + "\n" + "the next palindrome date is ->" + " " + nextDate.day + "-" + nextDate.month +  "-" + nextDate.year;
    }
   }


  };



 checkBirthday.addEventListener("click", clickHandler);
