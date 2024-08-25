// Função que mostra uma notificação durante alguns segundos na tela, é passado como parametro para ela uma string que será a mensagem da notificação e também
// o tipo que define o tipo da notificação
// Para mostrar essa notificação é necessário que a pagina HTML possua a estruturação da notificação, que é especificada nos arquivos .html desse projeto

export const showNotification = (text_notification: string, type: string): void => {
    // Recuperando a div de notificação do documento HTML e tratando o valor de retorno
    const notification = document.getElementById('notification') as HTMLDivElement;

    if (!notification) {
        console.log('Erro while retrieving notification element from HTML body');
    }
    
    // passado para a div o texto da notificação que é envolto pela tag <span>
    notification.innerHTML = `
        <span> ${text_notification} </span>
    `;
    
    // tratando os tipos da notificação
    if (type === 'green') {
        notification.style.backgroundColor = '#80d149';
        
    } else if (type === 'red'){
        notification.style.backgroundColor = '#cc2d3d';
    } else {
        // se nenhum tipo válido for especfiicado a notificação terá o valor padrão a seguir
        notification.style.backgroundColor = '#1f1f1f';
        notification.style.color = 'whitesmoke';
    }

    // alterando os atributos para mostrar a notificação na tela
    notification.style.display = 'flex';
    notification.style.opacity = '100';

    // após um certo tempo a notificação desaparece
    setTimeout(() => {
        notification.style.opacity = '0';
        // removendo totalmente a notificação da tela para que ela nao interfira com outros elementos
        setTimeout(() => {
            notification.style.display = 'none';
        }, 500);
    }, 1500); 
}