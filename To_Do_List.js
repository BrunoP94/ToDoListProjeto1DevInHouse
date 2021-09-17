//0. definir o array
const ListArray = JSON.parse(localStorage.getItem('lista')) || [];

//5. criar função de listar as atividades
function showList(ListArray, clearItems = false){
    //6. definir o moviecontent para poder manipular o DOM
    const listContent = document.querySelector(".lista");

    //7. checar se o array existe e é maior que zero
    if(ListArray.length > 0){
      
        if(clearItems){
            listContent.innerHTML="";
        }
        //9. utilizar o loop foreach para imprimir as atividades
        ListArray.forEach((list, index)=>{
            listContent.innerHTML = listContent.innerHTML + `<div class="list-card"> 
            <div class="checkItem${index}"><input class="checkBox${index}" type="checkbox" onchange ="concludeTask(${index})" m>${list.atividade}</input></div>
            <button type="submit" class = "deleteButton" onclick ="removeTask(${index})" data-tooltip="Excluir atividade">x</button>
            </div>`
        })
    }else {
        listContent.innerHTML = 'Sem atividades disponíveis';
    }
}

//10. criar função de deletar atividade 
    //index i utilizado para identificar qual botão foi pressionado
function removeTask(i){
    ListArray.splice(i, 1);
    showList(ListArray, true);
    refreshConcludedTask();
    localStorage.setItem('lista', JSON.stringify(ListArray));
}

//11. criar função que é chamada quando usuário aperta no checkbox
function concludeTask(j){
    //inverte status da atividade
    ListArray[j].isDone = !ListArray[j].isDone;
    //salva novamente no localstorage
    localStorage.setItem('lista', JSON.stringify(ListArray));
    refreshConcludedTask();
}

//12. criar função para atualizar lista de itens concluídos
function refreshConcludedTask (){
    ListArray.forEach((list, index)=>{
        let linedItem = document.querySelector(`.checkItem${index}`)
        let checkedBox = document.querySelector(`.checkBox${index}`)
        if(list.isDone){
            //risca descrulção da atividade
            linedItem.style = 'text-decoration: line-through;'
            //mantém checkbox selecionadp
            checkedBox.checked = true;
        } else {
            linedItem.style = 'text-decoration: none;'
            checkedBox.checked = false;
        }
    }) 
    
}


//1. criar event listener para pegar dados do form
const listForm = document.querySelector("form");
listForm.addEventListener('submit', (event) => {
    event.preventDefault();
    //1.1 declarar objeto list, que coleta atividades inserida e seus status    
    let list = {};
        list.atividade = document.getElementById("task").value;
        list.isDone = false;
    
    const alertMessage = document.querySelector(".alert");

//3. checar se o form está vazio
        if(list.atividade === ''){
            
            //3.1 mostrar mensagens caso esteja vazio
            alertMessage.innerHTML = "Por favor, preencha a atividade.";
            alertMessage.style = 'display: block; color: red' 
        } else{ 
//4 adicionar informações no nosso array e no local storage
            ListArray.push(list);
            localStorage.setItem('lista', JSON.stringify(ListArray));
                       
            //4.1 mostrar a mensagem de sucesso
            alertMessage.innerHTML = "Item adicionado com sucesso.";
            alertMessage.style = 'display: block; color: rgb(91, 255, 118);' 
            //4.2 remover essa mensagem e resetar os dados do formulario
            //resetar os valores do nosso formumlario
            listForm.reset();
            setTimeout(() =>{
                //remover conteudo do .alert
                alertMessage.innerHTML='';
            }, 1500)
            //chamar a função de mostrar as atividades
            showList(ListArray, true);
            refreshConcludedTask();
            
        }
   
})

//8. chamar a função ao carregar a página
window.onload = function () {
    showList(ListArray, true);
    refreshConcludedTask();
    
}