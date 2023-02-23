# myAdminPanelApi
Api for My Admin Panel

Things to do:
+ panelden dil ekleyebilelim bir api yaz
+ settingse eger column name gelirse gelen column isminin datasini cekip sadece o columunu geri gonder
+ yeni eklenen ozelliklerin sitemapini ayarla
+ Postlar ve sayfa butonlari olan tum icerikler icin pageNumber parametersi ekle ve o sayi adeti kadar gonder
+ postlrada title ile armada yaptir
+ servislerden gelen datalarin siralamasinin dogru ioldugunu kontrol et (tarih sondan ilke)
+ datalar gelirken is fixed olanlar en onde gozuksun sonrasi sorta gore ayarlansin sonrasi ise olusturma tarihine gore ayarlansin
+ sitemap icin daha kullanisli bir yol bul direk databaseden cekmek gibi
+ sitemapi yapinca modellerde olan sitemap columnunu sil
+ Ecommerceda eslesen attribute ler ve variationlarin termden populatelerini cek
+ servislerde findone mi yoksa limit mi kullanilmali arastir
- cekilen datalarda cogul ve tekil cekim yap cogul cekimlerde contentsde buyuk datalar gitmesin tekil cekimlerde contetsdeki tumm datalar gitsin
- product icin gereksiz variation detaylari gonderme ve cogul ve tekil cekim olarak servisleri ayarla
- tum servislerin interface isimlerini duzenle ve models interfacelerini ayir
- tum servisler de cogul ve tekil fonksiyon isimleri olustur.
- controllerde guncellenen, eklenen yada silinen datalarin return degerlerini result data ile gonder front ende
- servislerde tek data islemlerinde findOne coklu islemmlerde findMany yada find metodu kullan
- servis interfacelerin siralamasini ayarla (result, get, add, update, delete)
- servislerde find kullanilan yerlerde limit kullan
