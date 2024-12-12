document.getElementById('downloadBtn').addEventListener('click', async () => {
    const url = document.getElementById('tiktokUrl').value;
    const resultDiv = document.getElementById('result');

    if (!url) {
        resultDiv.innerHTML = 'Masukkan URL TikTok!';
        return;
    }

    try {
        resultDiv.innerHTML = 'Mengunduh, mohon tunggu...';

        const response = await fetch(`https://api.botcahx.eu.org/api/dowloader/tiktok?url=${encodeURIComponent(url)}&apikey=mS4bOjqu`);
        const data = await response.json();

        if (data.result) {
            const { video, title, audio } = data.result;
            let message = <strong>Title:</strong> ${title}<br>;

            if (video.length > 1) {
                video.forEach(v => {
                    message += <a href="${v}" download>Unduh Video</a><br>;
                });
            } else {
                message += <a href="${video[0]}" download>Unduh Video</a><br>;
            }

            if (audio.length > 0) {
                message += <a href="${audio[0]}" download>Unduh Audio</a>;
            } else {
                message += 'Audio tidak tersedia!';
            }

            resultDiv.innerHTML = message;
        } else {
            resultDiv.innerHTML = 'Video tidak ditemukan!';
        }
    } catch (error) {
        resultDiv.innerHTML = 'Terjadi kesalahan saat mengunduh video!';
    }
});
