app.controller("LoginController", function ( $rootScope, $scope, $http ) {
    $rootScope.title = 'Login'
   var url = "http://localhost:3000/listStudents";
   $rootScope.isLog = false;
   $http.get(url).then(function (res) {
           $scope.datas = res.data;
           localStorage.clear();

           $scope.login = function () {
               var log = checkLogin($scope.username, $scope.password);

               if (log) {
                   $rootScope.isLog = true;
                   Swal.fire({
                       icon: 'info',
                       title: 'Đăng nhập thành công!',
                       showConfirmButton: false,
                       closeOnClickOutside: false,
                       allowOutsideClick: false,
                       timer: 1600
                   });
                   window.location.href = "#!/home";
               } else {
                   $rootScope.isLog = false;
                   Swal.fire({
                       icon: 'error',
                       title: 'Lỗi!',
                       text: 'Sai tài khoản hoặc mật khẩu!'
                   });
               }
           };

           function checkLogin(user, pass) {
               for (var i = 0; i < res.data.length; i++) {
                   if (res.data[i].username == user && res.data[i].password == pass) {
                       $rootScope.student = res.data[i];
                       window.localStorage.setItem('user', JSON.stringify($rootScope.student));
                       window.localStorage.setItem('userid', JSON.stringify($rootScope.student.id));
                       window.localStorage.setItem('userrole', JSON.stringify($rootScope.student.role));
                       return res.data[i];
                   }
               }
               return false;
           }
       },
   )
});

app.controller("LogoutController", function ( $rootScope, $scope, $http ) {
    document.title = 'Home'
    localStorage.clear()
      window.location = '/'
})