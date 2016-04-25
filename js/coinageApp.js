angular.module('coinageApp', [])
.controller('coinageController', function($scope){

  $scope.resetOutput = function(){
    $scope.onepAmount = 0;
    $scope.twopAmount = 0;
    $scope.fiftypAmount = 0;
    $scope.onePoundAmount = 0;
    $scope.twoPoundAmount = 0;
    $scope.parsedCoins = 0;
  }

  $scope.errorCheckInput = function(){
    // GOOD input cases
    // 4             | 4                 | single digit
    // 85            | 85                | double digit
    // 197p          | 197               | pence symbol
    // 2p            | 2                 | pence symbol single digit
    // 1.87          | 187               | pounds decimal
    // £1.23         | 123               | pound symbol
    // £2            | 200               | single digit pound symbol
    // £10           | 1000              | double digit pound symbol
    // £1.87p        | 187               | pound and pence symbol
    // £1p           | 100               | missing pence
    // £1.p          | 100               | missing pence but present decimal point
    // 001.41p       | 141               | buffered zeros
    // 4.235p        | 424               | rounding three decimal places to two
    // £1.257422457p | 126               | rounding with symbols

    // BAD input cases
    // input     | pence (canonical) | description
    //           | 0                 | empty string
    // 1x        | 0                 | non-numeric character
    // £1x.0p    | 0                 | non-numeric character
    // £p        | 0                 | missing digits

    /*
      STEP 1: Scrub whitespace
      STEP 2: Check for decimal
        If decimal, split as pre- and post-decimal.
        Pre-decmal is * 100, as £1 == 100p.
        Take post-decimal raw.
        Add two values.

      master regex:
      /([£]\d+[.]\d+[p]|[£]\d+[.]\d+|[£]\d+|\d+[p]|\d+[.]\d+|\d+)/
    */

    if(String($scope.coinsInput).match(/([£]\d+[.]\d+[p]|[£]\d+[.]\d+|[£]\d+|\d+[p]|\d+[.]\d+|\d+)/) === null){
      $scope.parsedCoin = 0;
    }else{
      $scope.parseInput();
    }
  }

  $scope.parseInput = function(){

    if(String($scope.coinsInput).match(/[.]/) != null){
      var scrubbedInput = String($scope.coinsInput).match(/\d+[.]\d+/)[0];
      // Pull out just the numbers, then round to 2 places.
      var roundedInput = parseFloat(scrubbedInput).toFixed(2);
      var valuesArray = roundedInput.split(".");
      // Multiplay predecimal by 100, because 1 pound = 100 pennies.
      var preDecimal = parseInt(valuesArray[0]) * 100;
      // Round post decimal to 2 places.
      var postDecimal = parseInt(valuesArray[1]);
      $scope.parsedCoins = parseInt(preDecimal) + parseInt(postDecimal);
    }else{
      // This nested if hurts me so bad...........
      // So, if there's a pound, we know these are pounds.
      if(String($scope.coinsInput).match(/[£]/) != null){
        $scope.parsedCoins = String($scope.coinsInput.match(/\d+/)) * 100;
      // If there is a p, it's the pennies.
      }else if(String($scope.coinsInput).indexOf(/[p]/) != null){
        $scope.parsedCoins = String($scope.coinsInput.match(/\d+/));
      // If there's no pound symbol, or penny symbole, then assume it's pennies.
      }else{
        $scope.parsedCoins = String($scope.coinsInput.match(/\d+/));
      }
    }
  }

  $scope.convertCoins = function(){
    $scope.resetOutput();
    $scope.errorCheckInput();

    // Set the remaining coins from the covertion amount.
    // If we use the conversion amount directly, it will change on the frontend, which is bad.
    $scope.coinsLeft = parseInt($scope.parsedCoins);
    while($scope.coinsLeft > 0){
      // While there are still coins remaining to convert, keep pulling out the largest one.
      $scope.findLargestCoin();
    }
  }

  $scope.findLargestCoin = function(){
    // Search for the largest amount which can be pulled out in descending order.
    // Ascending order 
    if($scope.coinsLeft >= 200){
      $scope.twoPoundAmount = Math.floor($scope.coinsLeft / 200);
      $scope.coinsLeft -= $scope.twoPoundAmount * 200;
    }else if($scope.coinsLeft >= 100){
      $scope.onePoundAmount = Math.floor($scope.coinsLeft / 100);
      $scope.coinsLeft -= $scope.onePoundAmount * 100;
    }else if($scope.coinsLeft >= 50){
      $scope.fiftypAmount = Math.floor($scope.coinsLeft / 50);
      $scope.coinsLeft -= $scope.fiftypAmount * 50;
    }else if($scope.coinsLeft >= 2){
      $scope.twopAmount = Math.floor($scope.coinsLeft / 2);
      $scope.coinsLeft -= $scope.twopAmount * 2;
    }else if($scope.coinsLeft == 1){
      $scope.onepAmount = 1;
      $scope.coinsLeft -= 1;
    }
  }

  function init(){
    // Set up the default values.
    $scope.resetOutput();
  }

  init();
});