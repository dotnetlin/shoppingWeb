$(function () {
    $.get("header.html",function (data) {
        $("#header").html(data);
    });
    // $.get("footer.html",function (data) {
    //     $("#footer").html(data);
    // });
    function getContextPath(){

        var pathName = document.location.pathname;

        var index = pathName.substr(1).indexOf("/");

        var result = pathName.substr(0,index+1);

        return result;

    }
});