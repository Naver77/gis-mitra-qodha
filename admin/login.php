<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Administrator - QodhaMaps</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body class="bg-gray-100 h-screen flex items-center justify-center">

    <div class="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm border border-gray-200">
        <div class="text-center mb-6">
            <div class="bg-emerald-100 text-emerald-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">
                <i class="fa-solid fa-user-shield"></i>
            </div>
            <h2 class="text-2xl font-bold text-gray-800">Admin Login</h2>
            <p class="text-sm text-gray-500">Masuk untuk mengelola peta</p>
        </div>

        <?php if(isset($_GET['msg'])): ?>
            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm text-center">
                <?= htmlspecialchars($_GET['msg']); ?>
            </div>
        <?php endif; ?>

        <form action="auth.php" method="POST">
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">Username</label>
                <div class="relative">
                    <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                        <i class="fa-solid fa-user"></i>
                    </span>
                    <input type="text" name="username" class="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="admin" required>
                </div>
            </div>

            <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2">Password</label>
                <div class="relative">
                    <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                        <i class="fa-solid fa-lock"></i>
                    </span>
                    <input type="password" name="password" class="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="••••••" required>
                </div>
            </div>

            <button type="submit" name="login" class="w-full bg-emerald-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-emerald-700 transition duration-300 shadow-lg shadow-emerald-200">
                MASUK <i class="fa-solid fa-arrow-right-to-bracket ml-2"></i>
            </button>
        </form>

        <div class="mt-6 text-center">
            <a href="../public/index.php" class="text-sm text-gray-500 hover:text-emerald-600">
                &larr; Kembali ke Peta Utama
            </a>
        </div>
    </div>

</body>
</html>