function Card(r, s) {
this.rank = r;
this.suit = s;
this.toHTML = function() {
return "<li class='card'>" + this.rank + "</br>" + "<span id='hide'>" + this.suit + "</span>" + "</li>";
}
}
function Deck() {
var thisDeck = this;
this.suits = ['H', 'C', 'D', 'S'];
this.ranks = ['A', '2', '3', '4', '5', '6', '7', '8'];
$.each(thisDeck.suits, function() {
var suit = this;
$.each(thisDeck.ranks, function() {
var rank = this;
var card = new Card(rank, suit);
$('#deck').append(card.toHTML());
});
});
}
var shuffle = function(m) {
var rand, $rand;
rand = Math.floor(Math.random() * m--);
$('li:eq(' + m + ')').
after($('li:eq(' + rand + ')')).
insertBefore($('li:eq(' + rand + ')'))
if(m) {
setTimeout(shuffle, 100, m);
}
};
var deck = new Deck();

$( "li:contains('H')" ).css("border-color","#E64C10");
$( "li:contains('H')" ).addClass('hearts');
$("li:contains('D')").css("border-color","#E64C10");
$( "li:contains('D')" ).addClass('diamonds');
$( "li:contains('C')" ).addClass('clubs');
$( "li:contains('S')" ).addClass('spades');

$("li:contains('K')").addClass('royalty');
$("li:contains('Q')").addClass('royalty');
$("li:contains('J')").addClass('royalty');

$( document ).ready(function() {
  shuffle($('.cards').length);
});

$('#shuffle').click(function(){
  shuffle($('.cards').length);
});

$('#flipAll').click(function(){
  $('li').toggleClass('liflip');
  $('li').toggleClass('liflip2');
});

$( "li" ).click(function() {
$( this ).toggleClass( "liflip" );
$( this ).toggleClass( "liflip2" );
});

function winner(){
    $('.winnerwindow').css('display', 'block').show(1000);
  }

  $( "li" ).draggable({stack: '.spades, .hearts, .clubs, .diamonds', revert: 'invalid', opacity: 0.4, cursor: 'move'});

  $(function() {
      var limit = 16;
      var counter = 0;
      $('#droppable').droppable({
          hoverClass: 'border', tolerance: 'fit', accept: '.spades, .clubs',

          drop: function() {
              counter++;
       //     ui.draggable.remove();  I WANT THIS TO REMOVE EACH CARD AFTER
       //     DROPPED IN BANK WHILE STILL KEEPING COUNT BUT CANT GET TO WORK
              if (counter == limit) {
                  winner();
                  $(this).droppable("disable");
              }
          }
      });
  });

  $(function() {
      var limit = 16;
      var counter = 0;
      $('#droppable2').droppable({
          hoverClass: 'border', tolerance: 'fit', accept: '.diamonds, .hearts',
          drop: function() {
              counter++;
              if (counter == limit) {
                  winner();
                  $(this).droppable("disable");
              }
          }
      });

  });

  $('#reset').click(function(){
    refreshPage();
  });

  $('#closewin').click(function(){
    $('.winnerwindow').hide('slow');
  });

  /* RELOAD PAGE */
  function refreshPage() {
    window.location.reload(true);
  }
