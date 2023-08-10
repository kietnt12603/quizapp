app.controller('registerCtrl', function ($rootScope, $scope,$http) {
    $rootScope.title = "register";
    $scope.register = function () {
        // e.preventDefault()
        var a = {
            id: Math.floor(),
            username: $scope.studentR.username,
            password: $scope.studentR.password,
            fullname: $scope.studentR.fullname,
            email: $scope.studentR.email,
            gender: $scope.studentR.gender,
            birthday: $scope.studentR.birthday,
            schoolfee: $scope.studentR.schoolfee,
            role:0,
            // marks: $scope.studentR.marks,
            // image: "profile1.jpg"
        }
        console.log(a);
        $http.post("http://localhost:3000/listStudents",a).then(
                function () {
                    // alert('Đăng Ký Thành Công');
                    Swal.fire({
                        icon: 'success',
                        title: 'Đăng ký thành công!',
                        showConfirmButton: true,
                        closeOnClickOutside: true,
                        allowOutsideClick: true,
                        timer: 10000
                    });
                    setTimeout('redirect()', 10000);
                    $('#load').load(location.href + " #load");
                    window.location.href = "#!register";
                },
                function () {
                    alert("false");
                }
            );
    };
});