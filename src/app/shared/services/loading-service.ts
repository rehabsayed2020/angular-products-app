import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {

   private _count = signal(0);

  // true لو في request شغال
  isLoading = computed(() => this._count() > 0);

  show() {
    this._count.update(c => c + 1);
  }

  hide() {
    this._count.update(c => Math.max(0, c - 1));
  }
}


