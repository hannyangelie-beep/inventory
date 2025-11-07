let siswa = ['Andi', 'Susanto', 'Sansi', 'Donny'];

let jumlahKarakter = siswa.map(function(nama) {
    return nama.length;
});
console.log(jumlahKarakter); // [4, 7, 5, 5]