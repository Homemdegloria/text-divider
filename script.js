function splitText() {
    const text = document.getElementById('inputText').value;
    const charLimit = parseInt(document.getElementById('charLimit').value, 10);
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = '';

    if (!text || isNaN(charLimit) || charLimit <= 10) {
        alert('Insira um texto válido e um limite de caracteres maior que 10.');
        return;
    }

    let start = 0;
    let blockNumber = 1;

    while (start < text.length) {
        let end = start + charLimit;

        if (end < text.length) {
            // Ajusta para garantir que o bloco termine com uma frase completa
            let nextPeriod = text.lastIndexOf('.', end);
            let nextExclamation = text.lastIndexOf('!', end);
            let nextQuestion = text.lastIndexOf('?', end);

            // Encontrar o próximo delimitador de frase que não ultrapasse o limite
            let sentenceEnd = Math.max(
                nextPeriod !== -1 ? nextPeriod : -1,
                nextExclamation !== -1 ? nextExclamation : -1,
                nextQuestion !== -1 ? nextQuestion : -1
            );

            if (sentenceEnd >= start && sentenceEnd < end) {
                end = sentenceEnd + 1; // Inclui o delimitador no final do bloco
            } else {
                end = start + charLimit; // Se não houver delimitador, respeita o limite
            }
        }

        const blockText = text.slice(start, end).trim();
        start = end;

        // Cria o bloco de texto e botão de copiar
        const blockDiv = document.createElement('div');
        blockDiv.className = 'block';
        blockDiv.onclick = () => alert(`Bloco ${blockNumber}\n\n${blockText}`);

        const blockNumberDiv = document.createElement('div');
        blockNumberDiv.className = 'block-number';
        blockNumberDiv.innerText = `Bloco ${String(blockNumber).padStart(2, '0')}`;

        const blockContent = document.createElement('p');
        blockContent.className = 'block-content';
        blockContent.innerText = `${blockText.split(' ').slice(0, 5).join(' ')}... {${blockText.length} caracteres}`;

        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn';
        copyBtn.innerText = 'Copiar';
        copyBtn.onclick = (e) => {
            e.stopPropagation(); // Previne que o clique dispare o alert do bloco
            copyText(copyBtn, blockText);
        };

        blockDiv.appendChild(blockNumberDiv);
        blockDiv.appendChild(blockContent);
        blockDiv.appendChild(copyBtn);
        outputDiv.appendChild(blockDiv);

        blockNumber++;
    }
}

function copyText(button, text) {
    navigator.clipboard.writeText(text).then(() => {
        button.innerText = 'Copiado';
        button.disabled = true; // Desativa o botão após ser clicado
    }).catch(err => {
        console.error('Erro ao copiar o texto: ', err);
    });
}

function resetFields() {
    // Limpa os campos de entrada e a área de saída
    document.getElementById('inputText').value = '';
    document.getElementById('charLimit').value = '';
    document.getElementById('output').innerHTML = '';
}
