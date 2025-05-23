// code style: https://github.com/johnpapa/angular-styleguide 

(function() {
  'use strict';
  angular
    .module('app')
    .controller('ChartCtrl', Chart);

    function Chart($scope){
      var vm = $scope;
      vm.p_p_1 = [{data: 70, label: 'Server'}, {data: 30, label: 'Client'}];
      vm.p_p_2 = [{data: 75, label: 'iPhone'}, {data: 20, label: 'iPad'}];
      vm.p_p_3 = [{data: 30, label: 'Server'}, {data: 70, label: 'Client'}];
      vm.p_p_4 = [{data: 10, label: 'Apple'}, {data: 15, label: 'Google'}, {data: 35, label: 'Flatty'}, {data: 45, label: 'Other'}];
      
      vm.p_l_1 = [[1, 6.1], [2, 6.3], [3, 6.4], [4, 6.6], [5, 7.0], [6, 7.7], [7, 8.3]];
      vm.p_l_2 = [[1, 5.5], [2, 5.7], [3, 6.4], [4, 7.0], [5, 7.2], [6, 7.3], [7, 7.5]];
      vm.p_l_3 = [[1, 2], [2, 1.6], [3, 2.4], [4, 2.1], [5, 1.7], [6, 1.5], [7, 1.7]];
      vm.p_l_4 = [[1, 3], [2, 2.6], [3, 3.2], [4, 3], [5, 3.5], [6, 3], [7, 3.5]];
      vm.p_l_5 = [[1, 3.6], [2, 3.5], [3, 6], [4, 4], [5, 4.3], [6, 3.5], [7, 3.6]];
      vm.p_l_6 = [[1, 10], [2, 8], [3, 27], [4, 25], [5, 50], [6, 30], [7, 25]];

      vm.p_b_1 = [[1, 2], [2, 4], [3, 5], [4, 7], [5, 6], [6, 4], [7, 5], [8, 4]];
      vm.p_b_2 = [[3, 1], [2, 2], [6, 3], [5, 4], [7, 5]];
      vm.p_b_3 = [[1, 3], [2, 4], [3, 3], [4, 6], [5, 5], [6, 4], [7, 5], [8, 3]];
      vm.p_b_4 = [[1, 2], [2, 3], [3, 2], [4, 5], [5, 4], [6, 3], [7, 4], [8, 2]];

      vm.world_markers = [
  
          {latLng: [19.4326, -99.1332], name: 'Ciudad de México'}  // Agregado
        ];

      vm.usa_markers = [
          
          {latLng: [19.4326, -99.1332], name: 'Ciudad de México'}  // Agregado
        ];

      vm.cityAreaData = [      
          605.16,
          310.69,
          405.17,
          748.31,
          207.35,
          217.22,
          137.70,
          280.71,
          210.32,
          325.42
      ]
    }
    
})();
