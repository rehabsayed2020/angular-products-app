import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, computed, signal } from '@angular/core';

@Component({
  selector: 'app-pagination-component',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './pagination-component.html',
  styleUrl: './pagination-component.css',
})
export class PaginationComponent {
  @Input() totalItems = 0;
  @Input() pageSize = 6;
  @Output() pageChange = new EventEmitter<{ page: number; pageSize: number }>();

  currentPage = signal(1);

  totalPages = computed(() => Math.ceil(this.totalItems / this.pageSize));

  next() {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update(p => p + 1);
      this.emitChange();
    }
  }

  prev() {
    if (this.currentPage() > 1) {
      this.currentPage.update(p => p - 1);
      this.emitChange();
    }
  }

  emitChange() {
    console.log('emit');
    this.pageChange.emit({ page: this.currentPage(), pageSize: this.pageSize });
  }
}
