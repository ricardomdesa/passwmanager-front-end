function validarLogin(login){
    if(login.length > 3 || login.length < 20){
      return {valido:false, texto:"Login deve ter mais que 3 e menos que 20 digitos."}
    }else{
      return {valido:true, texto:""}
    }
  }

  function validarSenha(senha){
    if(senha.length < 4 || senha.length > 72){
      return {valido:false, texto:"Senha inválida. Tamanho deve ser entre 4 e 72 "}
    }else{
      return {valido:true, texto:""}
    }
  }

  export { validarLogin, validarSenha };