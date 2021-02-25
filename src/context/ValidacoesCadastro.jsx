import React from 'react';

const ValidacoesCadastro = React.createContext({
    login: semValidacao,
    senha: semValidacao
});

function semValidacao(dado){
    console.log(dado);
    return {valido: true, texto: ""};
}

export default ValidacoesCadastro;