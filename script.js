document.addEventListener('DOMContentLoaded', function () {
    const dynamicText = document.getElementById('dynamic-text');
    const words = ['مهندس برمجيات', 'مطور برامج', 'جيمر', 'مبرمج'];
    let wordIndex = 0;
    let letterIndex = 0;
    let timeout = 100; // الوقت بين ظهور كل حرف (بالملي ثانية)
    let displayTimeout = 1000; // الوقت الذي يظهر فيه الكلمة بالكامل قبل الحذف (بالملي ثانية)
    let deleteTimeout = 50; // الوقت بين حذف كل حرف (بالملي ثانية)

    function typeLetter() {
        const currentWord = words[wordIndex];
        if (letterIndex < currentWord.length) {
            dynamicText.textContent += currentWord.charAt(letterIndex);
            letterIndex++;
            setTimeout(typeLetter, timeout); // تغيير الحرف بعد الوقت المحدد
        } else {
            // بعد انتهاء كتابة الكلمة، انتظر ثم ابدأ الحذف
            setTimeout(deleteLetter, displayTimeout);
        }
    }

    function deleteLetter() {
        const currentText = dynamicText.textContent;
        if (currentText.length > 0) {
            dynamicText.textContent = currentText.slice(0, -1); // حذف آخر حرف
            setTimeout(deleteLetter, deleteTimeout); // حذف الحرف بعد الوقت المحدد
        } else {
            // بعد انتهاء الحذف، انتقل إلى الكلمة التالية
            letterIndex = 0;
            wordIndex = (wordIndex + 1) % words.length; // الانتقال إلى الكلمة التالية
            setTimeout(typeLetter, timeout); // ابدأ كتابة الكلمة الجديدة
        }
    }

    typeLetter(); // بدء التأثير

    // تغيير عنوان الصفحة عند مغادرتها
    window.addEventListener('beforeunload', function (event) {
        document.title = 'وداعًا!'; // العنوان الجديد
        // تأكد من تعيين عنوان جديد ليظهر في بعض المتصفحات
        event.returnValue = ''; // معظم المتصفحات لا تعرض الرسالة المخصصة، ولكن يمكن استخدام هذه القيمة لتفعيل الحدث
    
        document.querySelectorAll('a.nav-link').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

        ScrollReveal().reveal('.section', {
            duration: 1000,
            origin: 'bottom',
            distance: '50px',
            reset: true
        });        
        
    });
});
