// função para fechar a side da página
function closeSidebar(): void {
    // recuperando o elemento da sidebar e checando o valor de retorno
    const sideBar: HTMLElement | null = document.getElementById("sidebar");

    if(!sideBar) {
        console.log("Sidebar not found");
    } else {
        // removendo a classe 'open' para fechar a sidebar
        sideBar.classList.remove("open");
    }
}

// funçção para abrir a side bar na página
function openSidebar(): void {
    // recuperando o elemento da sidebar e checando o valor de retorno
    const sideBar: HTMLElement | null = document.getElementById("sidebar");

    if(!sideBar) {
        console.log("Sidebar not found");
    } else {
        // adicionando a classe 'open' para abrir a sidebar
        sideBar.classList.add("open")
    }
}