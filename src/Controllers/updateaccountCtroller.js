app.controller('updateaccountCtrl', function ( $rootScope, $scope, $http ) {
    $scope.update = function () {
        var id = $rootScope.studentid;
        var data = {
            username: $rootScope.student.username,
            password: $rootScope.student.password,
            fullname: $scope.student.fullname,
            email: $scope.student.email,
            gender: $scope.student.gender,
            birthday: $scope.student.birthday,
            schoolfee: $scope.student.schoolfee,
            marks: $scope.student.marks,
        }
        // alert($scope.student.birthday);
        window.localStorage.removeItem('user');
        window.localStorage.setItem('user', JSON.stringify(data));
        $http.patch("http://localhost:3000/listStudents/" + id,data).then(function () {
            Swal.fire({
                title: 'Cập Nhật Thành Công thành công',
                icon: 'success',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Có!',
                cancelButtonText: 'Không',
                timer: 1600
            })
        });
        // dataService.updateData(id, data).then(function () {
        //     Swal.fire({
        //         title: 'Cập Nhật Thành Công thành công',
        //         icon: 'success',
        //         showCancelButton: true,
        //         confirmButtonColor: '#3085d6',
        //         cancelButtonColor: '#d33',
        //         confirmButtonText: 'Có!',
        //         cancelButtonText: 'Không',
        //         timer: 1600
        //     })
        // })
        if (localStorage) {
            $rootScope.student = JSON.parse(window.localStorage.getItem('user'));
            console.log($rootScope.student);
        }
    }
});