function buscar_en_youtube(texto){
  var texto = escape(texto);
  $('#listita').text('');  
  $.ajax({
    type: 'GET',
    url: 'https://gdata.youtube.com/feeds/api/videos?q=' + texto + '&alt=json',
    success: function (root){

      var feed = root.feed;
      var entries = feed.entry || [];

      console.log(root.feed.entry);
      for (var i = 0; i < entries.length; ++i){
        var entry = entries[i];
        var title = (entry.title.type == 'html') ? entry.title.$t : entry.title.$t;
        var id = obtener_id(entry.id.$t);
        $('#listita').append(
          '<li>'
          +'<img src="' + entry.media$group.media$thumbnail[1].url + '"/>'
          +'<input type="button" value="cargar en A" onclick="ytplayer1.loadVideoById(\''+ id +'\');">'
          +'<input type="button" value="cargar en B" onclick="ytplayer2.loadVideoById(\''+ id +'\');">'
          +'<a href="'+ entry.link[0].href + '">' + title + '</a>'
          +'</li>'

          );
      }
    },
  });
}

function obtener_id(url_video){
  var elementos = url_video.split('/');
  var id = elementos[elementos.length - 1];
  return id;
}
function cargar_video(video_id, player){
  var params = { allowScriptAccess: "always"};
  var atts = {id:"myytplayer" + player}
  swfobject.embedSWF("http://www.youtube.com/v/" + video_id + "?enablejsapi=1&playerapiid=ytplayer" + player +"&version=3",
      "ytapiplayer" + player, "425", "356", "8", null, null, params, atts);


}

function onYouTubePlayerReady(playerId){
  if (playerId == "ytplayer1"){
    ytplayer1 = document.getElementById("myytplayer1");
  } else if(playerId == 'ytplayer2'){
    ytplayer2 =document.getElementById('myytplayer2');
  }
}

function iniciar_players()
{
  cargar_video('G-8cHazsuog', 1);
  cargar_video('3lGXgiWYexk', 2);
}
function buscar(){
  var text = $('#search').val();
  buscar_en_youtube(text);
  return false;
}

function slider_change()
{
  var value = $('#slider').val();
  ytplayer1.setVolume(100 - value);
  ytplayer2.setVolume(value);
}

