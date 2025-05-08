document.addEventListener('DOMContentLoaded', function() {
    const terminal = document.getElementById('terminal');
    const typingText = document.getElementById('typing-text');
    const output = document.getElementById('output');
    const cursor = document.querySelector('.cursor');
    
    const commands = [
        "cat resume.txt",
        "show_projects",
        "contact_info"
    ];
    
    let commandIndex = 0;
    let charIndex = 0;
    let isTyping = true;
    let typingTimeout;
    
    // Начальная задержка перед стартом печати
    setTimeout(startTyping, 1000);
    
    function startTyping() {
        if (commandIndex < commands.length) {
            if (charIndex < commands[commandIndex].length) {
                typingText.textContent += commands[commandIndex].charAt(charIndex);
                charIndex++;
                typingTimeout = setTimeout(startTyping, Math.random() * 100 + 50);
            } else {
                isTyping = false;
                executeCommand(commands[commandIndex]);
                commandIndex++;
                charIndex = 0;
                
                // Задержка перед следующей командой
                setTimeout(() => {
                    typingText.textContent = '';
                    isTyping = true;
                    startTyping();
                }, 2000);
            }
        } else {
            // Все команды выполнены, показываем статичный курсор
            cursor.style.animation = 'none';
            cursor.style.opacity = '1';
        }
    }
    
    function executeCommand(command) {
        let response = '';
        
        switch(command) {
            case "cat resume.txt":
                response = `
<span class="section-title">Резюме</span>

<span class="highlight">Имя:</span> Кирилл
<span class="highlight">Возраст:</span> 22
<span class="highlight">Опыт:</span> Более 3 лет коммерческой разработки

<span class="section-title">Карьерный путь:</span>
- Начинал с фриланс-разработки
- Работал с индивидуальными предпринимателями 
- Специализировался на создании Telegram ботов под ключ

<span class="section-title">Навыки:</span>
- Python (Flask, Django)
- Telegram Bot API, Telegram Web Apps
- PostgreSQL, SQLite3
- Nginx, Gunicorn, Supervisor
- Администрирование Linux серверов
`;
                break;
                
            case "show_projects":
                response = `
<span class="section-title">Пет-проекты:</span>

<div class="project">
    <div class="project-title">Telegram бот для заметок с веб-интерфейсом</div>
    <div class="project-stack">Стек: Python, Flask, Nginx, Supervisor, Gunicorn, PostgreSQL</div>
    <p>Telegram бот с веб-приложением для создания заметок. Возможности: форматирование текста, категории и поиск по заметкам.</p>
    <a href="https://t.me/krythnotebot" target="_blank" class="project-link">https://t.me/krythnotebot</a>
</div>

<div class="project">
    <div class="project-title">Telegram бот с мультиплеерной игрой в крестики-нолики</div>
    <div class="project-stack">Стек: Python, Flask, Nginx, Supervisor, Gunicorn, PostgreSQL</div>
    <p>Telegram бот, позволяющий играть в крестики-нолики с друзьями. Имеет веб-интерфейс для визуализации игры.</p>
    <a href="https://t.me/redrockrobot" target="_blank" class="project-link">https://t.me/redrockrobot</a>
</div>
`;
                break;
                
            case "contact_info":
                response = `
<span class="section-title">Контактная информация:</span>

<span class="highlight">Telegram:</span> @hqwskq
<span class="highlight">Email:</span> kolosoek86@gmail.com
<span class="highlight">GitHub:</span> github.com/xxanax

<span class="success">Открыт к новым возможностям!</span>
`;
                break;
                
            default:
                response = `<span class="error">Команда не найдена: ${command}</span>`;
        }
        
        const responseElement = document.createElement('div');
        responseElement.className = 'output';
        responseElement.innerHTML = response;
        output.appendChild(responseElement);
        
        // Прокрутка вниз
        terminal.scrollTop = terminal.scrollHeight;
    }
    
    // Эффект терминала при клике
    terminal.addEventListener('click', function() {
        if (!isTyping && commandIndex >= commands.length) {
            const newCommand = document.createElement('div');
            newCommand.className = 'command-line';
            newCommand.innerHTML = `
                <span class="prompt">$</span>
                <span class="command"></span>
                <span class="cursor">|</span>
            `;
            terminal.appendChild(newCommand);
            
            // Фокус на новой строке команды
            newCommand.scrollIntoView();
        }
    });
});