const makaleler = document.querySelector(".guides");
const cikislinkleri = document.querySelectorAll(".logged-out");
const girislinkleri = document.querySelectorAll(".logged-in");
const hesapDetayları = document.querySelector(".account-details");
const kullanıcıYükle = (kullanıcı) => {
  if (kullanıcı) {
    db.collection("kullanıcılar")
      .doc(kullanıcı.uid)
      .get()
      .then((doc) => {
        let html = `<div>Kullanıcı mail: <b>${kullanıcı.email}</b></div>
      <div>Kullanıcı bio: <b>${doc.data().bio}</b></div>`;
        hesapDetayları.innerHTML = html;
      });

    girislinkleri.forEach((item) => (item.style.display = "block"));
    cikislinkleri.forEach((item) => (item.style.display = "none"));
  } else {
    hesapDetayları.innerHTML = "";
    girislinkleri.forEach((item) => (item.style.display = "none"));
    cikislinkleri.forEach((item) => (item.style.display = "block"));
  }
};

const makaleYükle = (data) => {
  if (data.length) {
    let html = "";
    data.forEach((doc) => {
      const makale = doc.data();
      //console.log(makale);
      const li = ` <li>
     <div class="collapsible-header grey-lighten-4">${makale.baslik}</div>
      <div class="collapsible-body white"><span>${makale.icerik}</span></div>
  </li>`;
      html += li;
    });
    makaleler.innerHTML = html;
  } else {
    makaleler.innerHTML =
      '<h5 class="center-align">Makaleler için giriş yapınız</h5>';
  }
};

document.addEventListener("DOMContentLoaded", () => {
  var modallar = document.querySelectorAll(".modal");
  M.Modal.init(modallar);
  var makaleler = document.querySelectorAll(".collapsible");
  M.Collapsible.init(makaleler);
});
