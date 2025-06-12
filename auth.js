function checkPassword() {
  const password = document.getElementById("password").value;
  const encoded = btoa(password); // เข้ารหัส Base64
  const correct = "MTIzNA=="; // Base64 ของ "1234"

  if (encoded === correct) {
    sessionStorage.setItem("auth", "ok");
    window.location.href = "main.html";
  } else {
    document.getElementById("error").innerText = "❌ รหัสผ่านไม่ถูกต้อง";
  }
}
