import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    let arr = localStorage.getItem("todoArray")?.slice(1)?.slice(0, -1).split("\"").filter(item => item != '' && item != ',')
    arr?.map(item => this.todoArray.push(item))
  }

  edit: boolean = false
  todoEditIndex: number = -1
  todoInputValue: string = '';
  todoArray: Array<string> = []

  addTodo() {
    if (!this.todoInputValue) { return }
    this.todoArray.push(this.todoInputValue)
    this.todoInputValue = ""
    this.setArrayAtLocalStorage()
  }
  deleteTodo(index: number) {
    this.todoArray.splice(index, 1)
    this.setArrayAtLocalStorage()
  }
  editTodoFromInput() {
    if (!this.todoInputValue) { return }
    this.todoArray.splice(this.todoEditIndex, 1, this.todoInputValue)
    this.todoInputValue = ""
    this.edit = false
    this.setArrayAtLocalStorage()
  }
  editTodo(index: number, elem: any = "") {
    this.todoInputValue = this.todoArray[index]
    if (this.edit) {
      this.todoArray.splice(index, 1, this.todoInputValue)
      this.edit = false
    } else { this.edit = true }

    if (elem) {
      this.todoEditIndex = index;
      console.log(elem);
      elem.focus()
    }
  }
  setArrayAtLocalStorage(){
    localStorage.setItem("todoArray", JSON.stringify(this.todoArray))
  }
}
