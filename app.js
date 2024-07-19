if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/projeto_financeiro_2/service_worker.js').then((registration) => {
            console.log('Service Worker registrado com sucesso: ', registration.scope);
        }, (err) => {
            console.log('Registro do Service Worker falhou: ', err);
        });
    });
}


function agendarNotificacaoDiaria() {
    // Define o horário desejado para a notificação (21:00 no fuso horário local)
    const horarioDesejado = { hour: 20, minute: 0, second: 0 };

    // Função para calcular o tempo até o próximo horário desejado
    function calcularTempoAteProximoHorarioDesejado() {
        const agora = new Date();
        let horarioNotificacao = new Date();
        horarioNotificacao.setHours(horarioDesejado.hour);
        horarioNotificacao.setMinutes(horarioDesejado.minute);
        horarioNotificacao.setSeconds(horarioDesejado.second);
        horarioNotificacao.setMilliseconds(0);

        // Se o horário já passou hoje, agendar para amanhã
        if (agora > horarioNotificacao) {
            horarioNotificacao.setDate(horarioNotificacao.getDate() + 1);
        }

        // Calcula o tempo em milissegundos até o próximo horário desejado
        const tempoAteProximoHorario = horarioNotificacao.getTime() - agora.getTime();
        return tempoAteProximoHorario;
    }

    // Função para mostrar a notificação
    function mostrarNotificacao() {
        const options = {
            body: 'Venha ver suas finanças!',
            icon: 'imagens/logo.png'
        };
        if ('Notification' in window && Notification.permission === 'granted') {
            navigator.serviceWorker.ready.then(function(registration) {
                registration.showNotification('Notificação Diária', options);
            });
        }
    }

    // Agendar a notificação para o próximo horário desejado
    function agendarNotificacao() {
        const tempoAteProximoHorario = calcularTempoAteProximoHorarioDesejado();
        setTimeout(function() {
            mostrarNotificacao();
            agendarNotificacao(); // Agendar novamente para o próximo dia
        }, tempoAteProximoHorario);
    }

	
	// Verifica se já solicitou permissão antes
	const permissaoNotificacoes = localStorage.getItem('permissaoNotificacoes');
	if (permissaoNotificacoes === 'granted') {
		agendarNotificacao();
	} else {
		Notification.requestPermission().then(function(permission) {
			if (permission === 'granted') {
				localStorage.setItem('permissaoNotificacoes', 'granted');
				agendarNotificacao();
			}
		});
	}
}

// Chamar a função para agendar a notificação diária
agendarNotificacaoDiaria();
