function checkPassword() {
  const password = document.getElementById("password").value;
  const encoded = btoa(password); 
  const correct = "MTIzNA=="; 

  if (encoded === correct) {
    sessionStorage.setItem("auth", "ok");
    window.location.href = "main.html";
  } else {
    document.getElementById("error").innerText = "❌ รหัสผ่านไม่ถูกต้อง";
  }
}
