// Inisialisasi IndexedDB
var db;
var request = indexedDB.open('portofolio', 1);

request.onerror = function(event) {
    console.log("Error saat membuka database: " + event.target.errorCode);
};

request.onupgradeneeded = function(event) {
    db = event.target.result;
    var objectStore = db.createObjectStore("contact", { keyPath: "id", autoIncrement: true });
    objectStore.createIndex("name", "name", { unique: false });
    objectStore.createIndex("email", "email", {unique: false});
    objectStore.createIndex("subject", "subject", { unique: false });
    objectStore.createIndex("message", "message", { unique: false });
};

request.onsuccess = function(event) {
    db = event.target.result;
    // showComments();
};

// Menambahkan komentar ke dalam IndexedDB
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var subject = document.getElementById('subject').value;
    var message = document.getElementById('message').value;

    var transaction = db.transaction(['contact'], 'readwrite');
    var objectStore = transaction.objectStore('contact');
    var comment = { name: name, email : email, subject : subject, message: message };
    objectStore.add(comment);

    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('subject').value = '';
    document.getElementById('message').value = '';

    transaction.oncomplete = function() {
        alert("Komentar telah disimpan.");
        document.getElementById("contactForm").reset();
        console.log("Komen Berhasil disimpan");
        // tampilkanKomentar();
    };

    transaction.onerror = function(event) {
        console.error("Kesalahan saat menyimpan komentar: " + event.target.error);
     };

});

// function tampilkanKomentar() {
//     var komentarKolom = document.getElementById("contactForm");
//     komentarKolom.innerHTML = ""; // Hapus konten sebelumnya

//     var objectStore = db.transaction("contact").objectStore("contact");

//     objectStore.openCursor().onsuccess = function(event) {
//         var cursor = event.target.result;

//         if (cursor) {
//             var komentarDiv = document.createElement("div");
//             komentarDiv.innerHTML = "<strong>" + cursor.value.nama + " (" + cursor.value.email + ")<strong><br>" + cursor.value.komentar + "<br>";
//             komentarKolom.appendChild(komentarDiv);
//             cursor.continue();
//         }
//     };
// }
// tampilkanKomentar();
