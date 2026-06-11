 let entries = JSON.parse(localStorage.getItem('journal_entries')) || [];
    let selectedMood = '😊';
    let isLocked = true;

    function checkPasswordSet() {
        const pwd = localStorage.getItem('journal_password');
        if (!pwd) {
            document.getElementById('lockTitle').innerText = "Setup Privacy Lock";
            document.getElementById('lockDesc').innerText = "Create a password for your private journal";
            document.getElementById('unlockBtn').innerText = "Set Password";
        }
    }

    function handleUnlock() {
        const input = document.getElementById('passwordInput');
        const stored = localStorage.getItem('journal_password');
        
        if (!stored) {
            if (input.value.length < 4) return alert("Password must be at least 4 characters");
            localStorage.setItem('journal_password', input.value);
            unlock();
        } else if (input.value === stored) {
            unlock();
        } else {
            alert("Incorrect password!");
            input.value = '';
        }
    }

    function unlock() {
        document.getElementById('lockScreen').classList.add('hidden');
        document.getElementById('mainContent').classList.remove('hidden');
        isLocked = false;
        renderEntries();
    }

    function lockJournal() {
        location.reload();
    }

    function toggleTheme() {
        const current = document.body.getAttribute('data-theme');
        const target = current === 'light' ? 'dark' : 'light';
        document.body.setAttribute('data-theme', target);
        localStorage.setItem('journal_theme', target);
    }

    function selectMood(mood, btn) {
        selectedMood = mood;
        document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    }

    function saveEntry() {
        const title = document.getElementById('newTitle').value.trim();
        const content = document.getElementById('newContent').value.trim();

        if (!content) return alert("Please write something!");

        const entry = {
            id: Date.now(),
            title: title || "Untitled Entry",
            content: content,
            mood: selectedMood,
            date: new Date().toLocaleString()
        };

        entries.unshift(entry);
        localStorage.setItem('journal_entries', JSON.stringify(entries));
        document.getElementById('newTitle').value = '';
        document.getElementById('newContent').value = '';
        renderEntries();
    }

    function deleteEntry(id) {
        if (!confirm("Delete this memory?")) return;
        entries = entries.filter(e => e.id !== id);
        localStorage.setItem('journal_entries', JSON.stringify(entries));
        renderEntries();
    }

    function renderEntries() {
        const list = document.getElementById('entriesList');
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        list.innerHTML = '';

        const filtered = entries.filter(e => 
            e.title.toLowerCase().includes(searchTerm) || 
            e.content.toLowerCase().includes(searchTerm)
        );

        filtered.forEach(e => {
            const div = document.createElement('div');
            div.className = 'glass-card entry-card';
            div.innerHTML = `
                <div class="entry-header">
                    <span>${e.date}</span>
                    <span>${e.mood}</span>
                </div>
                <div class="entry-title">${e.title}</div>
                <div class="entry-body">${e.content}</div>
                <button onclick="deleteEntry(${e.id})" 
                        style="position: absolute; top: 1.5rem; right: 1.5rem; background: none; color: var(--text-muted); font-size: 0.8rem; padding: 4px;">
                    Delete
                </button>
            `;
            list.appendChild(div);
        });
    }

    checkPasswordSet();
    const savedTheme = localStorage.getItem('journal_theme') || 'dark';
    document.body.setAttribute('data-theme', savedTheme);
    document.querySelector('.mood-btn').classList.add('active');
    document.getElementById('passwordInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleUnlock();
    });