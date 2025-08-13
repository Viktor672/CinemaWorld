import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
    private divContainer: HTMLElement | null = null;

    constructor() {
        this.createDivContainer();
    }

    private createDivContainer() {
        this.divContainer = document.createElement('div');
        this.divContainer.style.position = 'fixed';
        this.divContainer.style.top = '80px';
        this.divContainer.style.left = '50%';
        this.divContainer.style.transform = 'translateX(-50%)';
        this.divContainer.style.zIndex = '9999';
        this.divContainer.style.display = 'flex';
        this.divContainer.style.flexDirection = 'column';
        this.divContainer.style.alignItems = 'center';
        this.divContainer.style.pointerEvents = 'none';

        document.body.appendChild(this.divContainer);
    }

    show(message: string, type: string, duration = 3000) {
        if (!this.divContainer) return;

        let toast = document.createElement('p');
        toast.innerText = message;
        if (type === 'error') {
            toast.style.background = '#f44336';
        }
        else if (type === 'success') {
            toast.style.background = '#227a16ff';
        }
        toast.style.color = 'white';
        toast.style.padding = '10px 16px';
        toast.style.borderRadius = '6px';
        toast.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
        toast.style.fontFamily = 'Arial, sans-serif';
        toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';

        this.divContainer.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(-10px)';
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }
}
