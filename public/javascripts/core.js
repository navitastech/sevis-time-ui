$(document).ready(function () {

    $(function() {
        $( "#datepicker" ).datepicker( {
            changeMonth: true,
            changeYear: false,
            yearRange: "-0:+0"
        });
    });

    $("#messageBtn").click(function (event) {

        $("#messageByDate").toggle(false);

        var timestamp = new Date($("#datepicker").val()).getTime() + "";

        $.get("/date?timestamp=" + timestamp)
            .done(function (data) {
                      $("#messageByDateTitle").empty().append($("#datepicker").val());
                      $("#messageByDateMessage").empty().append(data);
                  })
            .fail(function (xhr, textStatus, errorThrown) {
                      $("#messageByDateTitle").empty().append($("#datepicker").val());
                      $("#messageByDateMessage").empty().append("Unable to retrieve message");
                  });

        $("#messageByDate").toggle(true);
    });
    
});

});

function getMessageByDate() {
    $("#messageByDate").toggle(false);

    var timestamp = new Date($("#datepicker").val()).getTime() + "";

    $.get("/date?timestamp=" + timestamp)
        .done(function (data) {
                  $("#messageByDateTitle").empty().append($("#datepicker").val());
                  $("#messageByDateMessage").empty().append(data);
              })
        .fail(function (xhr, textStatus, errorThrown) {
                  $("#messageByDateTitle").empty().append($("#datepicker").val());
                  $("#messageByDateMessage").empty().append("Unable to retrieve message");
              });

    $("#messageByDate").toggle(true);
}
