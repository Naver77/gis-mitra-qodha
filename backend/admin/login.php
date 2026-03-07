<?php
session_start();
require_once '../config/database.php';

// Jika sudah login, lempar ke dashboard
if(isset($_SESSION['admin_logged_in'])) {
    header("Location: index.php");
    exit;
}

// Logic Login
$error = "";
if(isset($_POST['login'])) {
    $user = mysqli_real_escape_string($conn, $_POST['username']);
    $pass = md5($_POST['password']); // MD5 Basic

    $q = "SELECT * FROM tb_admin WHERE username = '$user' AND password = '$pass'";
    $r = mysqli_query($conn, $q);

    if(mysqli_num_rows($r) == 1) {
        $data = mysqli_fetch_assoc($r);
        $_SESSION['admin_logged_in'] = true;
        $_SESSION['admin_id'] = $data['id_admin'];
        $_SESSION['admin_nama'] = $data['nama_lengkap'];
        header("Location: index.php");
        exit;
    } else {
        $error = "Username atau Password salah!";
    }
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Admin - Qodha</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&display=swap" rel="stylesheet">
    <style>body { font-family: 'Plus Jakarta Sans', sans-serif; }</style>
</head>
<body class="bg-gray-900 flex items-center justify-center min-h-screen relative overflow-hidden">
    
    <div class="absolute top-[-10%] left-[-10%] w-96 h-96 bg-amber-500 rounded-full blur-[150px] opacity-20"></div>
    <div class="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-emerald-500 rounded-full blur-[150px] opacity-20"></div>

    <div class="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md relative z-10">
        <div class="text-center mb-8">
            <h1 class="text-2xl font-extrabold text-gray-800">Qodha Admin</h1>
            <p class="text-gray-500 text-sm mt-1">Silakan masuk untuk mengelola sistem</p>
        </div>

        <?php if($error): ?>
            <div class="bg-red-100 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6 text-sm text-center">
                <?= $error ?>
            </div>
        <?php endif; ?>

        <form method="POST">
            <div class="mb-4">
                <label class="block text-gray-700 text-xs font-bold mb-2 uppercase tracking-wide">Username</label>
                <input type="text" name="username" class="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-amber-500 focus:bg-white focus:outline-none transition" placeholder="Masukkan username" required autofocus>
            </div>
            <div class="mb-6">
                <label class="block text-gray-700 text-xs font-bold mb-2 uppercase tracking-wide">Password</label>
                <input type="password" name="password" class="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-amber-500 focus:bg-white focus:outline-none transition" placeholder="Masukkan password" required>
            </div>
            <button type="submit" name="login" class="w-full bg-gray-900 text-white font-bold py-3 px-4 rounded-lg hover:bg-amber-500 transition duration-300 shadow-lg">
                MASUK DASHBOARD
            </button>
        </form>
        
        <div class="mt-6 text-center">
            <a href="../public/" class="text-xs text-gray-400 hover:text-gray-600 underline">&larr; Kembali ke Website</a>
        </div>
    </div>

</body>
</html>