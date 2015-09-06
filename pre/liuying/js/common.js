/**
 * Created by liuying on 2015/9/1.
 */
'use strict';
/*
* fix the problem of IE8 unsupport indexOf in array
*/
if (!Array.prototype.indexOf)
{
    Array.prototype.indexOf = function(elt /*, from*/)
    {
        var len = this.length >>> 0;
        var from = Number(arguments[1]) || 0;
        from = (from < 0)
            ? Math.ceil(from)
            : Math.floor(from);
        if (from < 0)
            from += len;
        for (; from < len; from++)
        {
            if (from in this &&
                this[from] === elt)
                return from;
        }
        return -1;
    };
}
/*
* extend the method replaceAll for String
 */
String.prototype.replaceAll = function(s1, s2) {
    return this.replace(new RegExp(s1, "g"), s2);
};
/**
 * extend method of convert data to element
 * 将输入中符合正则表达式的部分替换为HTML元素，HTML元素格式通过outFormat制定
 * @param patReg 正则表达式，必须包含一个子表达式
 * @param outFormat 要替换的内容
 * @returns {*} 替换后的对应的HTML字符串
 */
String.prototype.toEle=function(patReg,outFormat){
    var result,temp,out=this;
    while ((result = patReg.exec(this)) != null)  {
        temp=outFormat.replace('$1',result[1]);
        out=out.replace(result[0],temp);
    }
    return out;
};


