//根据传递过来的参数name获取对应的值
function getParameter(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
    var r = location.search.substr(1).match(reg);
    if (r!=null) return (r[2]); return null;
}

function getContextPath(){

    var pathName = document.location.pathname;

    var index = pathName.substr(1).indexOf("/");

    var result = pathName.substr(0,index+1);

    return result;

}