var title = 'Please fill required field';
var textContent = 'Please fill required field';
var success = 'Success';
var error = 'Error';
var url = 'https://script.google.com/macros/s/AKfycbzNba4WtngWLihfUOaYoC8hLbMO3eIkYNdNb_DekKZopUBnEe0/exec';
var lang = document.documentElement.lang;

function detect() {
    if (lang.indexOf('vi') != -1) {
        title = 'Khảo sát chưa hoàn thành!';
        textContent = 'Vui lòng điền những mục có dấu * !';
        success = 'Thành công';
        url = 'https://script.google.com/macros/s/AKfycbxaECntApLEZ8r_ovTeDJmc_ESHtbPN8-ewCh73K91Vg_zUF60/exec';
        error = 'Có lỗi';
    }
}

detect();

angular.module('inputBasicDemo', ['ngMaterial', 'ngMessages'])
    .controller('AppCtrl', function ($scope, $mdDialog) {

        $scope.require = {
            exp: false,
            cs: false,
            knowForm: false
        };

        $scope.openDialog = function (t, ct) {
            $mdDialog.show(
                $mdDialog.alert()
                    .clickOutsideToClose(true)
                    .title(t)
                    .textContent(ct)
                    .ok('OK')
                    .openFrom({
                        top: -50,
                        width: 30,
                        height: 80
                    })
                    .closeTo({
                        left: 1500
                    })
            );
        };

        $scope.validate = function () {
            for (var key in $scope.require) {
                $scope.require[key] = false;
            }
            var data = $scope.form;
            var v = true;
            if (!data.exp) {
                $scope.require.exp = true;
                v = false;
            }
            if (!data.cs) {
                $scope.require.cs = true;
                v = false;
            }
            var count = 0;
            for (var key in $scope.knowFrom) {
                if ($scope.knowFrom[key].checked)
                    count++;
            }
            if (count === 0) {
                $scope.require.knowForm = true;
                v = false;
            }
            return v;
        };

        var md = {};
        $scope.form = {};

        var data = parsesParams2(location.search);
        for (var key in data) {
            md[key] = data[key];
            $scope.form[key] = data[key];
        }
        $scope.form = md

        $scope.knowFrom = [
            {name: 'Seach Engine (Google, Bing, CocCoc, etc.)', checked: false},
            {name: 'Newspapers / TV', checked: false},
            {name: 'Social Media (Facebook, etc.)', checked: false},
            {name: 'Referrals from relatives & friends', checked: false}
        ];

        if (lang.indexOf('vi') != -1) {
            $scope.knowFrom = [
                {name: 'Công cụ tìm kiếm (Google, Bing, CocCoc, ...)', checked: false},
                {name: 'Báo giấy, báo mạng, chương trình truyền hình', checked: false},
                {name: 'Mạng xã hội (Facebook, Zalo, ...)', checked: false},
                {name: 'Giới thiệu từ người thân, bạn bè', checked: false}
            ];
        }

        $scope.submitForm = function () {
            var d = $scope.form;
            console.log(d)
            return
            if ($scope.validate()) {
                d.knowFrom = '';
                for (var key in $scope.knowFrom) {
                    if ($scope.knowFrom[key].checked)
                        d.knowFrom += $scope.knowFrom[key].name + '|';
                }
                for (var key in md) {
                    d[key] = md[key];
                }
                submit(d, $scope.openDialog);
            } else {
                $scope.openDialog(title, textContent);
            }

        };
    });

function parsesParams2(query) {
    var re = /([^&=\?]+)=?([^&]*)/g;
    var decodeRE = /\+/g;
    var decode = function (str) {
        return decodeURIComponent(str.replace(decodeRE, " "));
    };
    var params = {}, e;
    while (e = re.exec(query)) {
        var k = decode(e[1]), v = decode(e[2]);
        if (k.substring(k.length - 2) === '[]') {
            k = k.substring(0, k.length - 2);
            (params[k] || (params[k] = [])).push(v);
        }
        else params[k] = v;
    }
    return params;
}

function parseParams(query) {
    var re = /([^&=]+)=?([^&]*)/g;
    var decodeRE = /\+/g;  // Regex for replacing addition symbol with a space
    var decode = function (str) {
        return decodeURIComponent(str.replace(decodeRE, " "));
    };
    var params = {}, e;
    while (e = re.exec(query)) {
        var k = decode(e[1]), v = decode(e[2]);
        if (k.substring(k.length - 2) === '[]') {
            k = k.substring(0, k.length - 2);
            (params[k] || (params[k] = [])).push(v);
        }
        else params[k] = v;
    }
    return params;
}

function submit(data, cb) {
    var _data = {
        ticketID: data.ticketID,
        phoneNumber: data.phoneNumber,
        name: data.name,
        company: data.company,
        route: data.route,
        depDate: data.depDate,
        depTime: data.depTime,
        exp: data.exp,
        expText: data.expText,
        cs: data.cs,
        csText: data.csText,
        feedback: data.feedback,
        knowFrom: data.knowFrom,
        hashCode: data.hashCode
    };

    var form = new FormData();
    for (var key in _data) {
        form.append(key, _data[key]);
    }

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": url,
        "method": "POST",
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form
    };

    $.ajax(settings).done(function (response) {
        var data = JSON.parse(response);
        if (data.result.indexOf('success') != -1) {
            // alert('Submit thành công|' + data.result + '|' + data.row);
            cb(success, success);
        } else {
            cb(error, error);
        }
    });
}