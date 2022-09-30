$(function() {
   //Get 
   $('#get-button').on('click', function() {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      contentType: 'application/json',
      success: function(response) {
        //edit html object
        var tbodyEL = $('#namebody');
        tbodyEL.html('');

        response.tweetinfo.forEach(function(tweetinfo) { //for each tweet info
          if (tweetinfo.hasOwnProperty('user')) { //safety check, show users
            tbodyEL.append('\
              <tr> \
                <td class = "id">' + tweetinfo.user.id + '</td> \
                <td class = "screen_name">' + tweetinfo.user.screen_name + '</td> \
                <td class = "name">' + tweetinfo.user.name + '</td>\
              </tr> \
            ');
          }
        });
      }
    })
  });


  //Get tweets
  $('#get-tweets-button').on('click', function() {
    $.ajax({
      url: '/tweetinfo',
      method: 'GET',
      contentType: 'application/json',
      success: function(response) {
        //edit html object
        var tbodyEL = $('#tweetbody');
        tbodyEL.html('');

        response.tweetinfo.forEach(function(tweetinfo) { //for each tweet info
          var junk = tweetinfo.hasOwnProperty('created_at') ? tweetinfo.created_at : 'N/A'; //N/A or date depending, show tweets
          tbodyEL.append('\
            <tr> \
            <td class = id>' + tweetinfo.id + '</td> \
            <td class = text>' + tweetinfo.text + '</td> \
            <td class = created_at>' + junk + '</td> \
            </tr> \
          ');
        });
      }
    })
  });

    //Get searched tweets
  $('#get-searched-tweets').on('click', function() {
      //TODO: get a searched tweet(s) & display it
      /**
       * I honestly have literally no clue what 
       * you want from me on this one. I could 
       * implement it if I knew what you wanted.
       */   
  });

  //CREATE
  $('#create-form').on('submit', function(event) {
    event.preventDefault();

    //get value from form
    var input_val = $('#create-input')[0].value;

    //only if the form actually is (relatively) real input
    if (input_val.includes(';')) {
      const parsed = input_val.split(';');
      
      //split input into two variables
      var id = parsed[0];
      var text = parsed[1];

      $.ajax({
        url: '/tweetinfo',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ //pass them here
          id: id,
          text: text
        }),
        success: function(response) {
          console.log(response);
          //clear input form and reveal tweets (or refresh them if already open)
          $('#create-input').val('');
          $('#get-tweets-button').click();
        }
      })
    }
  });

    //Create searched tweets
  $('#search-form').on('submit', function(event) {
    event.preventDefault();

    //get value from form
    var search_input = $('#search-input')[0].valueAsNumber;
    
    $.ajax({
      url: '/searchinfo',
      contentType: 'application/json',
      success: function(response) {
        //set html object to edit
        var tbodyEL = $('#searchbody');
        tbodyEL.html('');
        
        response.tweetinfo.forEach(function(tweetinfo) { //for each tweet info
          if (search_input == tweetinfo.id) { //if input tweet id equals current tweet id, show it.
            tbodyEL.append('\
              <tr> \
              <td class = id>' + tweetinfo.id + '</td> \
              <td class = text>' + tweetinfo.text + '</td> \
              <td class = created_at>' + tweetinfo.created_at + '</td> \
              </tr> \
            ');
          }
        })
      }
    })
  });

  //UPDATE/PUT
  $('#update-user').on('submit', function(event) {
    event.preventDefault();
    var updateInput = $('#update-input');
    var inputString = updateInput.val();

    const parsedStrings = inputString.split(';');

    var name = parsedStrings[0];
    var newName = parsedStrings[1];
    
    //TODO: update a tweet (user?????)
    $.ajax({
      url: '/tweets/' + name,
      method: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify({ newName: newName }),
      success: function(response) {
        console.log(response);
        //clear input form and reveal users (or refresh them if already open)
        $('#update-input').val('');
        $('#get-button').click();
      }
    })
  });


  //DELETE
  $('#delete-form').on('submit', function(event) {
    //get tweet id number from input form
    var id = $('#delete-input')[0].valueAsNumber;
    event.preventDefault();

    $.ajax({
      url: '/tweetinfo/' + id, //pass to outer function
      method: 'DELETE',
      contentType: 'application/json',
      success: function(response) {
        console.log(response);
        //clear input form and reveal tweets (or refresh them if already open)
        $('#delete-input').val('');
        $('#get-tweets-button').click();
      }
    })
  });
});


                    
   