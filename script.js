document.querySelector('.busca').addEventListener('submit', async (event) => {
    event.preventDefault();//previne um corportamento padrão

    let input = document.querySelector('#searchInput').value;

    if (input !== '') {

        clearInfo();
        Warning('carregando...')

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=c2a65cdda4ed298af4db6cd2cce9f9f3&units=metric&lang=pt_br`

        let results = await fetch(url);
        let json = await results.json();

        if (json.cod === 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,//pega nome do país la na api
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg

            })
        } else {
            clearInfo();
            Warning('Localizacão não encontrada');
        }

    } else {
        clearInfo()
        Warning('Este campo precisa ser preenchido')
    }

});


function showInfo(json) {
    Warning('');

    document.querySelector('.titulo').innerHTML = `${json.name},${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp}<sup>ºC</sup>`;

    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;

    //selecionar icone
    document.querySelector('.temp img').setAttribute('src',
        `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)
    //trocando atributo atraves do 'setAttribute'

    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle - 90}deg)`

    document.querySelector('.resultado').style.display = 'block'
}

function clearInfo() {
    Warning('');
    document.querySelector('.resultado').style.display = 'none'
}

function Warning(msg) {
    document.querySelector('.aviso').innerHTML = msg;

}