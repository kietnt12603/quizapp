app.controller("QuizzController", function ($rootScope, $scope, $http) {
  document.title = "Quizz";
  $rootScope.title = "cousers";
  $scope.dataQuizz = [];
  $scope.pageArr = [];
  $scope.page = 0;
  $scope.activePage = 0;

  $http.get("http://localhost:3000/listSubjects").then((res) => {
    $scope.dataQuizz = res.data;
    for (var i = 1; i <= Math.ceil(res.data.length / 8); i++) {
      $scope.pageArr.push(i);
    }
  });

  $scope.showDetail = function (id) {
    $scope.dataQuizz.forEach((data) => {
      if (data.Id === id) {
        data.showDetail = true;
      }
    });
  };

  $scope.hideDetail = () => {
    $scope.dataQuizz.forEach((item) => {
      item.showDetail = false;
    });
  };

  $scope.gotoPage = (index) => {
    console.log(index);
    if (index > 0) {
      $scope.page = 8 * index;
      $scope.activePage = index;
    } else {
      $scope.page = 0;
      $scope.activePage = index;
    }
  };
});




app.controller(
  "QuizzDetailController",
  function ($rootScope, $scope, $http, $routeParams, $interval) {
    if (!$rootScope.student) {
      window.location = "index.html#!/login";
    } else {
      document.title = `Quizz ${$routeParams.id}`;
      $rootScope.title = "quizzDetail";
      $scope.dataQuizz = [];
      $scope.curentQuizz = {};
      $scope.totalQuizz = 20;
      $scope.showQuestion = 0;
      $scope.endQuizz = false;
      $scope.passQuestion = 0;
      $scope.minuteTimeQuizz = 9
      $scope.secondTimeQuizz = 59
      $scope.formComfim = false
      $scope.titleConfim = ""
      $scope.functionComfim = ""

      $http.get("http://localhost:3000/listSubjects").then((res) => {
        res.data.forEach((data) => {
          if (data.Id === $routeParams.id) {
            $scope.curentQuizz = data;
          }
        });
      });

      $http.get("src/Models/Quizs/" + $routeParams.id + ".js").then((res) => {
        $scope.dataQuizz = res.data;
      });

      $scope.prevQuestion = () => {
        if ($scope.showQuestion > 0) {
          $scope.showQuestion = $scope.showQuestion - 1;
        }
      };

      $scope.nextQuestion = () => {
        if ($scope.showQuestion < $scope.totalQuizz - 1) {
          $scope.showQuestion = $scope.showQuestion + 1;
        }
      };

      $scope.chooseQuestion = (index) => {
        $scope.showQuestion = index;
      };

      $scope.answerTampolary = (answer, quizz) => {
        $scope.dataQuizz.forEach((data) => {
          if (data.Id === quizz) {
            data.answerTampolary = answer;
          }
        });
      };


      $scope.ConfirmSaveQuizz = () => {
        $scope.titleConfim = "Bạn có chắc chắn muốn kết thúc bài thi không?"
        $scope.formComfim = true
        $scope.functionComfim = "saveQuizz"
      }

      $scope.OutQuizz = () => {
        $scope.titleConfim = "Bạn có chắc chắn muốn thoát không?"
        $scope.formComfim = true
        $scope.functionComfim = "outQuizz"
      }

      $scope.CancelConfim = () => {
         $scope.formComfim = false
      }

      $scope.PassConfim = () => {
        console.log($scope.functionComfim);
        $scope.functionComfim === "saveQuizz" && $scope.saveQuizz()
        $scope.functionComfim === "outQuizz" && $scope.outQuizz()
      }

      $scope.outQuizz = () => {
        window.location = '#!/cousers'
      }

      $scope.saveQuizz = () => {
       
          $scope.formComfim = false
        
          for (var i = 0; i < $scope.totalQuizz; i++) {
            if (
              $scope.dataQuizz[i].answerTampolary === $scope.dataQuizz[i].AnswerId
              ) {
                $scope.dataQuizz[i].resulf = true;
                $scope.passQuestion += 1;
              } else {
                $scope.dataQuizz[i].resulf = false;
              }
            }
  
            $scope.endQuizz = true;
        
      };

      $scope.completeQuizz = () => {
             $http.post('http://localhost:3000/ketqua', {
                id: Math.floor(Math.random() * 1000) + 1,
                subject: $scope.curentQuizz.Name,
                iduser: $rootScope.studentid,
                mark: 1 * $scope.passQuestion,
                date: new Date()
            }
          )
          $scope.outQuizz()
      }

        var timer = $interval( function () {
          if ($scope.minuteTimeQuizz > 0) {
            $scope.secondTimeQuizz--
            if ( $scope.secondTimeQuizz === 0 ) {
              $scope.secondTimeQuizz = 59
              $scope.minuteTimeQuizz--
            }
          } else {
            $interval.cancel(timer);
            $scope.saveQuizz()
          }
        }, 1000);
    }
  }
);
