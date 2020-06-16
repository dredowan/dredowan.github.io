onmessage = function(e) {
    const nama = e.data['nama'];
    const usia = e.data['usia'];
    const uangawal = e.data['uangawal'];
    const sukubunga = e.data['sukubunga'];
    const lamapenyimpanan = e.data['lamapenyimpanan'];
    const totalbunga = parseInt(uangawal) * parseInt(sukubunga)/100 * parseInt(lamapenyimpanan);
    const uangakhir = parseInt(uangawal) + parseInt(totalbunga);
    const kalimat = nama + " Usia " + usia + " Tahun, Menyimpan Uang Selama " + lamapenyimpanan + " Tahun dengan Bunga Total "+ totalbunga;
    var hasil = {
        'uangakhir' : uangakhir,
        'totalbunga' : totalbunga,
        'nama' : nama,
        'usia' : usia,
        'lama' : lamapenyimpanan,
        'string' : kalimat
    }
    postMessage(hasil);
  }