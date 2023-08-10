app.controller('lichsuthiCtrl', function ( $scope, $rootScope, $http, $filter) {
    $rootScope.title = 'history'
    var iduser1 = localStorage.getItem('userid');
    $rootScope.markHistory = []
    
    $http.get('http://localhost:3000/ketqua').then(function (res) {
        res.data.forEach (item => {
            if (parseInt(item.iduser) === parseInt(iduser1)) {
                item.date = $filter('date')(new Date(item.date), 'dd/MM/yyyy hh:mm:ss');
                $rootScope.markHistory.push(item)
            }
        })
    });

    $scope.begin = 0;
    $scope.pageSize = 3;
    $scope.pageCount = Math.ceil($rootScope.markHistory.length / $scope.pageSize);
    // alert($scope.pageCount);
    
    $scope.last = function(){
        $scope.begin = ($scope.pageCount - 1) * $scope.pageSize;
    }

    $scope.first = function(){
        $scope.begin = 0;
    }
    
    $scope.prev = function() {
        if ($scope.begin > 0) {
            $scope.begin -= $scope.pageSize;
        }
    }
    $scope.next = function() {
        if ($scope.begin < ($scope.pageCount - 1) * $scope.pageSize) {
            $scope.begin += $scope.pageSize;
        }
    }
});

