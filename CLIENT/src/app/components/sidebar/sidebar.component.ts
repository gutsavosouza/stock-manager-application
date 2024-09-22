import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  // função para fechar a side da página
  closeSidebar(): void {
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
  openSidebar(): void {
  // recuperando o elemento da sidebar e checando o valor de retorno
  const sideBar: HTMLElement | null = document.getElementById("sidebar");

  if(!sideBar) {
      console.log("Sidebar not found");
  } else {
      // adicionando a classe 'open' para abrir a sidebar
      sideBar.classList.add("open")
  }
  }
}
