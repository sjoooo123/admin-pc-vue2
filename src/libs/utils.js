import Vue from "vue";

/**
 * number 要转换的数值
 * places 保留小数位数
 * symbol 货币符号
 * thousand 整数部分千位分隔符
 * decimal 小数分隔符
*/
export function formatMoney (number, places, symbol, thousand, decimal) {
    var negative,
        i,
        j;

    number = number || 0;
    places = !isNaN(places = Math.abs(places)) ? places : 2;
    symbol = symbol !== undefined ? symbol : "￥";
    thousand = thousand || ",";
    decimal = decimal || ".";
    negative = number < 0 ? "-" : "",
    i = String(parseInt(number = Math.abs(Number(number) || 0).toFixed(places), 10)),
    j = (j = i.length) > 3 ? j % 3 : 0;

    return (
        symbol +
        negative +
        (j ? i.substr(0, j) + thousand : "") +
        i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) +
        (places ?
            decimal +
            Math.abs(number - i)
                .toFixed(places)
                .slice(2) :
            "")
    );
}

/**
 * 金额千元分割
 */

export const splitK = num => {
    if (num === null || num === undefined || num === '') {
        return
    }
    const decimal = String(num).trim().split('.')[1] || '',
        tempArr = [],
        revNumArr = String(num).trim().split('.')[0].split("").reverse()

    for (const i in revNumArr) {
        tempArr.push(revNumArr[i]);
        if ((i + 1) % 3 === 0 && i !== revNumArr.length - 1) {
            tempArr.push(',')
        }
    }
    const zs = tempArr.reverse().join('')

    return decimal ? zs + '.' + decimal : zs + '.00'
}

//工具函数，获取element日期选择器返回值
export function getEleDatePickerValue (dataValue, index = 0) {
    if (Vue.$lodash.isArray(dataValue)) {
        return dataValue[index] ? dataValue[index] : "";
    }
    return "";
}

// 获取url中的参数
export function getUrlParam (name) {
    const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"), //构造一个含有目标参数的正则表达式对象
        r = window.location.search.substr(1).match(reg); //匹配目标参数

    if (r !== null) {
        return decodeURIComponent(r[2]);
    }
    return null; //返回参数值
}

// csv导出数据处理

export function exrpotCsv (data) {
    let blobUrl = new Blob(["\ufeff" + data]);

    if ("download" in document.createElement("a")) {
        const elink = document.createElement("a");

        elink.download = "导出.csv";
        elink.style.display = "none";
        elink.href = URL.createObjectURL(blobUrl);
        document.body.appendChild(elink);
        elink.click();
        URL.revokeObjectURL(elink.href);
        document.body.removeChild(elink);
    } else {
        navigator.msSaveBlob(blobUrl, "fileName");
    }
}

// excel导出数据处理
export function exportExcel (data) {
    let blobUrl = new Blob([data]);

    if ("download" in document.createElement("a")) {
        const elink = document.createElement("a");

        elink.download = "导出.xls";
        elink.style.display = "none";
        elink.href = URL.createObjectURL(blobUrl);
        document.body.appendChild(elink);
        elink.click();
        URL.revokeObjectURL(elink.href);
        document.body.removeChild(elink);
    } else {
        navigator.msSaveBlob(blobUrl, "fileName");
    }
}

// 手机号加密
export function encryptionPhone (phone) {
    if (!phone) {
        return "";
    }
    let tel = String(phone);

    return tel.substr(0, 3) + "******" + tel.substr(8);
}

//唯一标识

export function Guid () {
    function s4 () {
        return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
    }
    return (
        s4() +
        s4() +
        "-" +
        s4() +
        "-" +
        s4() +
        "-" +
        s4() +
        "-" +
        s4() +
        s4() +
        s4()
    );
}

//颜色值转换
export function hexToRgb (scolor) {
    var b = [], i, a;

    for (i = 0; i < 3; i++) {
        a = "0x" + scolor.substr(i * 2, 2);
        b.push(parseInt(a, 10).toString(10));
    }
    return b;
}
//根据字符串创建日期
export function newDate (dateString) {
    if (typeof dateString === "undefined") {
        return;
    }
    if (typeof dateString !== "string") {
        dateString = dateString.toString();
    }
    let _thatT = dateString.replace("T", " "),
        _y = _thatT.substr(0, 4),
        _m = _thatT.substr(5, 2) - 1,
        _d = _thatT.substr(8, 2),
        _hh = _thatT.substr(11, 2) || "00",
        _mm = _thatT.substr(14, 2) || "00",
        _ss = _thatT.substr(17, 2) || "00",
        _thatDay = new Date(_y, _m, _d, _hh, _mm, _ss);

    return _thatDay;
}
//计算相差天数
export function dayDiff (day1, day2) {
    var _d =
        new Date(newDate(day2)).getTime() -
        new Date(newDate(day1)).getTime();

    return Math.ceil(_d / 24 / 3600 / 1000);
}
//根据时间差获得新的日期
export function dayStringNew (day, num) {
    var _d = new Date(newDate(day)).getTime() + num * 24 * 3600 * 1000;

    return new Date(_d).format("yyyy-MM-dd");
}

/**
 *	人民币小写金额转换为大写
*/
export const digitUppercase = (n) => {
    let fraction = ['角', '分'],
        digit = [
            '零', '壹', '贰', '叁', '肆',
            '伍', '陆', '柒', '捌', '玖'
        ],
        unit = [
            ['元', '万', '亿'],
            ['', '拾', '佰', '仟']
        ],
        head = n < 0 ? '欠' : ''

    n = Math.abs(n)
    let s = ''

    for (let i = 0; i < fraction.length; i++) {
        s += (digit[Math.floor(Math.floor(n * 10 * 100 * Math.pow(10, i)) % (10 * 100) / 100)] + fraction[i]).replace(/零./, '')
    }
    s = s || '整'
    n = Math.floor(n)
    for (let i = 0; i < unit[0].length && n > 0; i++) {
        let p = ''

        for (let j = 0; j < unit[1].length && n > 0; j++) {
            p = digit[n % 10] + unit[1][j] + p
            n = Math.floor(n / 10)
        }
        s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s
    }
    return head + s.replace(/(零.)*零元/, '元')
        .replace(/(零.)+/g, '零')
        .replace(/^整$/, '零元整')
}

/**
*	获取字符串长度（汉字算两个字符，字母数字算一个）
*/
export const getByteLen = (val) => {
    let len = 0

    for (let i = 0; i < val.length; i++) {
        let a = val.charAt(i)

        if (a.match(/[^\x00-\xff]/ig) !== null) { // eslint-disable-line
            len += 2
        } else {
            len += 1
        }
    }
    return len
}

/**
 *	动态加载脚本
*/
export const loadScript = (id, src, callback) => {
    let remoteDom = document.getElementById(id)

    if(remoteDom){
        return;
    }

    let script = document.createElement('script');

    script.id = id
    script.src = src;
    callback && script.addEventListener('load', function () {
        callback();
    }, false);

    document.body.appendChild(script);
}

export const chineseNumber = (num) => {
    let bits = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九'],
        si = String(num),
        sd = ''

    if (si.length === 1) {
        sd += bits[num % 10]
        return sd
    } else if (si.length === 2) {
        if (si.substring(0, 1) === '1') {
            sd += '十'
        } else {
            sd += bits[parseInt(num / 10, 10) % 10] + '十'
        }
        sd += chineseNumber(num % 10)
    } else if (si.length() === 3) {
        sd += bits[parseInt(num / 100, 10) % 10] + '百'
        if (String(num % 100).length() < 2) {
            sd += '零'
        }
        sd += chineseNumber(num % 100)
    } else if (si.length() === 4) {
        sd += bits[parseInt(num / 1000, 10) % 10] + '千'
        if (String(num % 1000).length() < 3) {
            sd += '零'
        }
        sd += chineseNumber(num % 1000)
    } else if (si.length() === 5) {
        sd += bits[parseInt(num / 10000, 10) % 10] + '万'
        if (String(num % 10000).length < 4) {
            sd += '零'
        }
        sd += chineseNumber(num % 10000)
    }
    return sd
}

/**
 * 字符串转换为16进制
 * @param str 字符串
 */
export const stringToHexCharCode = (str) => {
    if (str === "") {
        return "";
    }
    const hexCharCode = [];

    for (let i = 0; i < str.length; i++) {
        hexCharCode.push(str.charCodeAt(i).toString(16));
    }
    return hexCharCode.join("");
};

//全屏和退出全屏
export function fullscreen (div) {
    if (!div) {
    // 退出全屏
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
        if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
        if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        }
        if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    } else {
    // 进入全屏
        if (div.requestFullscreen) {
            div.requestFullscreen();
        }
        if (div.webkitRequestFullScreen) {
            div.webkitRequestFullScreen();
        }
        if (div.mozRequestFullScreen) {
            div.mozRequestFullScreen();
        }
        if (div.msRequestFullscreen) {
            div.msRequestFullscreen();
        }
    }
}
// 根据身份证号码获取生日
export function getBirthdayFromIdCard (idCard) {
    var birthday = "";

    if (idCard !== null && idCard !== "") {
        if (idCard.length === 15) {
            birthday = "19" + idCard.substr(6, 6);
        } else if (idCard.length === 18) {
            birthday = idCard.substr(6, 8);
        }
        birthday = birthday.replace(/(.{4})(.{2})/, "$1-$2-");
    }
    return birthday;
}
export function getSexFromIdCard (idCard) {
    var last = idCard[idCard.length - 2];

    if (last % 2 !== 0) {
        return 1;
    }
    return 0;

}

//获取这个月第一天
export function getFirstDay () {
    var myDate = new Date();

    let year = myDate.getFullYear(),
        month = myDate.getMonth() + 1 < 10 ? '0' + (myDate.getMonth() + 1) : myDate.getMonth() + 1

    return year + '-' + month + '-01';
}
//获取今天
export function getThisDay () {
    var myDate = new Date();

    let year = myDate.getFullYear(),
        month = myDate.getMonth() + 1 < 10 ? '0' + (myDate.getMonth() + 1) : myDate.getMonth() + 1,

        date = myDate.getDate() < 10 ? '0' + myDate.getDate() : myDate.getDate()

    return year + '-' + month + '-' + date;
}

// 格式化序号:2位1->01
export function getIndex (idx) {
    let orign = String(idx);

    if (orign.length <= 1) {
        orign = "0" + orign;
    }
    return orign;
}