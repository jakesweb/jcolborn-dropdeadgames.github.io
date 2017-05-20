---
layout:post
title: "Lessons I Have Learned"
date: 2017-05-20 14:49:00 -0400
categories: Web Development
---
It's been a short journey so far. I wish I would have started recording what I have been doing since the beginning so I could keep better track of my journey. You could say that the first lesson I have learned was to always document everything you are doing (I am definetly still struggling with this). What I wanted to do was go over my [100 Days of Code] log and pull out some of the interesting tips that I picked up for myself over the short few months. I mean, what is a developer blog without actual code.

But first, a few words. I have already mentioned how important documentation was and how I was terrible at doing anything about that. The essential tip I could give was disciple. There were many times I came home late from my current job adn couldn't muster the energy to sit down and code. I would have rather had some dinner, laid down, or played video games. I have lost about a solid week of productivity due to this. I could make the excuse that I worked 70 hours at my other job, so where was the time, but looking over Steam I know I played games for about 10 hours. Imagine if I could have moved that to coding instead and saved all gaming for the weekend! That is the lesson I learned this week.

Let's dive right into API's. I learned alot about API's in the last 3 weeks (and I mean from nothing at all). I have also ran into some issues using them. One of the things that tricked me at least twice was the fact that API's are asynchronous. This presents problems if you are attempting to use elements to satisfy an operator or function. I found a few ways around this. One way around this is to craft the code within the JSON call:

{% highlight javascript %}
$("#getMessage").click(function() {
  $.ajax({
    url: "http://quotes.stormconsultancy.co.uk/random.json",
    data: {
      format: "json"
    },
    error: function() {
      $("#quote").html("<p>An error has occurred</p>");
    },
    dataType: "jsonp",
    success: function(data) {
      $quote = data.quote;
      $author = data.author;
      $permalink = data.permalink;
      $("#quote").html("<p class='quote-text'>" + data.quote + "</p><p class='author-text'>" + data.author + "</h1>");
    },
    type: "GET"
  });
});
{% endhighlight %}

I was attempting to set the variables from the success: function and then call them later in the application. This was a no go.  I also had an issue with 1 API call requiring data from another. I solved this in a similar fashion (with the help of a lot of Javascript articles and StackOverflow). Check out the code:

{% highlight javascript %}
$.each(twitch_streams, function (i, item) {
  $.ajax({
    url: twitch_stream + twitch_streams[i],
    dataType: "jsonp",
    async: true,
    success: function(data) {
      if (data.stream === null) {
        channelCall(twitch_streams[i], false);
      } else {
        channelCall(twitch_streams[i], true);
      }
    }
  });  
});

function channelCall(stream, status) {
   $.getJSON(twitch_channel + stream + callback, function(data) {
    if (JSON.stringify(data.status) == "404") {
        $("#stream_out").append("<div class='between-streams'><p class='streams'>"+ data.message + ".</p></div>");
      } else {
        if (status) {
          $("#stream_out").append("<div class='between-streams'><p class='streams'><a href='" + data.url + "'><img src='" + data.logo + "'/></a><br>" + data.display_name + "<br>Playing: " + data.game + "<br>" + data.status + "<br>ONLINE</p></div>");
        } else {
          $("#stream_out").append("<div class='between-streams'><p class='streams'><a href='" + data.url + "'><img src='" + data.logo + "'/></a><br>" + data.display_name + "<br>OFFLINE</p></div>");
      }
    }
  });
}
{% endhighlight %}

This uses an array of channel names to get status on Twitch. By calling the channel API as a function from the stream API it will wait for the function(data) to be fulfilled until the second channelCall function is processed.

These were 2 major issues that I faced and was able to overcome through persistance and the wonderful community that surrounds development. If it were not for the community I would not be able to learn these valuable lessons today. If you have any tips you would like to share with me, please, send me an email or a tweet. I would love to hear them!

[100 Days of Code]:https://github.com/jcolborn-dropdeadgames/100-days-of-code 
