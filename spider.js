var sys = require("sys"),
    http = require("http"),
    fs = require("fs");
var url = "http://newbbs.fengniao.com/forum/forum_125.html";
var data = "";
//创建正则，过滤html
var reg = /<div\s*class="recommendSub">\s*<a\s*href="(.*?)"\s*class="pic"\s*title="(.*?)"/g;
var result = [],
    timeStamp = 0;
// 创建一个请求
var req = http.request(url, function (res) {
    // 设置显示编码
    timeStamp = new Date().getTime();
    res.setEncoding("utf8");
    res.on('data', function (chunk) {
        data += chunk;
    });
    // 响应完毕时间出发，输出 data
    res.on('end', function () {
        while (match = reg.exec(data)) {
            result.push({
                title: match[1],
                url: match[2]
            });
        }
        writeFile(result);
    });
});
// 发送请求
req.end();
function writeFile(r) {
    var str = '';
    for (var i = 0, _len = r.length; i < _len; i++) {
        str += r[i].title + '\n' + r[i].url + '\n';
    }
    //数据拼接结束后，写入s.txt文件
    fs.writeFile('s.txt', str, function (err) {
        if (err) {
            throw err;
        }
        console.log('耗时约' + Math.ceil((new Date().getTime() - timeStamp) / 1000) + 's');
        console.log('数据已写入文件');
    });
}