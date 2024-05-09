import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
 
type Note = {
  title: string;
  content: string;
};
 
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Тефтер-шън';
 
  public newNote: Note = { title: '', content: '' };
  public notes: Note[] = [];
  public selectedNoteIndex: number = -1;
  private isNewNote: boolean = true;
 
  @ViewChild('notesForm') notesForm!: NgForm;
 
  public saveNote() {
    this.newNote = {
      title: this.newNote.title,
      content: this.newNote.content,
    };
 
    if (this.isNewNote) {
      this.notes.push(this.newNote);
    } else {
      this.notes[this.selectedNoteIndex] = this.newNote;
      this.isNewNote = true;
    }
 
    this.newNote = { title: '', content: '' };
    this.notesForm.resetForm();
  }
 
  public editNote(index: number) {
    this.newNote = { ...this.notes[index] };
    this.selectedNoteIndex = index;
    this.isNewNote = false;
  }
 
  public deleteNote(index: number) {
    this.notes.splice(index, 1);
    if (this.selectedNoteIndex === index) {
      this.newNote = { title: '', content: '' };
      this.selectedNoteIndex = -1;
    }
  }
 
  public selectNote(index: number) {
    this.selectedNoteIndex = index;
  }
}