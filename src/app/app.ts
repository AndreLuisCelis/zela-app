import { Component, ChangeDetectionStrategy, signal, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

interface Report {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  status: 'pendente' | 'em progresso' | 'resolvido';
  zelasAcumulados: number;
  apoios: number;
  photos: string[];
  createdAt: string;
  userId: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, RouterModule],
  template: `<router-outlet />`,
  // template: `
  //   <div class="min-h-screen bg-[#F8FAFC] font-sans text-[#1E293B] pb-24">
  //     <!-- Cabeçalho Principal -->
  //     <header class="bg-white border-b border-gray-100 sticky top-0 z-30 px-6 py-4 flex items-center justify-between shadow-sm">
  //       <div class="flex items-center gap-2">
  //         <div class="w-8 h-8 bg-[#3B82F6] rounded-lg flex items-center justify-center text-white font-bold shadow-sm">Z</div>
  //         <h1 class="text-xl font-black text-[#0F172A] tracking-tight">ZELA</h1>
  //       </div>

  //       <div class="flex items-center gap-3">
  //         @if (isLoggedIn()) {
  //           <div class="flex items-center gap-3 animate-in">
  //             <div class="flex items-center gap-2 bg-amber-50 px-3 py-1.5 rounded-2xl border border-amber-100 shadow-sm">
  //               <span class="text-lg">⭐</span>
  //               <span class="text-sm font-black text-amber-700">{{ userZelas() }}</span>
  //             </div>
  //             <div (click)="logout()" class="w-9 h-9 rounded-full bg-[#0F172A] flex items-center justify-center text-white font-bold text-xs cursor-pointer hover:bg-red-500 transition-colors border-2 border-white shadow-sm">
  //               {{ userName().substring(0,2).toUpperCase() }}
  //             </div>
  //           </div>
  //         } @else {
  //           <button (click)="view.set('auth')" class="text-xs font-bold uppercase text-white bg-[#0F172A] px-5 py-2.5 rounded-xl hover:bg-blue-600 transition-all shadow-md active:scale-95">
  //             Entrar
  //           </button>
  //         }
  //       </div>
  //     </header>

  //     <main class="max-w-md mx-auto p-6">
  //       <!-- Visualização: Lista de Ocorrências (Feed) -->
  //       @if (view() === 'list') {
  //         <div class="flex flex-col gap-6">
  //           <div class="flex items-center justify-between mb-2">
  //             <h2 class="text-lg font-black text-[#0F172A] uppercase tracking-wide">Feed da Cidade</h2>
  //             <span class="text-[10px] font-bold text-gray-400 uppercase bg-gray-100 px-2 py-1 rounded-md">Perto de si</span>
  //           </div>

  //           @for (item of reports(); track item.id) {
  //             <div class="bg-white border border-gray-100 rounded-[2.5rem] p-6 shadow-sm hover:shadow-md transition-all animate-in overflow-hidden">
  //               <div class="mb-4">
  //                 <div class="flex items-center gap-2 mb-2">
  //                   <span class="text-[10px] font-black text-blue-500 bg-blue-50 px-2 py-0.5 rounded-lg uppercase tracking-widest">{{ item.category }}</span>
  //                   <span class="text-[10px] font-medium text-gray-400">{{ item.createdAt | date:'shortTime' }}</span>
  //                 </div>
  //                 <h3 class="text-lg font-black text-[#1E293B] leading-tight uppercase italic mb-1">{{ item.title }}</h3>
  //                 <p class="text-xs text-gray-500 line-clamp-2 leading-relaxed">{{ item.description }}</p>
  //               </div>

  //               <!-- Carrossel com Setas -->
  //               @if (item.photos.length > 0) {
  //                 <div class="relative -mx-6 mb-6 group">
  //                   <div class="flex gap-0 overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth" #carousel>
  //                     @for (photo of item.photos; track $index) {
  //                       <div class="w-full flex-shrink-0 snap-center aspect-video bg-gray-100 border-y border-gray-50">
  //                         <img [src]="photo" class="w-full h-full object-cover" [alt]="item.title">
  //                       </div>
  //                     }
  //                   </div>

  //                   @if (item.photos.length > 1) {
  //                     <button (click)="scrollCarousel(carousel, -1)" class="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
  //                       <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M15 19l-7-7 7-7"/></svg>
  //                     </button>
  //                     <button (click)="scrollCarousel(carousel, 1)" class="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
  //                       <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7"/></svg>
  //                     </button>

  //                     <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
  //                       @for (p of item.photos; track $index) {
  //                         <div class="w-1.5 h-1.5 rounded-full bg-white/50 border border-black/5"></div>
  //                       }
  //                     </div>
  //                   }
  //                 </div>
  //               }

  //               <div class="flex items-center gap-2 text-gray-400 text-xs mb-6 px-1">
  //                 <svg class="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
  //                 <span class="truncate">{{ item.location }}</span>
  //               </div>

  //               <div class="flex gap-4 mb-6">
  //                  <div class="flex-1 bg-gray-50 rounded-2xl p-3 border border-gray-100 text-center">
  //                     <p class="text-[9px] font-black text-gray-400 uppercase mb-1">Recompensa</p>
  //                     <p class="text-sm font-black text-amber-600">⭐ {{ item.zelasAcumulados }}</p>
  //                  </div>
  //                  <div class="flex-1 bg-gray-50 rounded-2xl p-3 border border-gray-100 text-center">
  //                     <p class="text-[9px] font-black text-gray-400 uppercase mb-1">Apoios</p>
  //                     <p class="text-sm font-black text-blue-600">👥 {{ item.apoios }}</p>
  //                  </div>
  //               </div>

  //               <div class="grid grid-cols-2 gap-3 pt-4 border-t border-gray-50">
  //                 <button (click)="openSponsorModal(item)" class="py-3 rounded-2xl bg-amber-50 text-[10px] font-black uppercase text-amber-600 hover:bg-amber-100 transition-all border border-amber-100 active:scale-95">Patrocinar</button>
  //                 <button (click)="handleApoiar(item.id)" class="py-3 rounded-2xl bg-blue-50 text-[10px] font-black uppercase text-blue-600 hover:bg-blue-100 transition-all border border-blue-100 active:scale-95">Apoiar</button>
  //                 <button (click)="handleStartSolve()" class="col-span-2 py-4 rounded-2xl bg-[#0F172A] text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-gray-200 active:scale-95 transition-all">Aceitar Missão!</button>
  //               </div>
  //             </div>
  //           }
  //         </div>
  //       }

  //       <!-- Visualização: Criar Nova Ocorrência -->
  //       @else if (view() === 'create') {
  //         <div class="bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-50 animate-in">
  //           <div class="flex justify-between items-center mb-8">
  //             <h2 class="text-2xl font-black text-[#0F172A] tracking-tighter uppercase italic">Nova Denúncia</h2>
  //             <button (click)="view.set('list')" class="p-2 text-gray-400 hover:text-red-500 transition-colors">
  //               <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
  //             </button>
  //           </div>

  //           <form (submit)="createReport($event)" class="flex flex-col gap-6">
  //             <div>
  //               <label class="block text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest mb-3">Fotos ({{ uploadedPhotos().length }}/5)</label>
  //               <div class="grid grid-cols-3 gap-3">
  //                 @for (photo of uploadedPhotos(); track $index) {
  //                   <div class="aspect-square rounded-2xl relative overflow-hidden bg-gray-100 border-2 border-gray-50 animate-in">
  //                     <img [src]="photo" class="w-full h-full object-cover">
  //                     <button (click)="removePhoto($index)" class="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full shadow-md">✕</button>
  //                   </div>
  //                 }
  //                 @if (uploadedPhotos().length < 5) {
  //                   <label class="aspect-square rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-300 hover:border-blue-400 hover:text-blue-400 transition-all bg-gray-50 cursor-pointer active:scale-95">
  //                     <input type="file" accept="image/*" class="hidden" (change)="onFileSelected($event)">
  //                     <svg class="w-8 h-8 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
  //                     <span class="text-[9px] font-black uppercase">Anexar</span>
  //                   </label>
  //                 }
  //               </div>
  //             </div>

  //             <div class="space-y-4">
  //               <input name="title" [(ngModel)]="newReport.title" required class="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 outline-none text-sm font-bold focus:ring-2 focus:ring-blue-500" placeholder="O que aconteceu?">
  //               <select name="category" [(ngModel)]="newReport.category" class="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 outline-none text-sm font-semibold">
  //                 <option value="INFRAESTRUTURA">Infraestrutura</option>
  //                 <option value="LIMPEZA">Limpeza Urbana</option>
  //                 <option value="ILUMINAÇÃO">Iluminação Pública</option>
  //                 <option value="SEGURANÇA">Segurança</option>
  //               </select>
  //               <textarea name="description" [(ngModel)]="newReport.description" required rows="3" class="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 outline-none text-sm leading-relaxed" placeholder="Dê-nos mais detalhes..."></textarea>
  //               <input name="location" [(ngModel)]="newReport.location" required class="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 outline-none text-sm" placeholder="Onde fica? (Rua, Bairro)">
  //             </div>

  //             <button type="submit" [disabled]="userZelas() < 10" class="bg-blue-600 text-white font-black py-5 rounded-3xl mt-2 shadow-xl shadow-blue-100 active:scale-95 disabled:opacity-50 transition-all uppercase text-sm tracking-widest">
  //               Publicar (-10 Zelas)
  //             </button>
  //           </form>
  //         </div>
  //       }

  //       <!-- Visualização: Autenticação -->
  //       @if (view() === 'auth') {
  //         <div class="bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-50 animate-in">
  //            <div class="text-center mb-8">
  //             <h2 class="text-2xl font-black text-[#0F172A] uppercase italic">
  //               {{ authMode() === 'login' ? 'Bem-vindo de volta' : 'Crie a sua conta' }}
  //             </h2>
  //             <p class="text-xs text-gray-400 font-medium mt-2">
  //               {{ authMode() === 'login' ? 'Inicie sessão para cuidar da sua cidade' : 'Junte-se a milhares de cidadãos ativos' }}
  //             </p>
  //           </div>

  //           <form (submit)="handleAuthSubmit($event)" class="flex flex-col gap-4">
  //             @if (authMode() === 'signup') {
  //               <input type="text" [(ngModel)]="authForm.name" name="name" class="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 outline-none text-sm animate-in" placeholder="Nome Completo">
  //             }
  //             <input type="email" [(ngModel)]="authForm.email" name="email" class="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 outline-none text-sm" placeholder="E-mail">
  //             <input type="password" [(ngModel)]="authForm.password" name="password" class="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 outline-none text-sm" placeholder="Senha">

  //             <button type="submit" class="bg-[#0F172A] text-white font-black py-5 rounded-2xl mt-4 uppercase text-sm tracking-widest active:scale-95 shadow-lg shadow-gray-200">
  //               {{ authMode() === 'login' ? 'Entrar' : 'Começar Agora' }}
  //             </button>
  //           </form>

  //           <div class="mt-8 text-center border-t border-gray-50 pt-6">
  //             <p class="text-xs text-gray-400 mb-2">
  //               {{ authMode() === 'login' ? 'Ainda não tem conta?' : 'Já possui uma conta?' }}
  //             </p>
  //             <button (click)="toggleAuthMode()" class="text-xs font-black text-blue-600 uppercase tracking-wider hover:underline">
  //               {{ authMode() === 'login' ? 'Criar Nova Conta' : 'Fazer Login' }}
  //             </button>
  //           </div>

  //           <button (click)="view.set('list')" class="w-full mt-6 text-[10px] uppercase font-bold text-gray-300 hover:text-gray-500 transition-colors">Voltar ao Início</button>
  //         </div>
  //       }
  //     </main>

  //     <!-- Navegação Inferior -->
  //     <nav class="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-gray-100 px-12 py-5 flex items-center justify-between z-20 shadow-[0_-5px_20px_rgba(0,0,0,0.02)]">
  //       <button (click)="view.set('list')"
  //         [class]="'transition-all ' + (view() === 'list' ? 'text-blue-600 scale-110' : 'text-gray-300 hover:text-gray-400')">
  //         <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
  //       </button>

  //       <button (click)="handleCreateView()" class="bg-[#0F172A] text-white w-14 h-14 rounded-2xl shadow-xl flex items-center justify-center -translate-y-8 active:scale-90 transition-all border-4 border-white hover:bg-blue-600">
  //         <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
  //       </button>

  //       <button (click)="handleMockProfile()" class="text-gray-300 hover:text-blue-600 transition-colors">
  //         <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
  //       </button>
  //     </nav>

  //     <!-- Modal de Notificação Genérico -->
  //     @if (modalMessage()) {
  //       <div class="fixed inset-0 bg-[#0F172A]/40 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-in">
  //         <div class="w-full max-w-xs bg-white rounded-[2.5rem] p-8 shadow-2xl text-center">
  //           <div class="text-5xl mb-6">{{ modalIcon() }}</div>
  //           <h3 class="text-lg font-black mb-2 text-[#0F172A] uppercase italic">Zela Aviso</h3>
  //           <p class="text-gray-500 text-sm mb-8 font-medium leading-relaxed">{{ modalMessage() }}</p>
  //           <button (click)="modalMessage.set(null)" class="w-full py-4 bg-[#0F172A] text-white font-black rounded-2xl uppercase text-xs tracking-widest active:scale-95 shadow-lg">Confirmar</button>
  //         </div>
  //       </div>
  //     }

  //     <!-- Modal de Opções de Patrocínio -->
  //     @if (selectedReportForSponsor()) {
  //       <div class="fixed inset-0 bg-[#0F172A]/60 backdrop-blur-md z-50 flex items-end sm:items-center justify-center animate-in">
  //         <div class="w-full max-w-md bg-white rounded-t-[3rem] sm:rounded-[3rem] p-8 shadow-2xl animate-slide-up">
  //           <div class="flex justify-between items-start mb-6">
  //             <div>
  //               <h3 class="text-xl font-black text-[#0F172A] uppercase italic">Patrocinar Missão</h3>
  //               <p class="text-xs text-gray-400 font-bold mt-1 uppercase tracking-tight">{{ selectedReportForSponsor()?.title }}</p>
  //             </div>
  //             <button (click)="selectedReportForSponsor.set(null)" class="p-2 text-gray-300 hover:text-red-500 transition-colors">
  //               <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
  //             </button>
  //           </div>

  //           <p class="text-sm text-gray-500 mb-8 leading-relaxed">
  //             Ao patrocinar, aumentas a recompensa para quem resolver esta ocorrência. O valor será retirado do teu saldo ⭐.
  //           </p>

  //           <div class="grid grid-cols-3 gap-3 mb-8">
  //             @for (opt of sponsorOptions; track opt) {
  //               <button (click)="sponsorAmount.set(opt)"
  //                 [class]="'py-4 rounded-2xl border-2 font-black transition-all text-sm ' + (sponsorAmount() === opt ? 'border-amber-500 bg-amber-50 text-amber-600 scale-105 shadow-md' : 'border-gray-100 text-gray-400 hover:border-amber-100')">
  //                 ⭐ {{ opt }}
  //               </button>
  //             }
  //           </div>

  //           <div class="mb-8">
  //             <label class="block text-[10px] font-black uppercase text-gray-400 mb-3 tracking-widest ml-1">Valor Personalizado</label>
  //             <div class="relative">
  //               <span class="absolute left-5 top-1/2 -translate-y-1/2 text-lg">⭐</span>
  //               <input type="number" [(ngModel)]="customSponsorValue" (input)="onCustomSponsorInput()" placeholder="Outro valor..."
  //                 class="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-12 pr-6 outline-none font-bold text-sm focus:ring-2 focus:ring-amber-500 transition-all">
  //             </div>
  //           </div>

  //           <div class="bg-gray-50 rounded-2xl p-4 mb-8 flex justify-between items-center border border-gray-100">
  //             <span class="text-[10px] font-black uppercase text-gray-400">Total a Investir</span>
  //             <span class="text-xl font-black text-amber-600">⭐ {{ sponsorAmount() }}</span>
  //           </div>

  //           <button (click)="handleSponsor(sponsorAmount())"
  //             [disabled]="sponsorAmount() <= 0 || userZelas() < sponsorAmount()"
  //             class="w-full py-5 bg-[#0F172A] text-white font-black rounded-3xl uppercase text-sm tracking-widest shadow-xl shadow-gray-200 active:scale-95 disabled:opacity-30 transition-all">
  //             Confirmar Patrocínio
  //           </button>
  //           <p class="text-center text-[9px] font-bold text-gray-300 mt-4 uppercase tracking-widest">Saldo Atual: ⭐ {{ userZelas() }}</p>
  //         </div>
  //       </div>
  //     }
  //   </div>
  // `,
  styles: [`
    .animate-in { animation: fadeIn 0.4s ease-out; }
    .animate-slide-up { animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  view = signal<'list' | 'create' | 'auth'>('list');
  authMode = signal<'login' | 'signup'>('login');
  isLoggedIn = signal<boolean>(false);
  userZelas = signal<number>(500);
  userName = signal<string>('João Diniz');
  modalMessage = signal<string | null>(null);
  modalIcon = signal<string>('⭐');

  uploadedPhotos = signal<string[]>([]);
  selectedReportForSponsor = signal<Report | null>(null);
  sponsorAmount = signal<number>(50);
  customSponsorValue: number | null = null;
  sponsorOptions = [50, 100, 200];

  authForm = { name: '', email: '', password: '' };

  reports = signal<Report[]>([
    {
      id: '1',
      title: 'Lixo na Praça Central',
      description: 'Acúmulo de entulho e lixo doméstico perto do monumento principal.',
      category: 'LIMPEZA',
      location: 'Praça das Flores, Centro',
      status: 'pendente',
      zelasAcumulados: 120,
      apoios: 45,
      photos: [
        'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?q=80&w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1530587191325-3db32d826c18?q=80&w=600&auto=format&fit=crop'
      ],
      createdAt: new Date().toISOString(),
      userId: 'user-1'
    }
  ]);

  newReport = { title: '', description: '', category: 'INFRAESTRUTURA', location: '' };

  scrollCarousel(container: HTMLElement, direction: number) {
    const scrollAmount = container.clientWidth;
    container.scrollBy({ left: scrollAmount * direction, behavior: 'smooth' });
  }

  toggleAuthMode() {
    this.authMode.update(m => m === 'login' ? 'signup' : 'login');
  }

  handleAuthSubmit(event: Event) {
    event.preventDefault();
    this.isLoggedIn.set(true);
    if (this.authMode() === 'signup' && this.authForm.name) {
      this.userName.set(this.authForm.name);
    }
    this.view.set('list');
    this.modalIcon.set('✨');
    this.modalMessage.set(this.authMode() === 'login' ? 'Bom regresso ao Zela!' : 'Conta criada com sucesso! Recebeu 500 Zelas de boas-vindas.');
  }

  logout() {
    this.isLoggedIn.set(false);
    this.view.set('list');
    this.authMode.set('login');
  }

  requireAuth(callback: Function) {
    if (!this.isLoggedIn()) {
      this.view.set('auth');
      return;
    }
    callback();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && this.uploadedPhotos().length < 5) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.uploadedPhotos.update(prev => [...prev, e.target.result]);
      };
      reader.readAsDataURL(file);
    }
  }

  removePhoto(index: number) {
    this.uploadedPhotos.update(prev => prev.filter((_, i) => i !== index));
  }

  handleApoiar(id: string) {
    this.requireAuth(() => {
      this.reports.update(current =>
        current.map(r => r.id === id ? { ...r, apoios: r.apoios + 1 } : r)
      );
    });
  }

  openSponsorModal(report: Report) {
    this.requireAuth(() => {
      this.selectedReportForSponsor.set(report);
      this.sponsorAmount.set(50);
      this.customSponsorValue = null;
    });
  }

  onCustomSponsorInput() {
    if (this.customSponsorValue !== null) {
      this.sponsorAmount.set(this.customSponsorValue);
    }
  }

  handleSponsor(amount: number) {
    if (this.userZelas() < amount) {
      this.modalIcon.set('❌');
      this.modalMessage.set('Saldo de Zelas insuficiente.');
      return;
    }
    const report = this.selectedReportForSponsor();
    if (report && amount > 0) {
      this.userZelas.update(z => z - amount);
      this.reports.update(list =>
        list.map(r => r.id === report.id ? { ...r, zelasAcumulados: r.zelasAcumulados + amount } : r)
      );
      this.selectedReportForSponsor.set(null);
      this.modalIcon.set('🚀');
      this.modalMessage.set(`Obrigado! Investiste ⭐ ${amount} nesta causa.`);
    }
  }

  handleStartSolve() {
    this.requireAuth(() => {
      this.modalIcon.set('⚒️');
      this.modalMessage.set('Missão aceite! Envie o comprovativo após a resolução.');
    });
  }

  handleCreateView() {
    this.requireAuth(() => {
      this.uploadedPhotos.set([]);
      this.view.set('create');
    });
  }

  handleMockProfile() {
    this.requireAuth(() => {
      this.modalIcon.set('👤');
      this.modalMessage.set(`${this.userName()}, tens ${this.userZelas()} Zelas.`);
    });
  }

  createReport(event: Event) {
    event.preventDefault();
    this.requireAuth(() => {
      if (this.userZelas() < 10) {
        this.modalIcon.set('⚠️');
        this.modalMessage.set('Saldo insuficiente (mínimo 10 Zelas).');
        return;
      }
      this.userZelas.update(z => z - 10);
      const report: Report = {
        id: Math.random().toString(36).substr(2, 9),
        ...this.newReport,
        status: 'pendente',
        zelasAcumulados: 10,
        apoios: 0,
        photos: [...this.uploadedPhotos()],
        createdAt: new Date().toISOString(),
        userId: 'current-user'
      };
      this.reports.update(prev => [report, ...prev]);
      this.newReport = { title: '', description: '', category: 'INFRAESTRUTURA', location: '' };
      this.uploadedPhotos.set([]);
      this.view.set('list');
      this.modalIcon.set('✅');
      this.modalMessage.set('Denúncia publicada!');
    });
  }
}
