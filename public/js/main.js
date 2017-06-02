angular.module('inputBasicDemo', ['ngMaterial', 'ngMessages'])
    .controller('AppCtrl', function ($scope) {
        $scope.form = {
            ticketID: ''
        };

        var md = {};

        var data = parsesParams2(location.search);
        for (var key in data) {
            md[key] = data[key];
            $scope.form[key] = data[key];
        }
        console.log(md);
        console.log($scope.form);


        // angular.element(document).ready(function () {
        //     var data = parsesParams2(location.search);
        //     for (var key in data) {
        //         md[key] = data[key];
        //         $scope.form[key] = data[key];
        //     }
        //     console.log(md);
        //     console.log($scope.form);
        // });

        $scope.knowFrom = [
            {name: 'Công cụ tìm kiếm (Google, Bing, CocCoc, ...)', checked: false},
            {name: 'Báo giấy, báo mạng, chương trình truyền hình', checked: false},
            {name: 'Mạng xã hội (Facebook, Zalo, ...)', checked: false},
            {name: 'Giới thiệu từ người thân, bạn bè', checked: false}
        ];

        $scope.submitForm = function () {
            console.log($scope.form);
            var d = $scope.form;
            d.knowFrom = '';
            for (var key in $scope.knowFrom) {
                if ($scope.knowFrom[key].checked)
                    d.knowFrom += $scope.knowFrom[key].name + '|';
            }
            for (var key in md) {
                d[key] = md[key];
            }
            submit(d);
        };

        $scope.checkBox = function (item) {
            console.log(item);
        }
    });

function parsesParams2(query) {
    var re = /([^&=\?]+)=?([^&]*)/g;
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

function submit(data) {
    console.log(data);

    var _data = {
        ticketID: data.ticketID,
        phoneNumber: data.phoneNumber,
        name: data.name,
        nhaxe: data.nhaxe,
        route: data.route,
        depDate: data.depDate,
        depTime: data.depTime,
        exp: data.exp,
        expText: data.expText,
        cs: data.cs,
        csText: data.csText,
        feedback: data.feedback,
        knowFrom: data.knowFrom,
        hashCode: 'TESdT'
    };
    console.log(_data);

    var form = new FormData();
    for (var key in _data) {
        form.append(key, _data[key]);
    }

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://script.google.com/macros/s/AKfycbx4uwFbS9J4biuUWldxqk4M7t-GXbYS9N02mwihM-GI7piHNA/exec",
        "method": "POST",
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form
    };
    console.log(settings);

    $.ajax(settings).done(function (response) {
        console.log(response);
    });
}