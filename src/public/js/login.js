const form = document.getElementById('loginForm');

form.addEventListener('submit',async e=>{
    console.log(e);
    e.preventDefault();
    const data = new  FormData(form);
    const obj = {};
    data.forEach((value,key)=>obj[key]=value);
    const response = await fetch('/api/sessions/login',{
        method:'POST',
        body:JSON.stringify(obj),
        headers:{
            "Content-Type":'application/json'
        }
    })
    const result = await response.json();
    if(response.status===200){
        //DESCOMENTAR SI USAS EXPRESS SESSIONS
        window.location.replace('/products');
        
        //JWT
        localStorage.setItem('accessToken',result.token)
    }
})