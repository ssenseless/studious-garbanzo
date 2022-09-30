var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(bodyParser.json());

var fs = require('fs');

//global variable for tweet data
var tweetinfo = []

//load the input file
fs.readFile('favs.json', 'utf8', function readFileCallback(err, data){
  if(err) { 
    req.log.info('cannot load a file:' + fileFolder + '/' + _file_name)
    throw err;
  }
  else {
    var new_data = JSON.parse(data);
    for (var i in new_data) {
      if (data.hasOwnProperty(i)) {
        var box = new_data[i];
        tweetinfo.push({
          created_at:                box.created_at,
          id:                        box.id,
          id_str:                    box.id_str,
          text:                      box.text,
          source:                    box.source,
          truncated:                 box.truncated,
          in_reply_to_status_id:     box.in_reply_to_status_id,
          in_reply_to_status_id_str: box.in_reply_to_status_id_str,
          in_reply_to_user_id:       box.in_reply_to_user_id,
          in_reply_to_user_id_str:   box.in_reply_to_user_id_str,
          in_reply_to_screen_name:   box.in_reply_to_screen_name,
          user: {
            id:          box.user.id,
            id_str:      box.user.id_str,
            name:        box.user.name,
            screen_name: box.user.screen_name,
            location:    box.user.location,
            description: box.user.description,
            url:         box.user.url,
            entities: {
              url: {
                urls: [{
                  url:          box.user.entities.url.urls.url,
                  expanded_url: box.user.entities.url.urls.expanded_url,
                  indices:      box.user.entities.url.urls.indices
                }]
              },
              description: {
                urls: box.user.entities.description.urls
              }
            },
            protected:                          box.user.protected,
            followers_count:                    box.user.followers_count,
            friends_count:                      box.user.friends_count,
            listed_count:                       box.user.listed_count,
            created_at:                         box.user.created_at,
            favourites_count:                   box.user.favourites_count,
            utc_offset:                         box.user.utc_offset,
            time_zone:                          box.user.time_zone,
            geo_enabled:                        box.user.geo_enabled,
            verified:                           box.user.verified,
            statuses_count:                     box.user.statuses_count,
            lang:                               box.user.lang,
            contributors_enabled:               box.user.console,
            is_translator:                      box.user.is_translator,
            profile_background_color:           box.user.profile_background_color,
            profile_background_image_url:       box.user.profile_background_image_url,
            profile_background_image_url_https: box.user.profile_background_image_url_https,
            profile_background_tile:            box.user.profile_background_tile,
            profile_image_url:                  box.user.profile_image_url,
            profile_image_url_https:            box.user.profile_image_url_https,
            profile_link_color:                 box.user.profile_link_color,
            profile_sidebar_border_color:       box.user.profile_sidebar_border_color,
            profile_sidebar_fill_color:         box.user.profile_sidebar_fill_color,
            profile_text_color:                 box.user.profile_text_color,
            profile_use_background_image:       box.user.profile_use_background_image,
            default_profile:                    box.user.default_profile,
            following:                          box.user.following,
            follow_request_sent:                box.user.follow_request_sent,
            notifications:                      box.user.notifications            
          },
          geo: box.geo === null ? box.geo : {
            type:        box.geo.type,
            coordinates: box.geo.coordinates,
          },
          coordinates: box.coordinates === null ? box.coordinates : {
            type:        box.coordinates.type,
            coordinates: box.coordinates.coordinates
          },
          place: box.place === null ? box.place : {
            id:            box.place.id,
            url:           box.place.url,
            place_type:    box.place.place_type,
            name:          box.place.name,
            full_name:     box.place.full_name,
            country_code:  box.place.country_code,
            polylines:     box.place.polylines,
            bounding_box: {
              type:        box.place.bounding_box.type,
              coordinates: box.place.bounding_box.coordinates,
            },
            attributes:    box.place.attributes
          },
          contributors:  box.contributors,
          retweet_count: box.retweet_count,
          entities: {
            hashtags: box.entities.hashtags,
            urls: [{
              url:          box.entities.urls.url,
              expanded_url: box.entities.urls.expanded_url,
              display_url:  box.entities.urls.display_url,
              indices:      box.entities.urls.indices
            }],
            user_mentions: [{
              screen_name: box.entities.user_mentions.screen_name,
              name:        box.entities.user_mentions.name,
              id:          box.entities.user_mentions.id,
              id_str:      box.entities.user_mentions.id_str,
              indices:     box.entities.user_mentions.indices
            }],
            media: !box.hasOwnProperty('media') ? null : [{
              id:              box.entities.media.id,
              id_str:          box.entities.media.id_str,
              indices:         box.entities.media.indices,
              media_url:       box.entities.media.media_url,
              media_url_https: box.entities.media.media_url_https,
              url:             box.entities.media.url,
              display_url:     box.entities.media.display_url,
              expanded_url:    box.entities.media.expanded_url,
              type:            box.entities.media.type,
              sizes: {
                medium: {
                  w:      box.entities.media.sizes.medium.w,
                  h:      box.entities.media.sizes.medium.h,
                  resize: box.entities.media.sizes.medium.resize
                },
                thumb: {
                  w:      box.entities.media.sizes.thumb.w,
                  h:      box.entities.media.sizes.thumb.h,
                  resize: box.entities.media.sizes.thumb.resize
                },
                small: {
                  w:      box.entities.media.sizes.small.w,
                  h:      box.entities.media.sizes.small.h,
                  resize: box.entities.media.sizes.small.resize
                },
                large: {
                  w:      box.entities.media.sizes.large.w,
                  h:      box.entities.media.sizes.large.h,
                  resize: box.entities.media.sizes.large.resize
                },
              }
            }]
          },
          favorited:          box.favorited,
          retweeted:          box.retweeted,
          possibly_sensitive: box.possibly_sensitive,
          lang:               box.lang
        });
      }
    }
  }
});
 
//Get functions
//Shows user info
app.get('/tweets', function(req, res) {
  /**
   * Could iterate through here and send necessary info,
   * but seeing as it would have to iterate through it again
   * anyways, I just sent the whole thing.
   */
  res.send({tweetinfo: tweetinfo});
});

//Shows tweet info
app.get('/tweetinfo', function(req, res) {
  //see above
  res.send({tweetinfo: tweetinfo});
});

//Shows searched tweets
app.get('/searchinfo', function(req, res){
  //see above
  res.send({tweetinfo: tweetinfo});
});

//Post functions
//Posts created tweets
app.post('/tweetinfo', function(req, res) {
  var new_tweet_id = req.body.id;
  var new_tweet_text = req.body.text;

  //push new tweet into array
  tweetinfo.push({
    id: new_tweet_id,
    text: new_tweet_text
  });

  res.send('success');
});

//Posts searched tweets
app.post('/searchinfo', function(req, res) {
  //TODO: search a tweet
  //Still can't figure out what to do.
});

//Update
app.put('/tweets/:nm', function(req, res) {
  var old_name = req.params.nm;
  var new_name = req.body.newName;

  //for each tweet info, check if the user name matches, and change it if it does.
  tweetinfo.forEach(function(tweetinfo) {
    if (tweetinfo.user.name == old_name) {
      tweetinfo.user.name = new_name;
    }
  });

  res.send("success");
});

//Delete 
app.delete('/tweetinfo/:tweetid', function(req, res) {
  var tweetid = req.params.tweetid;

  //range based for loop so that splice method has index
  for(let i = 0; i < tweetinfo.length; i++) {
    if (tweetid == tweetinfo[i].id) {
      tweetinfo.splice(i, 1);
      i--; //since the current index gets spliced, we technically should check it again since its information will change
    }
  }

  res.send("success");
});


app.listen(PORT, function() {
  console.log('Server listening on ' + PORT);
});