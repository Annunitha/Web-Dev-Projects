 const PATTERNS = [
            { s: [2, 4, 6, 8], a: 10, o: [10, 12, 9, 11], r: "Arithmetic: +2 each step." },
            { s: [5, 10, 20, 40], a: 80, o: [60, 80, 50, 100], r: "Geometric: ×2 each step." },
            { s: [1, 4, 9, 16], a: 25, o: [20, 25, 30, 21], r: "Squares: 1², 2², 3², 4², 5²." },
            { s: [1, 1, 2, 3, 5], a: 8, o: [7, 8, 9, 10], r: "Fibonacci: Sum of two previous numbers." },
            { s: [100, 90, 81, 73], a: 66, o: [65, 66, 64, 63], r: "Decreasing difference: -10, -9, -8, -7." },
            { s: [2, 6, 12, 20], a: 30, o: [28, 30, 32, 26], r: "Pattern: n * (n + 1)." },
            { s: [3, 9, 27, 81], a: 243, o: [162, 243, 324, 253], r: "Powers of 3: 3¹, 3², 3³, 3⁴, 3⁵." },
            { s: [1, 2, 6, 24], a: 120, o: [48, 120, 96, 72], r: "Factorials: 1!, 2!, 3!, 4!, 5!." }
        ];

        let state = { level: 0, score: 0 };

        function initGame() {
            state.level = 0; state.score = 0;
            document.getElementById('game-overlay').classList.add('hidden');
            loadLevel();
        }

        function loadLevel() {
            if (state.level >= PATTERNS.length) return endGame();
            const current = PATTERNS[state.level];
            document.getElementById('level-num').innerText = state.level + 1;
            document.getElementById('score-num').innerText = state.score;
            document.getElementById('rule-explain').innerText = "";

            const seqBox = document.getElementById('seq-box');
            seqBox.innerHTML = current.s.map(n => `<div class="num-tile animate-pop">${n}</div>`).join('') + `<div class="num-tile next animate-pop">?</div>`;

            const optBox = document.getElementById('opt-box');
            optBox.innerHTML = '';
            current.o.forEach(val => {
                const btn = document.createElement('button');
                btn.className = 'opt-btn animate-pop';
                btn.innerText = val;
                btn.onclick = () => checkAnswer(val, btn);
                optBox.appendChild(btn);
            });
        }

        function checkAnswer(guess, btn) {
            const current = PATTERNS[state.level];
            const isCorrect = guess === current.a;
            document.querySelectorAll('.opt-btn').forEach(b => b.disabled = true);
            document.getElementById('rule-explain').innerText = current.r;

            if (isCorrect) { btn.classList.add('correct'); state.score += 100; }
            else { btn.classList.add('wrong'); Array.from(document.querySelectorAll('.opt-btn')).find(b => parseInt(b.innerText) === current.a).classList.add('correct'); }

            setTimeout(() => { state.level++; loadLevel(); }, 3000);
        }

        function endGame() {
            const overlay = document.getElementById('game-overlay');
            overlay.classList.remove('hidden');
            document.getElementById('overlay-title').innerText = "Pattern Master!";
            document.getElementById('overlay-desc').innerText = `Final Score: ${state.score}`;
        }