// =====================================================
// Praktikum 5 - JavaScript Dasar dan Manipulasi HTML
// =====================================================

// ---------- Latihan 1: Menampilkan output ----------
document.getElementById("pesan").textContent = "Hello World";
console.log("Hello World");

// ---------- Latihan 2: Alert dan prompt ----------
function latihan2() {
    const namaPengguna = prompt("Masukkan nama Anda:", "");

    if (namaPengguna && namaPengguna.trim() !== "") {
        alert("Halo, " + namaPengguna + "!");
        document.getElementById("pesan").textContent = "Selamat datang, " + namaPengguna + ".";
    } else {
        alert("Nama belum diisi.");
    }
}

// ---------- Latihan 3: Function dan operasi aritmetika ----------
function operasiDasar(a, b) {
    const baris = [
        "Penjumlahan: " + (a + b),
        "Pengurangan: " + (a - b),
        "Perkalian: " + (a * b),
        "Pembagian: " + (b !== 0 ? a / b : "Tidak dapat dibagi nol"),
        "Modulus: " + (b !== 0 ? a % b : "Tidak dapat dibagi nol")
    ];

    baris.forEach((teks) => console.log(teks));
    document.getElementById("hasilLatihan3").textContent =
        "Input: a = " + a + ", b = " + b + "\n" + baris.join("\n");
}

// Eksperimen 1: dua nilai dari prompt, dikonversi menjadi number
function eksperimen1() {
    const inputA = prompt("Masukkan bilangan pertama:");
    const inputB = prompt("Masukkan bilangan kedua:");

    if (inputA === null || inputB === null ||
        inputA.trim() === "" || inputB.trim() === "") {
        alert("Input tidak boleh kosong.");
        return;
    }

    const a = Number(inputA);
    const b = Number(inputB);

    if (Number.isNaN(a) || Number.isNaN(b)) {
        alert("Input harus berupa angka.");
        return;
    }

    operasiDasar(a, b);
}

// ---------- Latihan 4: if-else ----------
function latihan4() {
    const inputNilai = prompt("Masukkan nilai (0–100):");

    // Cancel menghasilkan null, jadi dicek lebih dulu sebelum memakai trim()
    if (inputNilai === null) {
        alert("Input nilai tidak valid.");
        return;
    }

    const nilaiMahasiswa = Number(inputNilai);

    if (inputNilai.trim() === "" ||
        Number.isNaN(nilaiMahasiswa) || nilaiMahasiswa < 0 || nilaiMahasiswa > 100) {
        alert("Input nilai tidak valid.");
    } else if (nilaiMahasiswa >= 60) {
        alert("Lulus");
    } else {
        alert("Belum lulus");
    }
}

// ---------- Latihan 5: switch ----------
function latihan5() {
    const inputPilihan = prompt("Masukkan angka 1–5:");

    switch (inputPilihan) {
        case "1": alert("Bilangan satu"); break;
        case "2": alert("Bilangan dua"); break;
        case "3": alert("Bilangan tiga"); break;
        case "4": alert("Bilangan empat"); break;
        case "5": alert("Bilangan lima"); break;
        default: alert("Pilihan tidak tersedia");
    }
}

// ---------- Latihan 6: Genap atau ganjil ----------
function cekBilangan() {
    const input = document.getElementById("bilangan").value;
    const angka = Number(input);
    const hasil = document.getElementById("hasilBilangan");

    if (input.trim() === "" || !Number.isInteger(angka)) {
        hasil.textContent = "Masukkan bilangan bulat yang valid.";
    } else if (angka % 2 === 0) {
        hasil.textContent = "Bilangan genap";
    } else {
        hasil.textContent = "Bilangan ganjil";
    }
}

// ---------- Latihan 7: Ubah warna latar ----------
function ubahWarnaLatar(warna) {
    document.body.style.backgroundColor = warna;
}

// ---------- Latihan 8: Checkbox menu makanan ----------
const daftarMenu = document.querySelectorAll(".menu");

daftarMenu.forEach((item) => {
    item.addEventListener("change", hitungTotal);
});

function hitungTotal() {
    let total = 0;

    daftarMenu.forEach((item) => {
        if (item.checked) total += Number(item.value);
    });

    document.getElementById("total").textContent = total.toLocaleString("id-ID");
}

// ---------- Mini Project: Kalkulator nilai mahasiswa ----------
function hitungNilaiAkhir(tugas, uts, uas) {
    return tugas * 0.30 + uts * 0.30 + uas * 0.40;
}

function tentukanPredikat(nilai) {
    if (nilai >= 85) return "A";
    if (nilai >= 75) return "B";
    if (nilai >= 60) return "C";
    if (nilai >= 50) return "D";
    return "E";
}

// Mengembalikan angka bila valid (0-100), selain itu mengembalikan null
function bacaNilai(idInput) {
    const teks = document.getElementById(idInput).value;
    if (teks.trim() === "") return null;

    const angka = Number(teks);
    if (Number.isNaN(angka) || angka < 0 || angka > 100) return null;

    return angka;
}

// Bagian tampilan dipisahkan dari bagian perhitungan
function tampilkanHasilNilai(akhir) {
    document.getElementById("outAkhir").textContent = akhir.toFixed(2);
    document.getElementById("outPredikat").textContent = tentukanPredikat(akhir);
    document.getElementById("outStatus").textContent = akhir >= 60 ? "Lulus" : "Belum lulus";
    document.getElementById("hasilNilai").hidden = false;
}

function resetNilai() {
    document.getElementById("formNilai").reset();
    document.getElementById("errorNilai").textContent = "";
    document.getElementById("hasilNilai").hidden = true;
}

document.getElementById("formNilai").addEventListener("submit", (e) => {
    e.preventDefault();

    const tugas = bacaNilai("tugas");
    const uts = bacaNilai("uts");
    const uas = bacaNilai("uas");
    const pesanError = document.getElementById("errorNilai");

    if (tugas === null || uts === null || uas === null) {
        pesanError.textContent = "Semua nilai wajib diisi dengan angka pada rentang 0–100.";
        document.getElementById("hasilNilai").hidden = true;
        return;
    }

    pesanError.textContent = "";
    const akhir = hitungNilaiAkhir(tugas, uts, uas);
    console.log("Nilai akhir:", akhir.toFixed(2));
    console.log("Predikat:", tentukanPredikat(akhir));
    console.log("Status:", akhir >= 60 ? "Lulus" : "Belum lulus");
    tampilkanHasilNilai(akhir);
});

// ---------- Eksperimen 7: Tabel perkalian ----------
function tabelPerkalian(angka) {
    let teks = "";
    for (let i = 1; i <= 10; i++) {
        teks += angka + " x " + i + " = " + (angka * i) + "\n";
    }
    document.getElementById("hasilTabel").textContent = teks.trim();
}

// ---------- Eksperimen 8: Function cekGenap ----------
function cekGenap(angka) {
    return angka % 2 === 0;
}

function ujiCekGenap() {
    const input = prompt("Masukkan sebuah bilangan bulat:");
    const hasil = document.getElementById("hasilCekGenap");

    if (input === null || input.trim() === "" || !Number.isInteger(Number(input))) {
        hasil.textContent = "Input tidak valid.";
        return;
    }

    const angka = Number(input);
    hasil.textContent = "cekGenap(" + angka + ") = " + cekGenap(angka);
}

// ---------- Eksperimen 11: Sembunyikan / tampilkan elemen ----------
document.getElementById("tombolToggle").addEventListener("click", () => {
    const elemen = document.getElementById("elemenToggle");
    elemen.style.display = elemen.style.display === "none" ? "block" : "none";
});

// ---------- Tugas No. 7 (+ Eksperimen 9): Validasi form ----------
document.getElementById("formValidasi").addEventListener("submit", (e) => {
    e.preventDefault();

    const nama = document.getElementById("nama").value.trim();
    const nilaiTeks = document.getElementById("nilai").value.trim();
    const nilai = Number(nilaiTeks);
    const pesan = document.getElementById("pesanValidasi");

    pesan.className = "error";

    if (nama === "") {
        pesan.textContent = "Nama tidak boleh kosong.";
    } else if (nilaiTeks === "") {
        pesan.textContent = "Nilai tidak boleh kosong.";
    } else if (Number.isNaN(nilai) || nilai < 0 || nilai > 100) {
        pesan.textContent = "Nilai harus berupa angka pada rentang 0–100.";
    } else {
        pesan.className = "sukses";
        pesan.textContent = "Data valid. Nama: " + nama + ", Nilai: " + nilai + ".";
    }
});
