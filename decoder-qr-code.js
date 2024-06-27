const data = {};
const dict = {
    '00': 'Payload Format Indicator',
    '01': 'Point Of Initiation Method',
    '26': 'Merchant Account Information - Pix',
    '52': 'Merchant Category Code',
    '53': 'Transaction Currency',
    '54': 'Transaction Amount',
    '58': 'Country Code',
    '59': 'Merchant Name',
    '60': 'Merchant City',
    '61': 'Postal Code',
    '62': 'Additional Data Field Template',
    '63': 'CRC'
};
function decoder(codigo_qr){
    if(typeof(codigo_qr) !== 'string'){
        throw new Error(`string only. Passing ${typeof(codigo_qr)}`);
    }else if (codigo_qr !== ""){
        const codigo = codigo_qr;
        let pacote = codigo.slice(0,4);
        const id = pacote.slice(0,2);
        const data_lenght = parseInt(pacote.slice(2,4), 10);
        const dado = codigo.slice(pacote.length, pacote.length+data_lenght);
        pacote += dado;
        if (!data[dict[id]]){
            data[dict[id]] = dado;
        }
        const resto = codigo.slice(pacote.length);
        decoder(resto)
    };
};

document.getElementById('valor').textContent = `Valor: ${data['Transaction Amount']}`;
