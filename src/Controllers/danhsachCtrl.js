app.controller('danhsachCtrl', function ( $rootScope, $scope, $http ) {
    $rootScope.title = 'danhsach'

    $rootScope.danhsachsv = []


    $http.get('http://localhost:3000/listStudents').then( res => {
        $rootScope.danhsachsv = res.data
    })

    if($rootScope.isLog == false){
        Swal.fire({
            icon: 'info',
            title: 'Vui Lòng Đăng Nhập!',
            showConfirmButton: false,
            closeOnClickOutside: false,
            allowOutsideClick: false,
            timer: 1600
        });
        window.location.href = "#!/home";
    }
    $scope.role = $rootScope.student.role;

    $scope.deletes = function(id){
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                $http.delete("http://localhost:3000/listStudents/" + id).then(function () {
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                      ) 
                });
            }
          })
    };

    $scope.addsv = function(){
        var data = {
            username:$scope.addsv.user,
            password:$scope.addsv.pass,
            fullname:$scope.addsv.fullname,
            email:$scope.addsv.email,
            gender:$scope.addsv.gender,
            birthday:$scope.addsv.birthday,
            schoolfee:$scope.addsv.schoolfee,
            role:0
        }
        console.log(data);
        $http.post("http://localhost:3000/listStudents",data).then(function(){
            alert('Thành Công');
        });
    }
    
    $scope.begin = 0;
    $scope.pageSize = 3;
    $scope.pageCount = Math.ceil($rootScope?.danhsachsv?.length / $scope.pageSize);
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