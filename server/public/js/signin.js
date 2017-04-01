$(document).ready(function() {

    function setCookie(c_name, value, expires) {
        var exdate = new Date()
            exdate.setTime(exdate.getTime() + expires);
        var val = c_name+ "=" + escape(value) +
            (expires? "; path=/; expires="+exdate.toGMTString() : "; path=/")
        document.cookie=val;
    }

    $('#submitBtn').on('click', function() {
        var params = {
            email: $.trim($('#email').val()),
            password: $.trim($('#password').val()),
            platform: 'web'
        };
        $.ajax({
            url: '/api/signin',
            type:'post',
            data: JSON.stringify(params),
            contentType: 'application/json; charset=UTF-8',
            error: function(XMLHttpRequest, textStatus, errorThrown) {
            },
            success:function(ret){
                var expires = new Date().getTime() + 90 * 86400000;
                setCookie('_authenticated', ret.token, expires);
                window.location.href = '/';
            }
        });
        return false;
    });
});
