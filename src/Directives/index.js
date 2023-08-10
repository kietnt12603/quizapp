app.directive('rePass', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, mCtrl) {
            function rePas(value) {
                var pass = scope.studentC.password;
                if (pass == value) {
                    mCtrl.$setValidity('charE', true);
                } else {
                    mCtrl.$setValidity('charE', false);
                }
                return value;
            }
            mCtrl.$parsers.push(rePas);
        }
    }
});

app.directive('rePassRegister', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, mCtrl) {
            function rePas(value) {
                var pass = scope.studentR.password;
                if (pass == value) {
                    mCtrl.$setValidity('charE', true);
                } else {
                    mCtrl.$setValidity('charE', false);
                }
                return value;
            }
            mCtrl.$parsers.push(rePas);
        }
    }
});

app.directive('fee', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, mCtrl) {
            function Sfee(value) {
                var fee = parseInt(value)
                if (fee >= 2000000) {
                    mCtrl.$setValidity('charE', true);
                } else {
                    mCtrl.$setValidity('charE', false);
                }
                return value;
            }
            mCtrl.$parsers.push(Sfee);
        }
    }
});