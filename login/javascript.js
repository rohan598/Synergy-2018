$(document).ready(function(){
    console.log("hello");
    $('#trainerlogin').css('display','none');

    $('#submitu').click(function(){
        var data = {
            'username' : $('#usern').val(),
            'email' : $('#usere').val(),
            'password' : $('#userp').val()
        };
        $.ajax({
            type : 'POST',
            url : '/login/user',
            data : data,
            success : function() {
                console.log("done");
            }
        });
    });

    $('#submitt').click(function(){
        var data = {
            'username' : $('#trainern').val(),
            'email' : $('#trainere').val(),
            'password' : $('#trainerp').val()
        };
        $.ajax({
            type : 'POST',
            url : '/login/trainer',
            data : data,
            success : function() {
                console.log("done");
            }
        });
    });
});
function showt(){
    $('#userlogin').css('display','none');
    $('#trainerlogin').css('display','block');
}
function showu(){
    $('#userlogin').css('display','block');
    $('#trainerlogin').css('display','none');
}
