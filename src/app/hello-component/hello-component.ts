import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { TimelineModule } from 'primeng/timeline';
import { ToastModule } from 'primeng/toast';
import { StudentService } from '../services/student-service';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

interface Student {
  name: string;
  address: string;
}

@Component({
  selector: 'app-hello-component',
  imports: [
    ButtonModule,
    TimelineModule,
    ToastModule,
    TableModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule
  ],
  templateUrl: './hello-component.html',
  styleUrl: './hello-component.css',
  providers: [MessageService]
})
export class HelloComponent implements OnInit {

  events: any[];
  students: WritableSignal<Student[]> = signal([]);
  selectedStudent!: Student | null;

  constructor(private messageService: MessageService, private studentService: StudentService) {
    this.events = [
      { status: 'Ordered', date: '15/10/2020 10:30', icon: 'pi pi-shopping-cart', color: '#9C27B0', image: 'game-controller.jpg' },
      { status: 'Processing', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#673AB7' },
      { status: 'Shipped', date: '15/10/2020 16:15', icon: 'pi pi-shopping-cart', color: '#FF9800' },
      { status: 'Delivered', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B' }
    ];
  }

  ngOnInit(): void {
    this.getStudents();
  }

  greetings() { return 'Good Morning!'; }

  showName(name: string) { return name; }

  isNameValid(name: string): boolean {
    if (typeof name !== 'string') return false;
    const trimmed = name.trim();
    return trimmed.length >= 3;
  }

  show() {
    this.messageService.add({ severity: 'info', summary: 'Info', detail: 'sample masg', life: 3000 });
  }

  getStudents() {
    this.studentService.getStudents().subscribe({
      next: data => {
        this.students.set(data);
        console.log(this.students());
      }
    });
  }
}
