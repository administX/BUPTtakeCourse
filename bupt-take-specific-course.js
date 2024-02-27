// https://github.com/Durden-T/BUPTtakeCourse

var courses = [
    //'量子信息论',
    //'量子计算导论',
    //'网络空间安全学科论文写作指导1班',
    //'自然辩证法概论27班',
    //'研究生英语国际学术交流8班',
    //'移动自组织网络安全',
];
//抢课时间间隔，单位为ms，抢课50ms, 捡漏300ms
var interval = 300;
//禁止改动
var targets = [];

var running;

function getCourses() {
    let params = {
        sEcho: 1,
        iColumns: 11,
        iDisplayStart: 0,
        iDisplayLength: 99999,
    };
    let paths = [
        '/jsxsd/xsxkkc/xsxkBxxk', //必修
        '/jsxsd/xsxkkc/xsxkXxxk', //选修
        '/jsxsd/xsxkkc/xsxkGgxxkxk', //公选
    ];
    for (let path of paths)
        $.post(path, params, processData);
}

function processData(resp) {
    let data = $.parseJSON(resp).aaData;
    for (let course of data)
        if (courses.indexOf(course.kcmc) != -1)
            targets.push([course.kch, course.jx0404id]);
}

function takeCourses(targets) {
    if (!targets.length)
        getCourses();
    for (let target of targets)
        $.ajax({
            url: "/jsxsd/xsxkkc/xxxkOper",
            data: {
                kcid: target[0],
                jx0404id: target[1]
            }
        });

    console.log('running......');
}

function start() {
    running = window.setInterval(takeCourses, interval, targets);
    console.log('start');
}

function stop() {
    window.clearInterval(running);
    console.log('stop');
}

start();
