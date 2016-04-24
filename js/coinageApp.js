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

  $scope.parseInput = function(){
    // thing
  }

  $scope.convertCoins = function(){
    $scope.resetOutput();

    // Set the remaining coins from the covertion amount.
    // If we use the conversion amount directly, it will change on the frontend, which is bad.
    $scope.coinsLeft = $scope.coinsInput;
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
    $scope.coinsInput = 0;
    $scope.resetOutput();
  }

  init();
});