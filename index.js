document.addEventListener('DOMContentLoaded', function() {
    const terminal = document.getElementById('terminal');
    const cursor = document.querySelector('.cursor');
    
    // Анимация курсора
    setInterval(() => {
        cursor.style.visibility = (cursor.style.visibility === 'hidden' ? 'visible' : 'hidden');
    }, 500);

    // Обработчик клика для добавления новой строки
    terminal.addEventListener('click', function() {
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
    });
});