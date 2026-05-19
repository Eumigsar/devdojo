/* DevDojo MVP
   - Login local (nome) + progresso em localStorage
   - Exercícios por linguagem e nível (mini-jogos)

   Fix: adiciona guards e um overlay de erro para evitar “tela travada”
   caso algum elemento não exista/esteja diferente no deploy.
*/

const STORAGE_KEY = 'devdojo:v1';

const DB = {
	languages: [
		{
			id: 'js',
			name: 'JavaScript',
			description: 'Fundamentos e lógica para web',
			levels: [
				{ id: 'easy', name: 'Iniciante' },
				{ id: 'mid', name: 'Intermediário' },
				{ id: 'hard', name: 'Avançado' }
			]
		},
		{
			id: 'py',
			name: 'Python',
			description: 'Do básico ao pensamento de automação',
			levels: [
				{ id: 'easy', name: 'Iniciante' },
				{ id: 'mid', name: 'Intermediário' },
				{ id: 'hard', name: 'Avançado' }
			]
		},
		{
			id: 'htmlcss',
			name: 'HTML/CSS',
			description: 'Estrutura, layout e responsividade',
			levels: [
				{ id: 'easy', name: 'Iniciante' },
				{ id: 'mid', name: 'Intermediário' },
				{ id: 'hard', name: 'Avançado' }
			]
		},
		{
			id: 'sql',
			name: 'SQL',
			description: 'Consultas e pensamento relacional',
			levels: [
				{ id: 'easy', name: 'Iniciante' },
				{ id: 'mid', name: 'Intermediário' },
				{ id: 'hard', name: 'Avançado' }
			]
		}
	],

	exercises: [
		// JS
		{
			id: 'js-e1',
			lang: 'js',
			level: 'easy',
			type: 'mcq',
			title: 'Tipos',
			prompt: 'Qual opção é um valor booleano em JavaScript?',
			choices: ['"true"', 'true', '1', 'null'],
			answerIndex: 1,
			explain: 'Booleano é true/false sem aspas.'
		},
		{
			id: 'js-e2',
			lang: 'js',
			level: 'easy',
			type: 'fill',
			title: 'Template string',
			prompt: 'Complete para imprimir: Olá, Amanda!',
			starter: 'const nome = "Amanda";\nconsole.log(`Olá, ${___}!`);',
			solution: 'nome',
			explain: 'Dentro de ${...} você coloca a variável nome.'
		},
		{
			id: 'js-m1',
			lang: 'js',
			level: 'mid',
			type: 'mcq',
			title: 'Array.map',
			prompt: 'Qual método transforma cada item e retorna um novo array?',
			choices: ['forEach', 'map', 'filter', 'find'],
			answerIndex: 1,
			explain: 'map cria um novo array com a mesma quantidade de itens.'
		},
		{
			id: 'js-h1',
			lang: 'js',
			level: 'hard',
			type: 'mcq',
			title: 'Event loop',
			prompt: 'Qual opção descreve melhor uma microtask?',
			choices: ['Executa depois de setTimeout', 'Executa antes do próximo render/timeout (ex.: Promise.then)', 'É uma thread separada', 'Só existe no Node.js'],
			answerIndex: 1,
			explain: 'Promises (then/catch/finally) entram na fila de microtasks.'
		},

		// Python
		{
			id: 'py-e1',
			lang: 'py',
			level: 'easy',
			type: 'mcq',
			title: 'Listas',
			prompt: 'Qual é a sintaxe para criar uma lista vazia?',
			choices: ['{}', '[]', '()', '<>'],
			answerIndex: 1,
			explain: '[] cria uma lista vazia.'
		},
		{
			id: 'py-e2',
			lang: 'py',
			level: 'easy',
			type: 'fill',
			title: 'f-string',
			prompt: 'Complete para imprimir: Olá, Aymara!',
			starter: 'nome = "Aymara"\nprint(f"Olá, {___}!")',
			solution: 'nome',
			explain: 'Dentro de { } vai a variável nome.'
		},
		{
			id: 'py-m1',
			lang: 'py',
			level: 'mid',
			type: 'mcq',
			title: 'Compreensão de lista',
			prompt: 'Qual compreensão gera [0,1,4,9]?',
			choices: ['[x*x for x in range(4)]', '[x**2 for x in range(4)]', '[x^2 for x in range(4)]', '[pow(x,2) for x in range(3)]'],
			answerIndex: 1,
			explain: '** é potência em Python.'
		},
		{
			id: 'py-h1',
			lang: 'py',
			level: 'hard',
			type: 'mcq',
			title: 'GIL',
			prompt: 'O GIL impacta principalmente…',
			choices: ['I/O bound', 'CPU bound em threads', 'Processos', 'Asyncio'],
			answerIndex: 1,
			explain: 'Threads em Python sofrem em tarefas CPU bound; multiprocess ajuda.'
		},

		// HTML/CSS
		{
			id: 'hc-e1',
			lang: 'htmlcss',
			level: 'easy',
			type: 'mcq',
			title: 'Semântica',
			prompt: 'Qual tag representa o conteúdo principal da página?',
			choices: ['<div>', '<main>', '<section>', '<aside>'],
			answerIndex: 1,
			explain: '<main> define o conteúdo principal.'
		},
		{
			id: 'hc-m1',
			lang: 'htmlcss',
			level: 'mid',
			type: 'mcq',
			title: 'Flexbox',
			prompt: 'Qual propriedade alinha itens no eixo principal?',
			choices: ['align-items', 'justify-content', 'flex-wrap', 'gap'],
			answerIndex: 1,
			explain: 'justify-content controla alinhamento no eixo principal.'
		},
		{
			id: 'hc-h1',
			lang: 'htmlcss',
			level: 'hard',
			type: 'mcq',
			title: 'Stacking context',
			prompt: 'Qual propriedade pode criar um stacking context?',
			choices: ['opacity < 1', 'margin', 'display: block', 'padding'],
			answerIndex: 0,
			explain: 'opacity < 1 cria stacking context (entre outras propriedades).'
		},

		// SQL
		{
			id: 'sql-e1',
			lang: 'sql',
			level: 'easy',
			type: 'mcq',
			title: 'SELECT',
			prompt: 'Qual consulta retorna todas as colunas da tabela users?',
			choices: ['SELECT users;', 'SELECT * FROM users;', 'GET * users;', 'FROM users SELECT *;'],
			answerIndex: 1,
			explain: 'SELECT * FROM <tabela>;'
		},
		{
			id: 'sql-m1',
			lang: 'sql',
			level: 'mid',
			type: 'mcq',
			title: 'JOIN',
			prompt: 'Qual JOIN retorna linhas mesmo sem correspondência na tabela da direita?',
			choices: ['INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'CROSS JOIN'],
			answerIndex: 1,
			explain: 'LEFT JOIN mantém todas as linhas da esquerda.'
		},
		{
			id: 'sql-h1',
			lang: 'sql',
			level: 'hard',
			type: 'mcq',
			title: 'Window function',
			prompt: 'Qual função calcula ranking por grupo sem colapsar as linhas?',
			choices: ['GROUP BY', 'ROW_NUMBER() OVER (...)', 'COUNT(*)', 'SUM()'],
			answerIndex: 1,
			explain: 'Window functions mantêm as linhas e adicionam colunas calculadas.'
		}
	]
};

function showFatalError(err) {
	console.error(err);
	const pre = document.createElement('pre');
	pre.style.position = 'fixed';
	pre.style.inset = '16px';
	pre.style.padding = '14px';
	pre.style.margin = '0';
	pre.style.borderRadius = '14px';
	pre.style.background = 'rgba(0,0,0,0.85)';
	pre.style.border = '1px solid rgba(255,255,255,0.18)';
	pre.style.color = 'white';
	pre.style.zIndex = '9999';
	pre.style.overflow = 'auto';
	pre.textContent = `DevDojo encontrou um erro ao iniciar.\n\n${err?.stack || err}`;
	document.body.appendChild(pre);
}

function loadState() {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return null;
		return JSON.parse(raw);
	} catch {
		return null;
	}
}

function saveState(state) {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function todayKey() {
	const d = new Date();
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function computeStreak(lastActiveDays) {
	const set = new Set(lastActiveDays);
	let streak = 0;
	let d = new Date();
	while (true) {
		const k = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
		if (!set.has(k)) break;
		streak++;
		d.setDate(d.getDate() - 1);
	}
	return streak;
}

function el(id) {
	return document.getElementById(id);
}

function mustEl(id) {
	const e = el(id);
	if (!e) throw new Error(`Elemento não encontrado: #${id}`);
	return e;
}

function setRoute(route) {
	for (const r of document.querySelectorAll('.route')) r.hidden = true;
	const target = el(`route_${route}`);
	if (target) target.hidden = false;

	for (const btn of document.querySelectorAll('.navItem')) {
		btn.classList.toggle('active', btn.dataset.route === route);
	}
}

function renderLanguages(state) {
	const grid = mustEl('languageGrid');
	grid.innerHTML = '';

	for (const lang of DB.languages) {
		const card = document.createElement('div');
		card.className = 'card';
		card.innerHTML = `
			<h3>${lang.name}</h3>
			<p class="muted">${lang.description}</p>
			<div class="pillRow">
				${lang.levels.map((l) => `<span class="pill">${l.name}</span>`).join('')}
			</div>
			<div style="height: 10px"></div>
			<button class="btn primary" data-lang="${lang.id}">Abrir exercícios</button>
		`;
		card.querySelector('button').addEventListener('click', () => openLanguage(lang.id, state));
		grid.appendChild(card);
	}
}

function progressStats(state) {
	const completedIds = new Set(Object.keys(state.progress.completed || {}));
	let correct = 0;
	let completed = 0;
	for (const id of completedIds) {
		completed++;
		if (state.progress.completed[id]?.correct) correct++;
	}
	return { correct, completed };
}

function renderSidebarKPIs(state) {
	const { correct, completed } = progressStats(state);
	mustEl('kpiCorrect').textContent = String(correct);
	mustEl('kpiCompleted').textContent = String(completed);
	mustEl('kpiStreak').textContent = String(computeStreak(state.progress.activeDays || []));
}

function renderProgress(state) {
	mustEl('progressUser').textContent = state.user.name;
	const list = mustEl('progressList');
	list.innerHTML = '';

	const completed = state.progress.completed || {};
	const completedIds = new Set(Object.keys(completed));

	for (const lang of DB.languages) {
		const container = document.createElement('div');
		container.className = 'listItem';
		const total = DB.exercises.filter((e) => e.lang === lang.id).length;
		const done = DB.exercises.filter((e) => e.lang === lang.id && completedIds.has(e.id)).length;
		container.innerHTML = `
			<div>
				<div class="strong">${lang.name}</div>
				<div class="muted">${done}/${total} concluídos</div>
			</div>
			<span class="badgeMini">${Math.round((done / Math.max(total, 1)) * 100)}%</span>
		`;
		list.appendChild(container);
	}
}

function openLanguage(langId, state) {
	const lang = DB.languages.find((l) => l.id === langId);
	if (!lang) return;

	const modal = mustEl('modal');
	const body = mustEl('modalBody');
	mustEl('modalTitle').textContent = `Exercícios — ${lang.name}`;
	mustEl('modalSubtitle').textContent = 'Escolha um nível e jogue.';

	body.innerHTML = '';

	for (const level of lang.levels) {
		const section = document.createElement('div');
		section.className = 'card';
		section.style.marginBottom = '12px';

		const exList = DB.exercises.filter((e) => e.lang === langId && e.level === level.id);
		section.innerHTML = `
			<div class="row" style="display:flex; justify-content:space-between; align-items:center; gap:12px;">
				<div>
					<div class="strong">${level.name}</div>
					<div class="muted">${exList.length} exercício(s)</div>
				</div>
				<button class="btn secondary">Abrir</button>
			</div>
		`;
		section.querySelector('button').addEventListener('click', () => openExercisePicker(langId, level.id, state));
		body.appendChild(section);
	}

	modal.hidden = false;
}

function openExercisePicker(langId, levelId, state) {
	const lang = DB.languages.find((l) => l.id === langId);
	const levelName = lang?.levels.find((l) => l.id === levelId)?.name || levelId;

	mustEl('modalTitle').textContent = `${lang?.name || langId} — ${levelName}`;
	mustEl('modalSubtitle').textContent = 'Escolha um exercício.';

	const body = mustEl('modalBody');
	body.innerHTML = '';

	const completed = state.progress.completed || {};
	const exList = DB.exercises.filter((e) => e.lang === langId && e.level === levelId);

	for (const ex of exList) {
		const isDone = Boolean(completed[ex.id]);
		const item = document.createElement('div');
		item.className = 'listItem';
		item.innerHTML = `
			<div>
				<div class="strong">${ex.title}</div>
				<div class="muted">${ex.type === 'mcq' ? 'Múltipla escolha' : 'Complete'} • ${isDone ? 'Concluído' : 'Novo'}</div>
			</div>
			<button class="btn ${isDone ? 'ghost' : 'primary'}">${isDone ? 'Rever' : 'Jogar'}</button>
		`;
		item.querySelector('button').addEventListener('click', () => playExercise(ex.id, state));
		body.appendChild(item);
	}
}

function playExercise(exId, state) {
	const ex = DB.exercises.find((e) => e.id === exId);
	if (!ex) return;

	const body = mustEl('modalBody');
	mustEl('modalTitle').textContent = ex.title;
	mustEl('modalSubtitle').textContent = 'Resolva para marcar como concluído.';
	body.innerHTML = '';

	const wrap = document.createElement('div');
	wrap.className = 'exercise';
	wrap.innerHTML = `
		<div class="exercisePrompt">
			<div class="strong">Desafio</div>
			<div>${ex.prompt}</div>
		</div>
	`;

	if (ex.type === 'mcq') {
		const grid = document.createElement('div');
		grid.className = 'choiceGrid';
		ex.choices.forEach((c, idx) => {
			const btn = document.createElement('button');
			btn.className = 'choice';
			btn.textContent = c;
			btn.addEventListener('click', () => {
				const ok = idx === ex.answerIndex;
				onSolved(ex, ok, state);
			});
			grid.appendChild(btn);
		});
		wrap.appendChild(grid);
	}

	if (ex.type === 'fill') {
		const starter = document.createElement('pre');
		starter.style.margin = '0';
		starter.style.padding = '12px';
		starter.style.borderRadius = '14px';
		starter.style.border = '1px solid rgba(255,255,255,0.12)';
		starter.style.background = 'rgba(0,0,0,0.16)';
		starter.innerHTML = `<code>${escapeHtml(ex.starter)}</code>`;
		wrap.appendChild(starter);

		const input = document.createElement('input');
		input.placeholder = 'Digite o que vai no ___ (ex.: nome)';
		wrap.appendChild(input);

		const btn = document.createElement('button');
		btn.className = 'btn primary';
		btn.textContent = 'Verificar';
		btn.addEventListener('click', () => {
			const user = (input.value || '').trim();
			const ok = user === ex.solution;
			onSolved(ex, ok, state, user);
		});
		wrap.appendChild(btn);
	}

	const hint = document.createElement('div');
	hint.className = 'muted';
	hint.innerHTML = `Dica: ${escapeHtml(ex.explain)}`;
	wrap.appendChild(hint);

	body.appendChild(wrap);
}

function onSolved(ex, ok, state, userAnswer) {
	state.progress.activeDays = state.progress.activeDays || [];
	const t = todayKey();
	if (!state.progress.activeDays.includes(t)) state.progress.activeDays.push(t);

	state.progress.completed = state.progress.completed || {};
	state.progress.completed[ex.id] = {
		correct: ok,
		at: new Date().toISOString(),
		userAnswer: userAnswer
	};
	saveState(state);

	renderSidebarKPIs(state);
	renderProgress(state);

	const box = document.createElement('div');
	box.className = ok ? 'resultOk' : 'resultBad';
	box.innerHTML = ok
		? `<div class="strong">✅ Acertou!</div><div class="muted">Progresso salvo.</div>`
		: `<div class="strong">🟨 Quase!</div><div class="muted">Salvei mesmo assim (para revisão). Tente de novo depois.</div>`;

	mustEl('modalBody').appendChild(box);
}

function escapeHtml(s) {
	return String(s)
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&#039;');
}

function init() {
	let state = loadState();

	const userChip = mustEl('userChip');
	const userName = mustEl('userName');
	const logoutBtn = mustEl('logoutBtn');

	function setLoggedInUI() {
		mustEl('authView').hidden = true;
		mustEl('appView').hidden = false;
		userChip.hidden = false;
		logoutBtn.hidden = false;
		userName.textContent = state.user.name;
		mustEl('progressUser').textContent = state.user.name;
		renderLanguages(state);
		renderProgress(state);
		renderSidebarKPIs(state);
		setRoute('home');
	}

	function setLoggedOutUI() {
		mustEl('authView').hidden = false;
		mustEl('appView').hidden = true;
		userChip.hidden = true;
		logoutBtn.hidden = true;
	}

	// Modal
	mustEl('modalClose').addEventListener('click', () => (mustEl('modal').hidden = true));
	mustEl('modal').addEventListener('click', (e) => {
		if (e.target === mustEl('modal')) mustEl('modal').hidden = true;
	});

	// Nav
	for (const btn of document.querySelectorAll('.navItem')) {
		btn.addEventListener('click', () => setRoute(btn.dataset.route));
	}

	for (const btn of document.querySelectorAll('[data-goto]')) {
		btn.addEventListener('click', () => setRoute(btn.dataset.goto));
	}

	// Auth
	mustEl('loginForm').addEventListener('submit', (e) => {
		e.preventDefault();
		const name = (mustEl('nameInput').value || '').trim();
		if (!name) return;
		state = {
			user: { name },
			progress: { completed: {}, activeDays: [] }
		};
		saveState(state);
		setLoggedInUI();
	});

	logoutBtn.addEventListener('click', () => {
		state = loadState();
		setLoggedOutUI();
	});

	mustEl('resetProgress').addEventListener('click', () => {
		if (!state) return;
		state.progress = { completed: {}, activeDays: [] };
		saveState(state);
		renderProgress(state);
		renderSidebarKPIs(state);
	});

	if (state?.user?.name) setLoggedInUI();
	else setLoggedOutUI();
}

window.addEventListener('error', (e) => {
	showFatalError(e.error || e.message);
});

window.addEventListener('unhandledrejection', (e) => {
	showFatalError(e.reason);
});

// garante que o DOM existe antes de inicializar
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', () => {
		try {
			init();
		} catch (err) {
			showFatalError(err);
		}
	});
} else {
	try {
		init();
	} catch (err) {
		showFatalError(err);
	}
}
