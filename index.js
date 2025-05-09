document.addEventListener('DOMContentLoaded', () => {
    const terminal = document.getElementById('terminal');
    let typedText = document.querySelector('.typed-text');
    let cursor = document.querySelector('.cursor');
    
    const commands = [
        { text: 'print("Привет, я Кирилл!")', delay: 100, class: 'command' },
        { text: 'Возраст: 22 года', delay: 50, class: 'info' },
        { text: 'Опыт коммерческой разработки: более 3 лет', delay: 50, class: 'info' },
        { text: 'Начинал с фриланса, затем работал в ИП', delay: 50, class: 'info' },
        { text: 'Специализация: разработка Telegram ботов под ключ', delay: 50, class: 'info' },
        { text: 'Выполнял задачи по разработке, деплою, обновлению и поддержке клиентских чат-ботов', delay: 50, class: 'info' },
        { text: ' ', delay: 50 },
        { text: 'Мои пет-проекты:', delay: 50, class: 'success' },
        { text: '1. KrythNoteBot - Telegram бот с веб-приложением для заметок', delay: 50, class: 'info' },
        { text: 'Стек: Python, Flask, Nginx, Supervisor, Gunicorn, PostgreSQL', delay: 50, class: 'var' },
        { text: 'Ссылка: https://t.me/krythnotebot', delay: 50, class: 'link', action: () => window.open('https://t.me/krythnotebot', '_blank') },
        { text: ' ', delay: 50 },
        { text: '2. RedRockRobot - Telegram бот с мультиплеерной игрой в крестики-нолики', delay: 50, class: 'info' },
        { text: 'Стек: Python, Flask, Nginx, Supervisor, Gunicorn, PostgreSQL', delay: 50, class: 'var' },
        { text: 'Ссылка: https://t.me/redrockrobot', delay: 50, class: 'link', action: () => window.open('https://t.me/redrockrobot', '_blank') },
        { text: ' ', delay: 50 },
        { text: 'Связь со мной:', delay: 50, class: 'success' },
        { text: 'Telegram: @hqwskq', delay: 50, class: 'info' },
        { text: 'Email: kolosoek86@gmail.com', delay: 50, class: 'info' },
        { text: 'GitHub: https://github.com/xxanax', delay: 50, class: 'info'},
        { text: ' ', delay: 50 },
        { text: 'Резюме готово к просмотру!', delay: 50, class: 'success' },
        { text: 'Введите "help" для списка команд...', delay: 50, class: 'comment' }
    ];

    let currentCommand = 0;
    let currentChar = 0;
    let isTyping = true;

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
                typedText.appendChild(span);
                
                // Прокрутка терминала вниз
                terminal.scrollTop = terminal.scrollHeight;
                
                currentChar++;
                setTimeout(typeWriter, command.delay);
            } else {
                // Переход к следующей команде
                currentCommand++;
                currentChar = 0;
                
                if (command.action) {
                    command.action();
                }
                
                // Добавляем новую строку
                if (currentCommand < commands.length) {
                    const newLine = document.createElement('div');
                    newLine.className = 'terminal-line';
                    newLine.innerHTML = '$ <span class="typed-text"></span><span class="cursor">|</span>';
                    terminal.appendChild(newLine);
                    typedText = newLine.querySelector('.typed-text');
                    cursor = newLine.querySelector('.cursor');
                }
                
                setTimeout(typeWriter, 100);
            }
        } else {
            isTyping = false;
            // После завершения анимации добавляем обработчик ввода
            setupInput();
        }
    }

    function setupInput() {
        const inputLine = document.createElement('div');
        inputLine.className = 'terminal-line';
        inputLine.innerHTML = '$ <input type="text" class="terminal-input" autofocus><span class="cursor">|</span>';
        terminal.appendChild(inputLine);
        
        const input = document.querySelector('.terminal-input');
        input.focus();
        
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const command = input.value.trim();
                input.remove();
                
                // Выводим введенную команду
                const commandLine = document.createElement('div');
                commandLine.className = 'terminal-line';
                commandLine.textContent = '$ ' + command;
                terminal.appendChild(commandLine);
                
                // Обработка команд
                processCommand(command);
                
                // Новая строка для ввода
                const newInputLine = document.createElement('div');
                newInputLine.className = 'terminal-line';
                newInputLine.innerHTML = '$ <input type="text" class="terminal-input" autofocus><span class="cursor">|</span>';
                terminal.appendChild(newInputLine);
                
                const newInput = document.querySelector('.terminal-input');
                newInput.focus();
                terminal.scrollTop = terminal.scrollHeight;
            }
        });
    }

    function processCommand(command) {
        const output = document.createElement('div');
        
        switch(command.toLowerCase()) {
            case 'help':
                output.innerHTML = `
                    <span class="success">Доступные команды:</span><br>
                    <span class="info">help</span> - показать это сообщение<br>
                    <span class="info">clear</span> - очистить терминал<br>
                    <span class="info">projects</span> - показать мои проекты<br>
                    <span class="info">about</span> - информация обо мне<br>
                    <span class="info">contact</span> - контактная информация<br>
                `;
                break;
            case 'clear':
                terminal.innerHTML = '';
                return;
            case 'projects':
                output.innerHTML = `
                    <span class="success">Мои проекты:</span><br>
                    <span class="info">1. KrythNoteBot</span> - Telegram бот с веб-приложением для заметок<br>
                    <span class="var">Стек:</span> Python, Flask, Nginx, Supervisor, Gunicorn, PostgreSQL<br>
                    <span class="link" onclick="window.open('https://t.me/krythnotebot', '_blank')">https://t.me/krythnotebot</span><br><br>
                    
                    <span class="info">2. RedRockRobot</span> - Telegram бот с мультиплеерной игрой в крестики-нолики<br>
                    <span class="var">Стек:</span> Python, Flask, Nginx, Supervisor, Gunicorn, PostgreSQL<br>
                    <span class="link" onclick="window.open('https://t.me/redrockrobot', '_blank')">https://t.me/redrockrobot</span>
                `;
                break;
            case 'about':
                output.innerHTML = `
                    <span class="success">Обо мне:</span><br>
                    <span class="info">Имя:</span> Кирилл<br>
                    <span class="info">Возраст:</span> 22 года<br>
                    <span class="info">Опыт:</span> Более 3 лет коммерческой разработки<br>
                    <span class="info">Специализация:</span> Разработка Telegram ботов под ключ<br>
                    <span class="info">Навыки:</span> Разработка, деплой, обновление и поддержка чат-ботов
                `;
                break;
            case 'contact':
                output.innerHTML = `
                    <span class="success">Контактная информация:</span><br>
                    <span class="info">Telegram:</span> @your_telegram (замените на реальный)<br>
                    <span class="info">Email:</span> your.email@example.com (замените на реальный)
                `;
                break;
            default:
                output.innerHTML = `<span class="error">Команда "${command}" не найдена. Введите "help" для списка команд.</span>`;
        }
        
        terminal.appendChild(output);
        terminal.scrollTop = terminal.scrollHeight;
    }

    // Начинаем анимацию печати
    typeWriter();
});