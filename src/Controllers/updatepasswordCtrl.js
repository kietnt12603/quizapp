app.controller("updatepasswordCtrl", function ($scope, $rootScope, $http) {

     $http.get('http://localhost:3000/listStudents/'+ $rootScope.studentid)
    .then(res => {
        $scope.currentUser = res.data
    })


    $scope.change = function () {
        console.log($rootScope.pass, $scope.oldpassword);
        if ($scope.currentUser.password == $scope.oldpassword) {
            if ($scope.currentUser.password == $scope.studentC.password) {
                Swal.fire({
                    icon: 'error',
                    title: 'Mật khẩu mới trùng với mật khẩu cũ!'
                });
            } else {
                var arr = {
                    password: $scope.studentC.password
                }
                
                $http.patch('http://localhost:3000/listStudents/'+ $rootScope.studentid, arr).then(function () {
                    Swal.fire({
                        title: 'Đổi mật khẩu thành công',
                        // text: "Bạn có muốn quay lại trang chủ!",
                        icon: 'success',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Có!',
                        cancelButtonText: 'Không'
                    })
                })
                
                if(localStorage){
                    $rootScope.student = JSON.parse(window.localStorage.getItem('user'));
                    console.log($rootScope.student);
                }else{
                    window.location.href = "#!login";
                }
            }

        } else {
            Swal.fire({
                icon: 'error',
                title: 'Mật khẩu cũ không đúng!'
            });
        }
        $scope.oldpassword = "";
        $scope.studentC.password = "";
        $scope.renewpassword = "";
    }
    
});