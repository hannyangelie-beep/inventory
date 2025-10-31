// Suara efek
const soundMakan = document.getElementById("soundMakan");
const soundDamage = document.getElementById("soundDamage");

// Object method untuk pemain
const MethodPemain = {
  makan: function(porsi) {
    this.energi += porsi;
    soundMakan.currentTime = 0;
    soundMakan.play();
    console.log(`🍗 ${this.nama} makan, energi sekarang ${this.energi}`);
  },
  damage: function(attack) {
    this.energi -= attack;
    if (this.energi < 0) this.energi = 0;
    soundDamage.currentTime = 0;
    soundDamage.play();
    console.log(`💥 ${this.nama} kena damage! Energi: ${this.energi}`);
  },
  serang: function(lawan) {
    if (this.energi <= 0) {
      console.log(`${this.nama} sudah kalah dan tidak bisa menyerang.`);
      return;
    }
    const baseDamage = this.senjataAktif.damage;
    const damage = Math.floor(Math.random() * 5) + baseDamage; // damage senjata + random(0-4)
    console.log(`${this.senjataAktif.nama} ${this.nama} menyerang ${lawan.nama} sebesar ${damage}`);
    lawan.damage(damage);
  }
};

// Daftar senjata yang tersedia
const senjata = {
  pedang: { nama: "Pedang ⚔️", damage: 8 },  // Double-edged sword dengan damage tinggi
  panah: { nama: "Panah 🏹", damage: 7 },    // Serangan jarak jauh yang kuat
  kapak: { nama: "Kapak 🪓", damage: 10 },    // Senjata terkuat dengan damage tertinggi
  tombak: { nama: "Tombak 🔱", damage: 9 }    // Tombak trisula dengan damage sangat tinggi
};

// Constructor pemain
function Pemain(nama, energi) {
  let pemain = {};
  pemain.nama = nama;
  pemain.energi = energi;
  pemain.inventory = [senjata.pedang]; // Mulai dengan pedang
  pemain.senjataAktif = pemain.inventory[0];
  pemain.makan = MethodPemain.makan;
  pemain.damage = MethodPemain.damage;
  pemain.serang = MethodPemain.serang;
  
  // Menambah senjata ke inventory
  pemain.tambahSenjata = function(senjataBaru) {
    if (!this.inventory.includes(senjataBaru)) {
      this.inventory.push(senjataBaru);
      updateInventoryUI(this === pemain1 ? 1 : 2);
    }
  };

  // Memilih senjata aktif
  pemain.pilihSenjata = function(senjataDipilih) {
    this.senjataAktif = senjataDipilih;
    updateUI();
  };

  return pemain;
}

// Membuat dua pemain
let pemain1 = Pemain("Andi", 10);
let pemain2 = Pemain("Donny", 11);

// Menambahkan senjata awal untuk kedua pemain
pemain1.tambahSenjata(senjata.panah);
pemain1.tambahSenjata(senjata.kapak);
pemain2.tambahSenjata(senjata.tombak);
pemain2.tambahSenjata(senjata.panah);

// Fungsi update inventory UI
function updateInventoryUI(playerNum) {
  const inventory = document.getElementById(`inventory${playerNum}`);
  const player = playerNum === 1 ? pemain1 : pemain2;
  
  inventory.innerHTML = '';
  player.inventory.forEach(senjata => {
    const button = document.createElement('button');
    button.className = `p-2 rounded-lg ${senjata === player.senjataAktif ? 'bg-purple-600' : 'bg-purple-500 hover:bg-purple-600'}`;
    button.textContent = senjata.nama;
    button.onclick = () => player.pilihSenjata(senjata);
    inventory.appendChild(button);
  });
}

// Fungsi update tampilan
function updateUI() {
  document.getElementById("energi1").textContent = pemain1.energi;
  document.getElementById("energi2").textContent = pemain2.energi;

  const nama1 = document.getElementById("nama1");
  const nama2 = document.getElementById("nama2");

  nama1.textContent = pemain1.energi > 0 ? "Andi" : "Andi 💀";
  nama2.textContent = pemain2.energi > 0 ? "Donny" : "Donny 💀";

  // Update inventory
  updateInventoryUI(1);
  updateInventoryUI(2);
}

// Fungsi reset game
function resetGame() {
  pemain1.energi = 10;
  pemain2.energi = 11;
  updateUI();
  console.log("🔁 Game direset!");
}

// Update pertama kali
updateUI();
