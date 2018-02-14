$(document).ready(function(){
    $('#trainersignup').css('display','none');

    $('#submitu').click(function(){
        var data = {
            'username' : $('#usern').val(),
            'email' : $('#usere').val(),
            'password' : $('#userp').val()
        };
        $.ajax({
            type : 'POST',
            url : '/user',
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
            url : '/trainer',
            data : data,
            success : function() {
                console.log("done");
            }
        });
    });
});
function showt(){
    $('#usersignup').css('display','none');
    $('#trainersignup').css('display','block');
}
function showu(){
    $('#usersignup').css('display','block');
    $('#trainersignup').css('display','none');
}
