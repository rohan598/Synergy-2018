$(document).ready(function(){
    window.scrollTo(0,0);
    $('.navbar').css('background-color', `rgba(0, 0, 0, 0.3 + ${$(document).scrollTop() / 800})`);
    $('#trainersignup').css('display','none');
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
    $('.selt').css('background-color','salmon');
    $('.selu').css('background-color','beige');
}
function showu(){
    $('#usersignup').css('display','block');
    $('#trainersignup').css('display','none');
    $('.selt').css('background-color','beige');
    $('.selu').css('background-color','salmon');
}
