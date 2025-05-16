document.addEventListener('DOMContentLoaded', () => {
    const terminal = document.getElementById('terminal');
    let currentTypedText = document.querySelector('.typed-text');
    let currentCursor = document.querySelector('.cursor');
    
    const commands = [
        { text: 'cat resume.txt', delay: 50, class: 'command' },
        { text: 'Привет, меня зовут Кирилл!', delay: 20, class: 'info' },
        { text: 'Возраст: 23 года', delay: 20, class: 'info' },
        { text: 'Образование: бакалавриат, математик', delay: 20, class: 'info' },
        { text: 'Опыт коммерческой разработки: более 5 лет', delay: 20, class: 'info' },
        { text: 'Начинал с фриланса, затем работал на ИП в роли Fullstack разработчика и DevOps инженера одновременно', delay: 20, class: 'info' },
        { text: 'Специализация: разработка Telegram ботов под ключ', delay: 20, class: 'info' },
        { text: 'Выполнял задачи по разработке, деплою, обновлению и поддержке клиентских чат-ботов и веб-приложений', delay: 20, class: 'info' },
        { text: '', delay: 20 },
        { text: 'Навыки:', delay: 20, class: 'command' },
        { text: '- Python3, Flask, Django, FastAPI', delay: 20, class: 'comment' },
        { text: '- Telegram Bot Api, Telegram Web Apps', delay: 20, class: 'comment' },
        { text: '- REST, NGINX, Gunicorn, Supervisor', delay: 20, class: 'comment' },
        { text: '- HTML5, CSS3, JavaScript, Websocket', delay: 20, class: 'comment' },
        { text: '- Docker, GIT, Ubuntu Server', delay: 20, class: 'comment' },
        { text: '- PostgreSQL, SQLite', delay: 20, class: 'comment' },
        { text: ' ', delay: 20 },
        { text: 'Мои пет-проекты:', delay: 20, class: 'success' },
        { text: '1. FinanceKrythBot - минималистичное веб-приложение для менеджмента финансов', delay: 20, class: 'info' },
        { text: 'Стек: Python, Chart Js, Flask, socketio, Nginx, Supervisor, Gunicorn, PostgreSQL', delay: 20, class: 'var' },
        { text: 'Ссылка: https://t.me/FinanceKrythBot', delay: 20, class: 'link', href: 'https://t.me/FinanceKrythBot' },
        { text: ' ', delay: 20 },
        
        { text: '2. KrythToDoBot - Telegram бот с минималистичным таск трекером в стиле терминала внутри', delay: 20, class: 'info' },
        { text: 'Стек: Python, Flask, socketio, Nginx, Supervisor, Gunicorn, PostgreSQL', delay: 20, class: 'var' },
        { text: 'Ссылка: https://t.me/todokrythbot', delay: 20, class: 'link', href: 'https://t.me/todokrythbot' },
        { text: ' ', delay: 20 },

        
        { text: '3. KrythNoteBot - Telegram бот с веб-приложением для заметок', delay: 20, class: 'info' },
        { text: 'Стек: Python, Flask, socketio, Nginx, Supervisor, Gunicorn, PostgreSQL', delay: 20, class: 'var' },
        { text: 'Ссылка: https://t.me/krythnotebot', delay: 20, class: 'link', href: 'https://t.me/krythnotebot' },
        { text: ' ', delay: 20 },
        
        { text: '4. RedRockRobot - Telegram бот с мультиплеерной игрой в крестики-нолики', delay: 20, class: 'info' },
        { text: 'Стек: Python, Flask, socketio, Nginx, Supervisor, Gunicorn, PostgreSQL', delay: 20, class: 'var' },
        { text: 'Ссылка: https://t.me/redrockrobot', delay: 20, class: 'link', href: 'https://t.me/redrockrobot' },
        { text: ' ', delay: 20 },

        { text: 'Связь со мной:', delay: 20, class: 'success' },
        { text: 'Telegram: @hqwskq', delay: 20, class: 'info' },
        { text: 'Email: kolosoek86@gmail.com', delay: 20, class: 'info' },
        { text: 'GitHub: https://github.com/xxanax', delay: 20, class: 'link', href: 'https://github.com/xxanax' },
        { text: ' ', delay: 20 },
        { text: 'Спасибо за просмотр моего резюме!', delay: 20, class: 'success' }
    ];

    let currentCommand = 0;
    let currentChar = 0;

    function typeWriter() {
        if (currentCommand < commands.length) {
            const command = commands[currentCommand];
            
            if (currentChar < command.text.length) {
                const char = command.text.charAt(currentChar);
                const span = document.createElement('span');
                
                if (command.class) {
                    span.className = command.class;
                }
                
                // Если строка имеет класс 'link' и href, создаем элемент <a>
                if (command.class === 'link' && command.href) {
                    if (currentChar === 0) {
                        const link = document.createElement('a');
                        link.href = command.href;
                        link.className = 'link';
                        link.target = '_blank'; // Открывать ссылку в новой вкладке
                        currentTypedText.appendChild(link);
                        currentTypedText = link; // Временная замена для добавления текста в <a>
                    }
                    currentTypedText.appendChild(document.createTextNode(char));
                } else {
                    span.textContent = char;
                    currentTypedText.appendChild(span);
                }
                
                terminal.scrollTop = terminal.scrollHeight;
                currentChar++;
                setTimeout(typeWriter, command.delay);
            } else {
                // Восстанавливаем currentTypedText, если использовался <a>
                if (command.class === 'link' && command.href) {
                    currentTypedText = currentTypedText.parentElement; // Возвращаем к исходному .typed-text
                }
                
                // Убираем курсор с завершенной строки
                if (currentCursor) {
                    currentCursor.style.display = 'none';
                }
                
                currentCommand++;
                currentChar = 0;
                
                if (command.action) {
                    command.action();
                }
                
                // Создаем новую строку
                if (currentCommand < commands.length) {
                    const newLine = document.createElement('div');
                    newLine.className = 'terminal-line';
                    newLine.innerHTML = '$ <span class="typed-text"></span><span class="cursor">|</span>';
                    terminal.appendChild(newLine);
                    
                    // Обновляем ссылки на текущие элементы
                    currentTypedText = newLine.querySelector('.typed-text');
                    currentCursor = newLine.querySelector('.cursor');
                }
                
                setTimeout(typeWriter, 100);
            }
        } else {
            // В конце анимации убираем курсор
            if (currentCursor) {
                currentCursor.style.display = 'none';
            }
        }
    }

    // Начинаем анимацию печати
    typeWriter();
});