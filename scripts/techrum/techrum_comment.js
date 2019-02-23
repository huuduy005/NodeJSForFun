const _ = require('lodash');
const request = require('request');

const comments = [
  'Với việc Note 9 tích hợp AI có thể nhận diện rất nhiều chủ thể, bối cảnh khác nhau để đưa ra những cấu hình cho ảnh tốt nhất, một cách tự động mà mình chỉ cần giơ máy lên chụp thôi là cũng đủ đẹp rồi, không cần phải chỉnh sửa nhiều mà vẫn có được bức ảnh đẹp',
  'Camera sau của Note 9 có thể thay đổi khẩu độ để phù hợp với tuỳ điều kiện ánh sáng khác nhau đã giúp mình có những bức ảnh đẹp ở những điều kiện ánh sáng khác nhau',
  'Bút S-Pen nay có thể kêt nối qua bluetooth rất tiện để chụp những tấm hình từ xa mà không phải cần nhờ sự trợ giúp của người khác',
  'Tính năng camera AI Tối Ưu Hóa Bối Cảnh + Mang Đến Những Bức Ảnh Sống Động Nhất, Chụp được tấm hình ưng ý ngay từ lần đầu. Tính năng Tối Ưu Hóa Cảnh từ camera sau có thể dễ dàng phát hiện được đối tượng trong khung hình, sau đó chọn chế độ thích hợp với chủ thể như hoa hoặc món ăn giúp chụp 1 phát là đẹp',
  'Với sự trợ giúp của 2 camera mà Live focus, giúp mình chụp xoá phông những bức ảnh thật đẹp và có phần "chuyên nghiêp" như trên máy cơ nhìn rất "ảo"'
];

function convertNum(number, width = 4) {
  return (new Array(width).join('0') + number).substr(-width);
}

function getComment(number) {
  let comment = _.sample(comments);
  return `${comment} - ${convertNum(number)}`;
}

let user = {
  duy: '_gat=1; _gid=GA1.2.996193125.1544022565; _ga=GA1.2.1568115812.1544022565; __cfduid=d8efaa8def06166021c063a57d61c33031544022563; 55_F0RUM=8fnve9s918f8v1iik7tt5p0vg6; fbsr_2453780094847093=PVToaz3BMqZAutBh1dHrtQU6ZAlK24kHAg0UqCAr-X0.eyJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImNvZGUiOiJBUUJWWTktdEtGaXExVzNGRE85cjFfejRVU0ptc2c0am9uQ2Q1aEQtMGFvcnk1aHd2Y0dGMUdoZW1KeDNzc2pVbXktRHVPWWFtOFR5Ylh4Ql9WcnhPTUZhNzZNdFo1dFFaNkVnVzhIRVB1WUxQLXBmZkpJdEU0c1o3SkJpVUZydWVDQW5UXzJDdlRjOHloVEI4ZVdFUm9WMUlIaVpVVlZNUGxYT0lmRmliQmhYa1dnNjFVcUU1UVZhU0QzRzFfTzVFNVpGQThzZlNtQmNJYWltc1dXTVhuQVh2aTRzdXVrbW5oSkpIUmFPdG5IaTNZY1g5OE4zRGxyU2wzbW9qTGNlMkpfemJRaEtZV05uU1p2dGJGUHZVSHhHRVU2ZHc4VE5jMjllWFNkVzZmZVVMb2pkbGlVRlVTYUZBdWJwZWw2T1N5NDE4ckFieGhoRlBRb3Y1cWFLbVU4UTR3ZzNIcXd4RjZwYWM2T3I3NVotakEiLCJpc3N1ZWRfYXQiOjE1NDQwMjI1OTAsInVzZXJfaWQiOiIyMTIwNzk1NTk4MjUwMzYwIn0',
  dung: '__cfduid=dff0c3afa131409354992ae53c05286ad1543674669; _ga=GA1.2.1733321812.1543674673; __auc=386225431676a2e363d2a1863bf; _gid=GA1.2.1882501707.1544022412; fbsr_2453780094847093=WeTSX5kIVyXb9e9oUI1G6nbHFDauYQd2YrHUO-yqi84.eyJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImNvZGUiOiJBUUNKLXd4Vzc0UlcteDJPMzhaSWpIYVlsaWhNS21rNWl4elVPdzczcjd5X3ZsMHZicGhLWUozUjJmMnQtbk45X3Axd29mRjZpOTdTUlRQdDZFOENWWGt2bGNXUEt1QW5hTWVJT1ZaZm9haTY1MXhrZGR0UDdvYVQ5YmNZZ3pHSFFINGtuTEt6dXhodDFzRkVhcmlBN0xCTnRHUzJSb1UweDdKdUE2aVJRNVZSazViQVFqaFpjQXUxQlNWUnd2a24tRGJDXzRGZUFZNTNwcU53XzMtcXhSZUhaeUZ5VTczVVl3OHhRLVh0ZElFek9GV3M3UU4ySkJRLXZYUzRLVE1mWmlYSm5oTlQ0YXBMYTY4amRob1VVZmJlU1N6eGZhalFVMzJELUV1SzRzR1pVOVBYRFhTYVE0Z09mdXNKX3k4Zk1tUkx3SFBDUDhDaWl2cVVOVmtnN1E2TERhVkdtT0RvMkdOVHhmaHhFQk1tQnciLCJpc3N1ZWRfYXQiOjE1NDQwMjI0NzksInVzZXJfaWQiOiIxNDkzMjc3NTc3NDQyNDEyIn0; 55_F0RUM=fmij07fp5ojhkihs4pih2tktq2',
  ngoc: '_gid=GA1.2.431312152.1544112871; _ga=GA1.2.1568115812.1544022565; __cfduid=d8efaa8def06166021c063a57d61c33031544022563; _gat=1; 55_F0RUM=g95c4flhagiamsdqod93aj5o97; fbsr_2453780094847093=gDpFxfIqeNWUWEmrmW4NFhlxNj3k3meL4uKarVHu4nE.eyJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImNvZGUiOiJBUUFOVG5pQXdzTmJlUk9HNVdZa3JDdG1zYW1ISjNaaTl1V2tDSnQwNTVOM2ZXOGxYc052SFNmc0ZvOVF0Rko2M0FuNjJNMnVMWjJMV3Q1OHd2aXhtZWFUb1pkRHR6VmJkeVdqNG5KajBIVW1vYmxrYVM5SEZtcHlSa2ZaamtsLTJfZzNMN3QybEYtNDFHWVZzMHJWbXJRVm5USmtlUW45TXJqTFRjWlREOWctWkhvSEJaR1hsY05rR0dhbUVOOUY0bkVQQi1hdmpMWm1fYTZ6aERwMU11bEpocUp2VDRpUDZMRmtUd3pIV2VBWTNwLXdQT1hTUDRYd2tZeU1QUEhqQl9FdlhGUG9TVmZEa0Z1XzBkR2drTENlckw4T2FvSFZwcGhDUEoxQkYzTDNFRmJHNWlBdWZ1Zkw1VG1lM3AtVkU2OTEyTTBzcTVuY2xYSkZ1Q01uVFZHNi1ybGhMZXRRcEU2YnJOTWZ1ekpPZVEiLCJpc3N1ZWRfYXQiOjE1NDQxMTMxNTUsInVzZXJfaWQiOiIyMzIyNjMzMDc0NjIwMzUzIn0'
};

function getOptions(mess, name) {
  let cookie = user[name];
  return {
    method: 'POST',
    url: 'http://samsung.techrum.vn/submitComment',
    headers: {
      'cache-control': 'no-cache',
      Connection: 'keep-alive',
      'X-Requested-With': 'XMLHttpRequest',
      Referer:
        'http://samsung.techrum.vn/tin-tuc/chi-tiet/minigame-de-dang-co-anh-song-ao-nghin-like-nho-tinh-nang-nao-co-tren-camera-note9-280',
      Accept: 'application/json, text/javascript, */*; q=0.01',
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36',
      'Accept-Language': 'vi,en-US;q=0.9,en;q=0.8',
      'Accept-Encoding': 'gzip, deflate',
      Origin: 'http://samsung.techrum.vn',
      Cookie: cookie
    },
    form: {
      news_id: '28',
      message: mess
    },
    json: true
  };
}

function pushComments(mess, name) {
  let options = getOptions(mess, name);
  return new Promise((resolve, reject) => {
    request(options, function(error, response, body) {
      if (error) return reject(error);
      resolve(body);
    });
  });
}

async function scripts() {
  let numbers = _.range(10000);
  let filter = [];
  numbers = _.filter(numbers, number => !_.includes(filter, number));
  console.log(numbers.length);
  numbers = _.sampleSize(numbers, 3500 - filter.length);
  console.log(numbers.length);

  let chunks = _.chunk(numbers, 10);

  for (let chunk of chunks) {
    console.log(chunk);
    await Promise.all(chunk.map(number => pushComments(getComment(number), 'ngoc')));
    // await Promise.all(chunk.map(number => pushComments(getComment(number), 'duy')));
  }
}

scripts();
