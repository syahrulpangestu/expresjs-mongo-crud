const Mahasiswa = require("../models/Mahasiswa");

module.exports = {
    viewMahasiswa: async(req, res)=>{
        try {
            const mahasiswa = await Mahasiswa.find();
            const alertMessage = req.flash("alertMessage");
            const alertStatus = req.flash("alertStatus");
            const alert = {message:alertMessage, status: alertStatus};
            res.render("index", {
                mahasiswa,
                alert,
                title: "CRUD",
            });
        } catch (error) {
            res.redirect("/mahasiswa");
        }
    },// Membuat create data untuk mahasiswa
    // Membuat fungsi untuk menambahkan data di form dan menggunakan async await
    addMahasiswa: async (req, res) => {
      // memberi validasi untuk inputan yang kosong
      try {
        // Membuat contanta untuk nama, nim, jurusan, dan alamat yang diambil dari body/yang diketikan di form
        const { nama, nim, jurusan, alamat } = req.body;
        // lalu mengembalikan fungsi dan membuat data dari scheme/model Mahasiswa
        await Mahasiswa.create({ nama, nim, jurusan, alamat });
        // ketika create data berhasil memberikan notifikasi
        req.flash("alertMessage", "Success add data Mahasiswa");
        req.flash("alertStatus", "success");
        res.redirect("/mahasiswa"); // Setelah berhasil membuat data akan meredirect ke tujuan yang sudah ditentukan
      } catch (error) {
        // ketika create data error memberikan notifikasi
        req.flash("alertMessage", `${error.message}`);
        req.flash("alertStatus", "danger");
        // ketika inputan kosong, maka redirect kehalaman
        res.redirect("/mahasiswa");
      }
    },
    editMahasiswa: async (req, res) => {
        try {
          // Membuat variabel yang menerima id, dan nama yang didapat dari req body atau yang di inputkan di form input
          const { id, nama, nim, jurusan, alamat } = req.body;
          /*  mencari variabel yang dideklarasikan diatas dan mengecek _id yang ada di req body yang dikirim
       _id didapat database dan id isinya dari inputan user */
          const mahasiswa = await Mahasiswa.findOne({ _id: id });
          /* mahasiswa diambil dari fungsi diatas dan titik(.) nama diambil dari database = nama yang didapat dari req body
       yang tentu dikirimkan dari inputan user */
          mahasiswa.nama = nama;
          mahasiswa.nim = nim;
          mahasiswa.jurusan = jurusan;
          mahasiswa.alamat = alamat;
          // Menyimpan datanya ke database
          await mahasiswa.save();
          // ketika edit data berhasill memberikan notifikasi/alert
          req.flash("alertMessage", "Success edit data mahasiswa");
          req.flash("alertStatus", "success");
          // Setelah berhasil maka meredirect ke tujuan yang ditentukan (/mahasiswa)
          res.redirect("/mahasiswa");
        } catch (error) {
          // ketika edit data error memberikan notifikasi erronya
          req.flash("alertMessage", `${error.message}`);
          req.flash("alertStatus", "danger");
          // ketika inputan kosong maka redirect kehalaman (/mahasiswa)
          res.redirect("/mahasiswa");
        }
      },
      deleteMahasiswa: async (req, res) => {
        try {
          /*
      Membuat variabel yang menerima id yang didapat dari params
      id didapat database dan id isinya dari params
      */
          const { id } = req.params;
          // cek data Mahasiswa yang mau di delete berdasarkan id
          const mahasiswa = await Mahasiswa.findOne({ _id: id });
          // setelah datanya sudah didapat maka menghapusnya
          await mahasiswa.remove();
          // ketika delete data memberikan notifikasi
          req.flash("alertMessage", "Success delete data mahasiswa");
          req.flash("alertStatus", "warning");
          // setelah berhasil remove maka melakukan redirect
          res.redirect("/mahasiswa");
        } catch (error) {
          // ketika create data error memberikan notifikasi
          req.flash("alertMessage", `${error.message}`);
          req.flash("alertStatus", "danger");
          // ketika inputa kosong redirect kehalaman
          res.redirect("/mahasiswa");
        }
      },

};