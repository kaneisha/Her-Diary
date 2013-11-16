$(function(){

var landingTemplate;
var appTemplate;

var loadLanding = function() {
        $('#wrap').empty();
        $.get('templates/template.html', function(htmlArg) {

                landingTemplate = htmlArg;

                var landing = $(htmlArg).find('#landing-template').html();
                $.template('landingtemplate', landing);

                var html = $.render('', 'landingtemplate');

                $('#wrap').append(html);

                

        });

        $.get('templates/template.html', function(htmlArg) {
        var post_item = $(htmlArg).find('#post_item').html();
        $.template('postitem', post_item);

        console.log(post_item);

        $(document).on('click', '.view', function(e) {
                console.log('view post click');
                var projectid = ($(this).attr("data-postid"));
                
                console.log(projectid);
                e.preventDefault();
                loadApp();
                loadview_post(projectid);
        });

         $.ajax({
                url : 'api/postList.php',
                type : 'get',
                dataType : 'json',
                success : function(response) {

                        if (response) {
                                for(var i = 0; i < response.length; i++){
                                        //console.log(response);
                                //         // console.log("run");

                                 }
                                //loadApp();
                                var posts = response;
                                var html = $.render(posts, 'postitem');
                               
                               $('#wrapperTwo').append(html);
                                //if(!date){


                                var dayHTML = $('.day');
                                var monthHTML = $('.month');
                                //var dateHTML = $('.date');


                                        for(var i = 0; i < response.length; i++){
                                               // console.log("hey");
                                               // console.log(response[i].datetime);
                                                var date = response[i].datetime;
                                                //console.log(date);
                                                var dueDate = date.split("/");
                                               // console.log(dueDate);

                                                var month = dueDate[0]; //+ " " + dueDate[1];
                                                //console.log(month);

                                                var day = dueDate[1]; //+ " " + dueDate[1];
                                                //console.log(day);
                                                

                                                // var year = yearsplit[2] + yearsplit[3];
                                                $(dayHTML[i]).html(day);
                                                $(monthHTML[i]).html(month);
                                                // $(year[i]).html(year);
                                                // $(date[i]).html(date);
                                        }
                                       // }


                        } else {
                                console.log('could not get projects');

                        }
                }
                //return false;

        });

        });
};

loadLanding();

var loadApp = function(){
    $('#wrap').empty();

    $.get('templates/template.html?4', function(htmlArg) {

    appTemplate = htmlArg;

    var app = $(htmlArg).find('#app-template').html();
    $.template('apptemplate', app);

    var html = $.render('', 'apptemplate');

    $('#wrap').append(html);
});
};

var loadview_post = function(projectid){
    console.log('showing view');
     $('#wrap').empty();

    var post_info = $(appTemplate).find('#post_info').html();
    $.template('postinfo', post_info);

    var html = $.render('', 'postinfo');
    $('#wrap').append(html);

    view_post(projectid);

};


var view_post = function(projectid){

   // console.log(projectid);
        $.ajax({
                url : 'api/postInfo.php',
                data : {
                        id : projectid
                },
                type : 'get',
                dataType : 'json',
                success : function(response) {
                        console.log(response);

                        if (response) {
                                console.log('success');
                        } else {
                                console.log('could not get post');

                        }
                }
                //return false;
        });
    };





});




