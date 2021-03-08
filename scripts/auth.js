auth.onAuthStateChanged((k) => {
  //console.log(k);
  if (k) {
    console.log("Giriş işlemi başarılı");
    //verileri getir
    db.collection("Makaleler").onSnapshot((snapshot) => {
      //console.log(snapshot.docs);
      makaleYükle(snapshot.docs);
      kullanıcıYükle(k);
    });
  } else {
    makaleYükle([]);
    kullanıcıYükle();
  }
});

const makaleOlusturForm = document.querySelector("#create-form");

makaleOlusturForm.addEventListener("submit", (e) => {
  e.preventDefault();
  db.collection("Makaleler")
    .add({
      baslik: makaleOlusturForm["title"].value,
      icerik: makaleOlusturForm["content"].value,
    })
    .then(() => {
      const modal = document.querySelector("#modal-create");
      M.Modal.getInstance(modal).close();
      makaleOlusturForm.reset();
    })
    .catch((err) => {
      console.log(err);
    });
});

const üyelikForm = document.querySelector("#signup-form");

üyelikForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("başarılı");

  const mail = üyelikForm["signup-email"].value;
  const pass = üyelikForm["signup-password"].value;
  const bio = üyelikForm["signup-bio"].value;

  auth.createUserWithEmailAndPassword(mail,pass).then((sonuc) => {
    console.log(sonuc.user);
    return db
      .collection("kullanıcılar")
      .doc(sonuc.user.uid)
      .set({
        bio: bio,
      })
      .then(() => {
        const modal = document.querySelector("#modal-signup");
        M.Modal.getInstance(modal).close();
        üyelikForm.reset();
      });
  });
});

const cikisYap = document.querySelector("#logout");

cikisYap.addEventListener("click", (e) => {
  e.preventDefault();
  auth.signOut().then(() => console.log("Çıkıs basarili"));
});

const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const mail = loginForm["login-email"].value;
  const password = loginForm["login-password"].value;
  console.log(mail + password);
  auth
    .signInWithEmailAndPassword(mail, password)
    .then((veri) => console.log(veri.user))
    .catch((err) => console.log(err));
  const modal = document.querySelector("#modal-login");
  M.Modal.getInstance(modal).close();
});
