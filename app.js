const ad = document.getElementById('ad');
const soyAd = document.getElementById('soyad');
const mail = document.getElementById('email');

const form = document.getElementById('rehber-form');

const tabloEkle = document.querySelector('.tbody-ekle');
// console.log(tabloEkle.innerHTML);

//tüm kisileri dizide tutma

form.addEventListener('submit', kaydet);
tabloEkle.addEventListener('click', kisiIslemleriDegistir);

const tumKisilerDizisi = [];
let secilenSatir=undefined;

function kisiIslemleriDegistir(e) {
    //console.log(e.target);
    //classlistde btn delete gecen elemanı bul
    if (e.target.classList.contains('btn-delete')) {
        const silinecekTr = e.target.parentElement.parentElement;
        const silinecekMail = e.target.parentElement.previousElementSibling.textContent;
        KisiyiSil(silinecekTr, silinecekMail);

        //classlistde btn edit gecen elemanı bul
    } else if (e.target.classList.contains('btn-edit')) {
        //edit butonuna tıkladıgımız butonda artık gncelle yazısı cıkacak
        document.querySelector('.kaydetGuncelle').value = "guncelle"
        const guncellenecekTr = e.target.parentElement.parentElement;

        ad.value = guncellenecekTr.cells[0].textContent;
        soyAd.value = guncellenecekTr.cells[1].textContent;
        mail.value = guncellenecekTr.cells[2].textContent;
        console.log(tumKisilerDizisi);
        secilenSatir = guncellenecekTr;
    }
}

function KisiyiSil(silinecekTr, silinecekMail) {
    silinecekTr.remove();
    tumKisilerDizisi.forEach((element, index) => {
        if (element.mail === silinecekMail) {
            tumKisilerDizisi.splice(index, 1)
            //              o index numarasına sahip veriri cıkar demek
        }
    });
    console.log("-******************************************");
    console.log(tumKisilerDizisi);
}

function kaydet(e) {
    e.preventDefault();
    const kisiBilgi = {
        ad: ad.value,
        soyAd: soyAd.value,
        mail: mail.value
    }
    const formSonuc = formKontrol(kisiBilgi);
    if (formSonuc.durum) {
        
        if (secilenSatir) {
            kisiyiGuncelle(kisiBilgi);
        } else {
            veriEkle(kisiBilgi); // veri girilirse cagırcak ve eklicek
        }

    } else {
        bilgiOlustur(formSonuc.mesaj, formSonuc.durum)
    }

}

function kisiyiGuncelle(kisiBilgi) {
    for(let i=0;i<tumKisilerDizisi.length;i++){
        if(tumKisilerDizisi[i].mail===secilenSatir.cells[2].textContent){
            tumKisilerDizisi[i]=kisiBilgi;
            break;
        }
    }

    secilenSatir.cells[0].textContent = kisiBilgi.ad;
    secilenSatir.cells[1].textContent = kisiBilgi.soyAd;
    secilenSatir.cells[2].textContent = kisiBilgi.mail;
    console.log(tumKisilerDizisi);
    document.querySelector('.kaydetGuncelle').value='Kaydet';
    secilenSatir=undefined;
}

function formKontrol(kisi) {
    //objelerde in kullanımı
    for (const deger in kisi) {
        //içinde herhangi bir deger varsa truedir ve calısır
        if (kisi[deger]) {
        
        } else { //bos ise burası calısır 
            const sonuc = {
                durum: false,
                mesaj: 'Boş alan bırakmayınız'
            }
            return sonuc;
        }
    }
    //form dogru oldugunda bunlar gonderilcek
    kutularıTemizle();
    return sonuc = {
        durum: true,
        mesaj: 'dogru'
    }
}

function bilgiOlustur(mesaj, durum) {
    const yeniBilgi = document.createElement('div');
    yeniBilgi.textContent = mesaj; //divin içine yazılacak mesaj;
    yeniBilgi.className = 'bilgi';
    //
    //className kullanırsak üstetekini ezmiş oluruz
    yeniBilgi.classList.add(durum ? 'bilgi--basarili' : 'bilgi--hatali');
    //sayafaya yerleştirme işlemi        //yeniBilgi'yi form değişkeniin içine atar
    document.querySelector('.container').insertBefore(yeniBilgi, form);


    setTimeout(function () {
        const silinecekDiv = document.querySelector('.bilgi')
        if (silinecekDiv) {
            silinecekDiv.remove();
        }
    }, 1500)
}

function kutularıTemizle() {
    ad.value = '';
    soyAd.value = '';
    mail.value = '';
}

function veriEkle(kisiBilgi) {
    const olusturulanTrElementi = document.createElement('tr'); //tryi olusturudk ve içine html kodlarını yani tdleri atıca
    olusturulanTrElementi.innerHTML = `<td class="td-ekle1">${kisiBilgi.ad}</td>
    <td class="td-ekle2">${kisiBilgi.soyAd}</td>
    <td class="td-ekle3">${kisiBilgi.mail}</td>
    <td>
        <button class="btn btn-delete">
            <i class="fas fa-trash"></i></td>
    </button>
    <td>
        <button class="btn btn-edit">
            <i class="fas fa-pen-square"></i>
        </button>
    </td>`;
    tabloEkle.appendChild(olusturulanTrElementi);
    tumKisilerDizisi.push(kisiBilgi);

    bilgiOlustur('kisi rehbere kaydedildi', true);


    // $(".tbodyekle tr,.tbodyekle td").each(function(i,v){});
    //jquery ile
    //     const $template = $( $('#kayit')[0].innerHTML );
    // // or alternatively get the content with .prop('content')
    // $template.find('td:nth-child(1)').html(kisiBilgi.ad);
    // $template.find('td:nth-child(2)').html(kisiBilgi.soyAd);
    // $template.find('td:nth-child(3)').html(kisiBilgi.mail);
    // $template.appendTo('tbody');
}