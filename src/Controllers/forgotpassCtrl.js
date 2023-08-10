app.controller('forgotpasswordCtrl', function ($rootScope, $scope, $http) {
    var url = "http://localhost:3000/listStudents";
    $http.get(url).then(
        function (res) {
            $scope.getPass = function () {
                var ck = true;
                for (var i = 0; i < res.data.length; i++) {
                    if ($scope.username == res.data[i].username && $scope.email == res.data[i].email) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Lấy lại tài khoản thành công!',
                            text: 'Mật khẩu: ' + res.data[i].password,
                        });
                        ck = false;
                        return;
                    }
                }
                
                if (ck) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Lấy lại tài khoản thất bại!',
                        text: 'Vui lòng nhập lại thông tin',
                    });
                }
            }
        }
    );

});
