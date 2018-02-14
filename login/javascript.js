$(document).ready(function(){
    console.log("hello");
    $('.navbar').css('background-color', `rgba(0, 0, 0, 0.3 + ${$(document).scrollTop() / 800})`);
    $('#trainerlogin').css('display','none');
    $('.selt').css('background-color','beige');
    $('.selu').css('background-color','salmon');

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
    $('.selt').css('background-color','salmon');
    $('.selu').css('background-color','beige');
}
function showu(){
    $('#userlogin').css('display','block');
    $('#trainerlogin').css('display','none');
    $('.selt').css('background-color','beige');
    $('.selu').css('background-color','salmon');
}
