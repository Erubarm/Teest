var images = {
    'Идеальный бар для отдыха': [
        'pic1.jpg',
        'pic2.jpg',
        'pic3.jpg',
        'pic4.jpg',
        'pic5.jpg',
        'pic6.jpg',
        'pic7.jpg',
        'pic8.jpg'
    ],

    'Развлекательные мероприятия': [
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

$(document).ready(function () { // Когда документ готов
    $('#gallery').gallery();
});

$.fn.gallery = function () {
    var rself = this;
    var setimgs;

    this.each(function () {
        var g = this;

        g.load_sets = function (el) { // Функция - загружаем набор изображений
            $.each(images, function (key, value) {
                $(el).append('<li><a id="' + key + '" href="#" title="' + key + '">' + key + '</a></li>');
            });
            var sets = $(el).find('li a');
            $(sets).click(function () { // Функция - привязываем событие click к набору
                var set = $(this).attr('id');
                g.setimgs = images[set];
                $(g).find('#thumbs').html('');
                g.load_thumbs($(g).find('#thumbs')[0], 0);

                $(g).find('#loading').html('Загрузка <strong>1</strong> из ' + g.setimgs.length + ' изображений');
            });
            sets[0].click();
        }
        g.load_thumbs = function (el, index) { // Функция - загрузка миниатюр
            $(el).append('<li><img id="' + g.setimgs[index] + '" src="./images/' + g.setimgs[index] + '"/></li>');
            var tn = new Image();
            $(tn).load(function () {
                var a = $($(el).find('li')[index]).find('img')[0];
                $(a).append(this);
                $(a).click(function () { // Функция привязываем событие click к миниатюрам
                    var i = $(this).attr('id');
                    $(g).find('#photo').attr('src', './images/' + i);
                    return false;
                });
                if ((index + 1) < g.setimgs.length) {
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
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}



var count = 0
function func1() {
    const name1 = document.getElementById('name1').value;
    const message = document.getElementById('message').value;

    const review = {
        name1, message,
    }
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    reviews.push(review)
    localStorage.setItem('reviews', JSON.stringify(reviews))

    alert('Отзыв отправлен');


    document.getElementById('name1').value = '';
    document.getElementById('message').value = '';
}


function func2() {
    document.getElementById('output').innerHTML = ''
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    for (review in reviews.reverse()) {
        document.getElementById('output').innerHTML += `<br> <p class = 'rew'>Имя: ${reviews[review]['name1']}<br>
        Отзыв: ${reviews[review]['message']}</p>`
    }

    let date = new Date();
    let newDate = CreateElement('span');
    alert(date);

}

function func3(){
    alert('Столик успешно забронирован');
}

async function post_reservation(){
    const body = {
        name: document.getElementById('name').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        count: document.getElementById('num').value,
        phone: document.getElementById('phone').value
    }
    response = await makeRequest({
        url: 'http://127.0.0.1:8000/post_email',
        method: 'POST',
        body: body,
    })
}

async function makeRequest(request) {
    let headers = {
        'Content-type': 'application/json;',
    }
    let response = ''
    if (request.method == 'GET') {
        response = await fetch(request.url, {
        mode: 'no-cors',
        method: request.method,
        headers,
    })
    } else {
        response = await fetch(request.url, {
        mode: 'no-cors',
        method: request.method,
        body: JSON.stringify(request.body),
        headers,
    })
    }

    return await response.json()
}

async function add_review(){
    const body = {
        name: document.getElementById('name1').value,
        message: document.getElementById('message').value,
    }
    response = await makeRequest({
        url: 'http://127.0.0.1:8000/review',
        method: 'POST',
        body: body,
    })

    document.getElementById('name1').value = '',
    document.getElementById('message').value = '',

    alert('Отзыв отправлен');
}

async function all_review(){
    response = await makeRequest({
        url: 'http://127.0.0.1:8000/review',
        method: 'GET',

    })
    console.log(response)
}