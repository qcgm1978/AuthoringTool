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
 * �������з���������ʽ�Ĳ����滻ΪHTMLԪ�أ�HTMLԪ�ظ�ʽͨ��outFormat�ƶ�
 * @param patReg ������ʽ���������һ���ӱ��ʽ
 * @param outFormat Ҫ�滻������
 * @returns {*} �滻��Ķ�Ӧ��HTML�ַ���
 */
String.prototype.toEle=function(patReg,outFormat){
    var result,temp,out=this;
    while ((result = patReg.exec(this)) != null)  {
        temp=outFormat.replace('$1',result[1]);
        out=out.replace(result[0],temp);
    }
    return out;
};


