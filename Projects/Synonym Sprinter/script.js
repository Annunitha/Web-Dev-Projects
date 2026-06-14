 const POOLS = {
        easy: [
            { w: "Happy", s: "Joyful", d: ["Sad", "Angry", "Tired"] },
            { w: "Big", s: "Large", d: ["Small", "Tiny", "Short"] },
            { w: "Fast", s: "Quick", d: ["Slow", "Steady", "Heavy"] },
            { w: "Smart", s: "Clever", d: ["Dumb", "Slow", "Lazy"] }
        ],
        medium: [
            { w: "Beautiful", s: "Gorgeous", d: ["Ugly", "Plain", "Dirty"] },
            { w: "Brave", s: "Courageous", d: ["Fearful", "Afraid", "Weak"] },
            { w: "Strong", s: "Powerful", d: ["Fragile", "Soft", "Small"] },
            { w: "Calm", s: "Peaceful", d: ["Wild", "Loud", "Noisy"] }
        ],
        hard: [
            { w: "Abundant", s: "Plentiful", d: ["Scarce", "Rare", "Empty"] },
            { w: "Cautious", s: "Prudent", d: ["Reckless", "Bold", "Brave"] },
            { w: "Hostile", s: "Antagonistic", d: ["Friendly", "Kind", "Warm"] },
            { w: "Sincere", s: "Genuine", d: ["False", "Fake", "Mean"] }
        ]
    };

    let state = { score: 0, streak: 0, difficulty: 'easy', timeLeft: 100, timerId: null, current: null };

    function setDifficulty(d, btn) {
        state.difficulty = d;
        document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById('difficulty-label').innerText = d.charAt(0).toUpperCase() + d.slice(1);
    }

    function startGame() {
        state.score = 0; state.streak = 0;
        document.getElementById('screen-overlay').classList.add('hidden');
        updateUI();
        nextQuestion();
    }

    function nextQuestion() {
        state.timeLeft = 100;
        const pool = POOLS[state.difficulty];
        state.current = pool[Math.floor(Math.random() * pool.length)];
        document.getElementById('word').innerText = state.current.w;
        
        const opts = [state.current.s, ...state.current.d].sort(() => Math.random() - 0.5);
        const container = document.getElementById('options');
        container.innerHTML = '';
        opts.forEach(o => {
            const b = document.createElement('button');
            b.className = 'option-btn';
            b.innerText = o;
            b.onclick = () => check(o, b);
            container.appendChild(b);
        });
        document.getElementById('hint-btn').disabled = false;
        startTimer();
    }

    function startTimer() {
        clearInterval(state.timerId);
        const speed = state.difficulty === 'hard' ? 2 : state.difficulty === 'medium' ? 1.5 : 1;
        state.timerId = setInterval(() => {
            state.timeLeft -= speed;
            document.getElementById('timer').style.width = state.timeLeft + "%";
            if (state.timeLeft <= 0) end("Time's Up! ⏰");
        }, 100);
    }

    function check(val, btn) {
        clearInterval(state.timerId);
        if (val === state.current.s) {
            btn.classList.add('correct');
            state.score += 10 + Math.floor(state.timeLeft / 10);
            state.streak++;
            setTimeout(nextQuestion, 600);
        } else {
            btn.classList.add('wrong');
            end("Incorrect! 🥺");
        }
        updateUI();
    }

    function useHint() {
        if (state.score < 5) return alert("Not enough score! 🎀");
        state.score -= 5;
        const btns = Array.from(document.querySelectorAll('.option-btn'));
        const wrong = btns.filter(b => b.innerText !== state.current.s);
        wrong.slice(0, 2).forEach(b => b.disabled = true);
        document.getElementById('hint-btn').disabled = true;
        updateUI();
    }

    function updateUI() {
        document.getElementById('score').innerText = state.score;
        document.getElementById('streak').innerText = state.streak;
    }

    function end(msg) {
        clearInterval(state.timerId);
        document.getElementById('overlay-title').innerText = msg;
        document.getElementById('screen-overlay').classList.remove('hidden');
    }