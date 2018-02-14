function scrollto(id) {
    $('html, body').stop().animate({
        scrollTop: $('#'+id).offset().top-70
    }, 500);
}
let DATA={};
$(document).ready(function(){
    window.scrollTo(0,0);
    $.ajax('/getuser',function(data){
        DATA=data.obj;
        setData();
    });
    $('#esend').click(function(){
        var data = {
            'from' : $('.uemail').val(),
            'to' : $('.temail').val(),
            'subject' : $('.cont').val(),
            'content' : $('.esend').val()
        };
        $.ajax({
            type : 'POST',
            url : '/mail',
            data : data,
            success : (d)=>{
                console.log(d);
            }
        });
    });
});

function setData() {
    $('.uname').html(`${DATA.name}`);
    $('.uemail').val()=DATA.email;
    $('.tname').html(`${DATA.tname}`);
    $('.temail').val()=DATA.temail;
}

$(document).on('scroll', function () {
    $('.navbar').css('background-color', `rgba(0, 0, 0, ${($(document).scrollTop()+170) / 850})`);
    let a = $(document).scrollTop() + $(window).height();
    let b = $('#contact')[0].scrollHeight;
    let c = $('body')[0].scrollHeight;
    let x = (b - c + a) / b;
    $('#contact').css('background-color', `rgba(0, 0, 0, ${x})`);
    $('.bg').css('top', $(document).scrollTop());
});
