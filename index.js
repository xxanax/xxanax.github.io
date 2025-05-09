document.addEventListener('DOMContentLoaded', () => {
    const terminal = document.getElementById('terminal');
    let currentTypedText = document.querySelector('.typed-text');
    let currentCursor = document.querySelector('.cursor');
    
    const commands = [
        { text: 'cat resume.txt', delay: 100, class: 'command' },
        { text: 'Привет, меня зовут Кирилл!', delay: 50, class: 'info' },
        { text: 'Возраст: 22 года', delay: 50, class: 'info' },
        { text: 'Образование: бакалавриат, математик', delay: 50, class: 'info' },
        { text: 'Опыт коммерческой разработки: более 3 лет', delay: 50, class: 'info' },
        { text: 'Начинал с фриланса, затем работал на ИП в роли Fullstack разработчика и DevOps инженера одновременно', delay: 50, class: 'info' },
        { text: 'Специализация: разработка Telegram ботов под ключ', delay: 50, class: 'info' },
        { text: 'Выполнял задачи по разработке, деплою, обновлению и поддержке клиентских чат-ботов и веб-приложений', delay: 50, class: 'info' },
        { text:'', delay:50},
        { text: 'Навыки:', delay:50, class: 'command'},
        { text: '- Python3, Flask, Django, FastAPI', delay:50, class:'comment'},
        { text: '- Telegram Bot Api, Telegram Web Apps', delay:50, class:'comment'},
        { text: '- REST, NGINX, Gunicorn, Supervisor', delay:50, class:'comment'},
        { text: '- HTML5, CSS3, JavaScript, Websocket', delay:50, class:'comment'},
        { text: '- Docker, GIT, Ubuntu Server', delay:50, class:'comment'},
        { text: '- PostgreSQL, SQLite', delay:50, class:'comment'},
        { text: ' ', delay: 50 },
        { text: 'Мои пет-проекты:', delay: 50, class: 'success' },
        { text: '1. KrythNoteBot - Telegram бот с веб-приложением для заметок', delay: 50, class: 'info' },
        { text: 'Стек: Python, Flask, socketio, Nginx, Supervisor, Gunicorn, PostgreSQL', delay: 50, class: 'var' },
        { text: 'Ссылка: https://t.me/krythnotebot', delay: 50, class: 'link'},
        { text: ' ', delay: 50 },
        { text: '2. RedRockRobot - Telegram бот с мультиплеерной игрой в крестики-нолики', delay: 50, class: 'info' },
        { text: 'Стек: Python, Flask, socketio, Nginx, Supervisor, Gunicorn, PostgreSQL', delay: 50, class: 'var' },
        { text: 'Ссылка: https://t.me/redrockrobot', delay: 50, class: 'link'},
        { text: ' ', delay: 50 },
        { text: 'Связь со мной:', delay: 50, class: 'success' },
        { text: 'Telegram: @hqwskq', delay: 50, class: 'info' },
        { text: 'Email: kolosoek86@gmail.com', delay: 50, class: 'info' },
        { text: 'GitHub: https://github.com/xxanax', delay: 50, class: 'info' },
        { text: ' ', delay: 50 },
        { text: 'Спасибо за просмотр моего резюме!', delay: 50, class: 'success' }
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
                
                span.textContent = char;
                currentTypedText.appendChild(span);
                
                terminal.scrollTop = terminal.scrollHeight;
                currentChar++;
                setTimeout(typeWriter, command.delay);
            } else {
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