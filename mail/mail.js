var images = {
    'Идеальный бар для отдыха' : [
        'pic1.jpg',
        'pic2.jpg',
        'pic3.jpg',
        'pic4.jpg',
        'pic5.jpg',
        'pic6.jpg',
        'pic7.jpg',
        'pic8.jpg'
    ],

    'Развлекательные мероприятия' : [
        'pic9.jpg',
        'pic10.jpg',
        'pic11.jpg',
        'pic12.jpg',
        'pic13.jpg',
        'pic14.jpg',
        'pic15.jpg',
        'pic16.jpg'
    ],
};

$ (document).ready(function(){ // Когда документ готов
    $('#gallery').gallery();
});

$.fn.gallery = function() {
    var rself = this;
    var setimgs;
    
    this.each(function() {
    var g = this;
    
    g.load_sets = function(el) { // Функция - загружаем набор изображений
                $.each(images, function(key, value) { 
                    $(el).append('<li><a id="'+key+'" href="#" title="'+key+'">'+key+'</a></li>');
                });
    var sets = $(el).find('li a');
                $(sets).click(function() { // Функция - привязываем событие click к набору
    var set = $(this).attr('id');
    g.setimgs = images[set];
                    $(g).find('#thumbs').html('');
    g.load_thumbs($(g).find('#thumbs')[0], 0);
    
                    $(g).find('#loading').html('Загрузка <strong>1</strong> из '+g.setimgs.length+' изображений');
                });
    sets[0].click();
            }
    g.load_thumbs = function(el, index) { // Функция - загрузка миниатюр
                $(el).append('<li><img id="' + g.setimgs[index] + '" src="./images/' + g.setimgs[index] + '"/></li>');
    var tn = new Image();
    $(tn).load(function() {
    var a = $($(el).find('li')[index]).find('img')[0];
                    $(a).append(this);
                    $(a).click(function() { // Функция привязываем событие click к миниатюрам
    var i = $(this).attr('id');
                        $(g).find('#photo').attr('src', './images/'+i);
    return false;
                    });
    if ((index + 1) <g.setimgs.length) {
    g.load_thumbs(el, (index + 1));
                        $(g).find('#loadingstrong').html(index + 2);
                    } else {
                        $(g).find('#loading').html('Загружено изображений: <strong>' + g.setimgs.length + '</strong>');
                        $($(g).find('#thumbsliimg')[0]).click();
                    }
                });
    tn.src = './images/' + g.setimgs[index];
    }
            // Инициализация - загружаем набры для галаереи
    g.load_sets($(g).find('#sets')[0]);
        });
    };





    var slideIndex = 1;
        showSlides(slideIndex);
        
        function plusSlides(n) {
          showSlides(slideIndex += n);
        }
        
        function currentSlide(n) {
          showSlides(slideIndex = n);
        }
        
        function showSlides(n) {
          var i;
          var slides = document.getElementsByClassName("mySlides");
          var dots = document.getElementsByClassName("dot");
          if (n > slides.length) {slideIndex = 1}    
          if (n < 1) {slideIndex = slides.length}
          for (i = 0; i < slides.length; i++) {
              slides[i].style.display = "none";  
          }
          for (i = 0; i < dots.length; i++) {
              dots[i].className = dots[i].className.replace(" active", "");
          }
          slides[slideIndex-1].style.display = "block";  
          dots[slideIndex-1].className += " active";
        }


