if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/projeto_financeiro_2/service_worker.js').then((registration) => {
            console.log('Service Worker registrado com sucesso: ', registration.scope);
        }, (err) => {
            console.log('Registro do Service Worker falhou: ', err);
        });
    });
}
