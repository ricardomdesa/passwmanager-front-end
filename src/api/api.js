import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*'
    },
    timeout: 3000,
    auth: {
        username: 'admin',
        password: process.env.API_KEY
    }
});

export const getUsersByLogin = async(dados, setDado) => {
    const resp = await api
    .get("/users/" + dados.login)
    .catch((err) => console.log("Api error: ", err));
    if(resp && resp.data) {
      if (dados.senha == resp.data.senha) {
        setDado(resp.data.id);
        return true //sucesso
      }else{
        console.log('falha no login')
        return false //error
      }
    }
  }

  export const addUserApi = async (login, senha) => {
      let resp = await api.post('/users', {
          login: login,
          senha: senha
      })
          .catch((err) => console.log("Api post error: ", err));
      if (resp && resp.data) {
          console.log('api post return', resp.data)
      }
  };

 export const listaSenhasApi = async (login, setDado) => {
    await api.get('/senhas/' + login)
        .then(data => {
            setDado([...data.data]);
            console.log("get api print data: ", data.data);
        })
        .catch((err) => console.log("Api get senha error: ", err));
};


export const addSenhaApi = async (currentLogin, dados) => {
    let respUser = await api.get('/users/' + currentLogin)
    .catch((err) => console.log("Api get user by login error: ", err));
    if(respUser && respUser.data){

        let resp = await api.post('/senhas/' + respUser.data.id, {
            "nome": dados.nome,
            "login": dados.login,
            "senha": dados.senha,
            "categoria": dados.categoria
        })
        .catch((err) => console.log("Api post senha error: ", err));
        if (resp && resp.data) {
            console.log('api post senha return', resp.data)
        }
    }
};