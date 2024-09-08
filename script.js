document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.getElementById('mode-toggle');
    const body = document.body;

    // التحقق من localStorage للحصول على الوضع المحفوظ
    const savedMode = localStorage.getItem('mode');
    if (savedMode) {
        body.classList.add(savedMode);
        toggleButton.textContent = savedMode === 'night-mode' ? 'التبديل إلى الوضع النهاري' : 'التبديل إلى الوضع الليلي';
    } else {
        body.classList.add('day-mode');
    }

    toggleButton.addEventListener('click', function () {
        if (body.classList.contains('day-mode')) {
            body.classList.replace('day-mode', 'night-mode');
            toggleButton.textContent = 'Light mode';
            localStorage.setItem('mode', 'night-mode');
        } else {
            body.classList.replace('night-mode', 'day-mode');
            toggleButton.textContent = 'Night mode';
            localStorage.setItem('mode', 'day-mode');
        }
    });

    // تأثير التمرير السلس بين الأقسام
    document.querySelectorAll('a.nav-link').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // نص ديناميكي
    const dynamicText = document.getElementById('dynamic-text');
    const words = ['مهندس برمجيات', 'مطور', 'لاعب', 'مبرمج'];
    let wordIndex = 0;
    let letterIndex = 0;
    let timeout = 100; // الوقت بين ظهور كل حرف (بالملي ثانية)
    let displayTimeout = 2000; // الوقت الذي يظهر فيه الكلمة بالكامل قبل الحذف (بالملي ثانية)
    let deleteTimeout = 50; // الوقت بين حذف كل حرف (بالملي ثانية)

    function typeLetter() {
        const currentWord = words[wordIndex];
        if (letterIndex < currentWord.length) {
            dynamicText.textContent += currentWord.charAt(letterIndex);
            letterIndex++;
            setTimeout(typeLetter, timeout);
        } else {
            setTimeout(deleteLetter, displayTimeout);
        }
    }

    function deleteLetter() {
        const currentText = dynamicText.textContent;
        if (currentText.length > 0) {
            dynamicText.textContent = currentText.slice(0, -1);
            setTimeout(deleteLetter, deleteTimeout);
        } else {
            letterIndex = 0;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(typeLetter, timeout);
        }
    }

    typeLetter();
});
