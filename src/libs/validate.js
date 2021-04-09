/* 表单验证方法 */

// 判断是否是身份证
export function isCardNo(card) {
    if (!card) {
        return false;
    }
    card = card.trim();
    //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
    let reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;

    if (reg.test(card) === false) {
        return false;
    }

    return true;
}
// 验证是否日期格式为yyyy-mm-dd且正确
export function isDate(mystring) {
    var reg = /^(\d{4})-(\d{2})-(\d{2})$/,
        str = mystring;

    if (str === '') {
        return false;
    }
    if (!reg.test(str) && RegExp.$2 <= 12 && RegExp.$3 <= 31) {
        return false;
    }
    return true;
}
// 判断是否是中国移动 中国联通 中国电信的手机号码
export function isPhoneNumber(value) {
    value = value || '';
    value = value.trim();
    let inMobile = /(((\+\d{2}-)?-\d{2,3}-\d{7,8})|((\+\d{2}-)?(\d{2,3}-)?([1][3,4,5,7,8][0-9]\d{8})))$/,
        Mobile = /^(?=\d{11}$)^1(?:(?:3(?!49)[4-9\D]|47|5[012789]|78|8[23478]|98)\d{8}$|(?:70[356])\d{7}$)/,
        Unicom = /^(?=\d{11}$)^1(?:(?:3[0-2]|45|5[56]|66|7[156]|8[56])\d{8}$|(?:70[4789])\d{7}$)/,
        Telecom = /^(?=\d{11}$)^1(?:(?:33|49|53|7[37]|8[019]|99|91)\d{8}$|(?:349|70[0-2])\d{7}$)/;

    return inMobile.test(value) || Mobile.test(value) || Unicom.test(value) || Telecom.test(value);
}
// 判断QQ号码格式
export function isQQ(value) {
    value = value.trim();
    let reg = /^\d{5,12}$/;

    return reg.test(value);
}
// 判断是否是中文姓名2-8位
export function isZHName(value) {
    value = value.trim();
    // return /^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z]){2,8}$/.test(value);
    return /^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]){2,6}$/.test(value);
}
// 验证是否数字
export function isNumber(value) {
    var regu = /^[1-9]\d*$/;

    if (value !== '') {
        if (!regu.test(value)) {
            return false;
        }
        return true;

    }
    return false

}
// 验证是否数字包括小数
export function isDecimal(value) {
    var regu = /^-?\d+(?:\.\d+)?$/;

    if (value !== '') {
        if (!regu.test(value)) {
            return false;
        }
        return true;

    }
    return false

}
//验证年龄
export function isAge(value) {
    var regu = /^((1[0-5])|[1-9])?\d$/;

    if (value !== '') {
        if (!regu.test(value)) {
            return false;
        }
        return true;

    }
    return false

}
// 验证链接合法性
export function isUrl(text) {
    var reg = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?/;

    return reg.test(text);
}