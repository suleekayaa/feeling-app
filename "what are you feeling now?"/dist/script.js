window.onload = function() {
    let savedData = JSON.parse(localStorage.getItem('feelingData'));
    /*if (savedData) {
        displayData(savedData); //verileri html'ye yazdırır
    }*/
}

let isDataDisplayed = false;


function toggleDataDisplay() {
    let savedData = JSON.parse(localStorage.getItem('feelingData'));
    let displayDiv = document.getElementById('dataDisplay');

    if (isDataDisplayed) {
        displayDiv.innerHTML = ''; 
        isDataDisplayed = false;
    } else {
        if (savedData && savedData.length > 0) {
            displayData(savedData); 
            isDataDisplayed = true;
        } else {
            alert('Henüz kaydedilmiş duygu durumu bulunmamaktadır.');
        }
    }
}

document.getElementById('showHistoryBtn').addEventListener('click', toggleDataDisplay);

function displayData(data) {
    let displayDiv = document.getElementById('dataDisplay');
    displayDiv.innerHTML = '';

    if (data && data.length > 0) {
        data.forEach(function(item, index) {
            let dataItem = document.createElement('div');
            dataItem.className = 'dataItem';
            dataItem.innerHTML = `
                <p><strong>Date:</strong> ${item.date}</p>
                <p><strong>Hours:</strong> ${item.time}</p>
                <p><strong>Feeling:</strong> ${item.feeling}</p>
                <p><strong>What made you feel this way ? :</strong> ${item.longAnswer}</p>
                <p><strong>What cheers you up?:</strong> ${item.cheer}</p>
                <p><strong>What did you do to feel good today ? :</strong> ${(item.activities ? item.activities.join(', ') : '')}</p>
            `;
            
            
            let deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = function() {
                deleteEntry(index);
            };
            dataItem.appendChild(deleteButton);
            displayDiv.appendChild(dataItem);
        });
    }
}

function hideData() {
    let displayDiv = document.getElementById('dataDisplay');
    displayDiv.innerHTML = '';
    isDataDisplayed = false;
}

function deleteEntry(index) {
    let savedData = JSON.parse(localStorage.getItem('feelingData')) || [];
    savedData.splice(index, 1);
    localStorage.setItem('feelingData', JSON.stringify(savedData));

    displayData(savedData);
}


function deleteFile() {
    let fileInput = document.getElementById('fileInput');
    if (fileInput.files.length > 0) {
        fileInput.value = ''; 
    }
}
function saveData(data) {
    localStorage.setItem('feelingData', JSON.stringify(data));
}


const myDatePicker = MCDatepicker.create({ 
    el: '#datePicker', 
    showCalendarDisplay: false, 
    dateFormat: 'DD-MM-YYYY', 
    customClearBTN: 'Temizle', 
    customOkBTN: 'Tamam',
    customCancelBTN: 'İptal Et',
    customWeekDays: [
        'Pazartesi',
        'Salı',
        'Çarşamba',
        'Perşembe',
        'Cuma',
        'Ctesi',
        'Pazar'
    ], 
    customMonths: [
        'Ocak',
        'Şubat',
        'Mart',
        'Nisan',
        'Mayıs',
        'Haziran',
        'Temmuz',
        'Ağustos',
        'Eylül',
        'Ekim',
        'Kasım',
        'Aralık'
    ] 
});

//veri girişini alır
function getData() {
    let date = document.getElementById('datePicker').value;
    let time = document.getElementById('timePicker').value;
    let feeling = document.getElementById('feeling').value;
    let longAnswer = document.getElementById('longAnswer').value;
    let fileInput = document.getElementById('fileInput').files[0];


    let cheerOption = document.querySelector('input[name="cheer"]:checked');
    let cheer = '';
    if (cheerOption) {
        cheer = cheerOption.value;
    }

    let yogaCheckBox = document.getElementById('yogaCheckBox').checked;
    let movieCheckBox = document.getElementById('movieCheckBox').checked;
    let bookCheckBox = document.getElementById('bookCheckBox').checked;

    // Checkbox değerlerini string olarak birleştir çünkü her bir checkbox için ayrı ayrı kontrol etmek gerekebilir ve bu işlem karmaşık hale gelir. 
    let activities = [];
    if (yogaCheckBox) activities.push('i do yoga');
    if (movieCheckBox) activities.push('i watch movie');
    if (bookCheckBox) activities.push('i read book');


    // veri parçasını tek bir yapı içinde tutarız,kullanıcıdan gelen verileri daha düzenli bir şekilde yönetiriz.
    let newData = {
        date: date,
        time: time,
        feeling: feeling,
        cheer: cheer,
        activities: activities,
        longAnswer: longAnswer,
        fileInput: fileInput
    };
    let savedData = JSON.parse(localStorage.getItem('feelingData')) || [];
    //yeni bir veri girişi yapmak istediğinde mevcut seçimlerin temizlenmesi için
    document.querySelectorAll('input[name="cheer"]').forEach(function(checkbox) {
        checkbox.checked = false;
    });
    function clearInput() {
        document.getElementById('yogaCheckBox').checked = false;
        document.getElementById('movieCheckBox').checked = false;
        document.getElementById('bookCheckBox').checked = false;
    }


    document.getElementById('fileInput').addEventListener('change', function(event) {
        const files = event.target.files; //seçilen dosyalar target ile alınır.

        // Her bir dosya için işlem yapmak için
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
        }
    });


    

    savedData.push(newData);

    displayData(savedData);

    saveData(savedData);
    clearInput();

    console.log(longAnswer);

    //input alanlarının veriyi kaydettikten sonra yeni veri girebilmek için temizlenmesi
    document.getElementById('datePicker').value = '';
    document.getElementById('timePicker').value = '';
    document.getElementById('feeling').value = '';
    document.getElementById('longAnswer').value = '';

}

