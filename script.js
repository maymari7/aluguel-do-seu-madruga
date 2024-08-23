document.getElementById('botaoPrever').addEventListener('click', prever);

let dadosAlugueis = [];

document.getElementById('arquivoInput').addEventListener('change', function(event) {
    const arquivo = event.target.files[0];
    Papa.parse(arquivo, {
        header: true,
        dynamicTyping: true,
        complete: function(results) {
            dadosAlugueis = results.data;
            console.log('Dados carregados:', dadosAlugueis); 
        }
    });
});

function prever() {
    const diaSemana = document.getElementById('diaSemana').value;
    const clima = document.getElementById('clima').value;

    console.log('Dia da Semana Selecionado:', diaSemana); 
    console.log('Clima Selecionado:', clima); 

    const dadosFiltrados = dadosAlugueis.filter(item => item.DiaSemana === diaSemana && item.Clima === clima);

    console.log('Dados Filtrados:', dadosFiltrados); 

    if (dadosFiltrados.length === 0) {
        document.getElementById('resultado').textContent = 'Sem dados suficientes para previsão';
        return;
    }

    const totalAlugueis = dadosFiltrados.reduce((sum, item) => sum + item.Alugueis, 0);
    const mediaAlugueis = totalAlugueis / dadosFiltrados.length;

    document.getElementById('resultado').textContent = `Previsão de aluguéis: ${Math.round(mediaAlugueis)}`;
}
